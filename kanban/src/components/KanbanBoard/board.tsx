import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { orderColumns } from "../../utils/orderColumns";
import { parseJSON } from "../../utils/parseJSON";
import { Column } from "./column";
import { NewColumn } from "./newColumn";
import { useGetProjectQuery, useMoveTicketMutation, useSetColumnOrderMutation, useSetTicketOrderMutation } from "./types/operations";

interface KanbanBoardParams {
  projID: string;
}

export function KanbanBoard() {
  const { projID } = useParams<KanbanBoardParams>();
  const { data, loading, error } = useGetProjectQuery({
    variables: {
      projectID: projID
    }
  })
  const columnOrder = data?.getProject?.order || '';
  const queriedOrder = useMemo<string[]>(
    () => parseJSON(columnOrder, (order) => Array.isArray(order), []),
    [columnOrder]
  );
  const [order, setOrder] = useState<string[]>(queriedOrder);
  useEffect(() => {
    setOrder(queriedOrder);
  }, [queriedOrder]);
  const projectColumns = data?.getProject?.columns;
  const memoizedColumns = useMemo(
    () => orderColumns({ columns: projectColumns, order }),
    [projectColumns, order]
  );
  const [columns, setColumns] = useState(memoizedColumns);
  useEffect(() => setColumns(memoizedColumns), [memoizedColumns]);

  const [pushColumnOrder] = useSetColumnOrderMutation({
    ignoreResults: true,
  });
  const [pushTicketOrder] = useSetTicketOrderMutation({
    ignoreResults: true,
  })
  // TODO: Update the cache when moving a ticket between columns instead of refetching the entire project query again
  const [moveTicket] = useMoveTicketMutation({
    ignoreResults: true,
    refetchQueries: ["getProject"]
  });

  const onDragEnd = ({
    destination,
    source,
    draggableId,
    type,
  }: DropResult) => {
    if (!destination) return null;
    switch (type) {
      case "columns":
        if (destination.droppableId === source.droppableId) {
          const tempOrder = columns.map((column) => column.colID);
          let start = source.index;
          let end = destination.index;
          if (start === end) return null;
          const [removed] = tempOrder.splice(start, 1);
          tempOrder.splice(end, 0, removed);
          setOrder(tempOrder);
          pushColumnOrder({
            variables: {
              projID: projID,
              order: JSON.stringify(tempOrder),
            },
          });
        }
        break;
      case "tickets":
        if (destination.droppableId === source.droppableId) {
          if (source.index === destination.index) return null;
          // reordering
          const tempOrder: string[] = [];
          columns
            .filter((column) => column.colID === source.droppableId)
            .forEach((column) => {
              column.tickets.forEach((ticket: { id: string }) => {
                tempOrder.push(ticket.id);
              });
            });
          let start = source.index;
          let end = destination.index;
          if (start === end) return null;
          const [removed] = tempOrder.splice(start, 1);
          tempOrder.splice(end, 0, removed);
          setColumns(
            columns.map((c) => {
              const column = { ...c };
              if (column.colID === source.droppableId) {
                column.order = tempOrder;
              }
              return column;
            })
          );
          pushTicketOrder({
            variables: {
              colID: destination.droppableId,
              order: JSON.stringify(tempOrder),
            },
          });
          return null;
        } else {
          // moving
          const tempOrder: string[] = [];
          columns
            .filter((column) => column.colID === destination.droppableId)
            .forEach((column) => {
              column.tickets.forEach((ticket: { id: string }) => {
                tempOrder.push(ticket.id);
              });
            });
          tempOrder.splice(destination.index, 0, draggableId);
          moveTicket({
            variables: {
              id: draggableId,
              colID: destination.droppableId,
              order: JSON.stringify(tempOrder),
            },
          });
        }
        break;
      default:
        break;
    }
    return null;
  };

  if (loading) return <>Loading...</>;
  if (error) return <>Error!</>;
  return (
    <div
      style={{
        height: "-webkit-fill-available",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Menu pointing secondary style={{}}>
        <Menu.Item header>{data?.getProject?.name}</Menu.Item>
        <Menu.Menu position="right"></Menu.Menu>
      </Menu>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="project" direction="horizontal" type="columns">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{
                overflowX: "auto",
                height: "-webkit-fill-available",
                display: "flex",
                paddingLeft: "5px",
                paddingRight: "5px",
                minWidth: "100%",
                float: "left",
              }}
            >
              {columns.map((column, index) => (
                <Column column={column} index={index} key={column.colID} />
              ))}
              {provided.placeholder}
              <NewColumn />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
