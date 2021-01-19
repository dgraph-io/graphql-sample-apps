import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button, Input } from "semantic-ui-react";
import { Column as ColumnT, Ticket as TicketT } from "../../types/graphql";
import { NewTicket } from "./newTicket";
import { Ticket } from "./ticket";
import { useUpdateColumnNameMutation } from "./types/operations";

interface ColumnProps {
  column: ColumnT;
  index: number;
}

export function Column(props: ColumnProps) {
  const { column, index } = props;
  const [editing, editColumn] = useState(false)
  const [name, setName] = useState('')
  useEffect(()=>{
    setName(column.name)
  },[column])
  const [saveColumnName] = useUpdateColumnNameMutation({
    onCompleted: () => editColumn(false)
  })
  return (
    <Draggable draggableId={column.colID} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            minWidth: "min(360px,80%)",
            maxWidth: "80%",
            flex: "1 0",
            display: "Flex",
            flexDirection: "column",
            marginLeft: "5px",
            marginRight: "5px",
            marginBottom: "5px",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "#ededed",
            boxShadow: "0 1px 2px rgba(34,36,38,.15)",
            borderRadius: "0.5em",
          }}
        >
          <div
            {...provided.dragHandleProps}
            style={{ paddingLeft: "10px", paddingRight: "10px", display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}
          >
            {!editing && <>
              <h3>{column?.name}</h3>
              <Button onClick={()=>editColumn(true)} size='mini' basic color='orange' icon='edit outline'/>
            </>}
            {editing && <>
              <Input name='name' placeholder='Column Name' value={name} onChange={(e,{value})=>setName(value)} fluid style={{ flexGrow: '1', paddingRight: '8px' }} />
              <div style={{ display: 'flex' }}>
                <Button onClick={()=>editColumn(false)} size='mini' color='grey' basic icon='cancel'/>
                <Button onClick={()=>saveColumnName({ variables: { colID: column.colID, name } })} size='mini' color='green' icon='save outline'/>
              </div>
            </>}
          </div>
          <Droppable droppableId={column.colID} type="tickets">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  overflowY: "scroll",
                  height: "-webkit-fill-available",
                  paddingLeft: "10px",
                  paddingRight: "5px",
                }}
              >
                {column.tickets?.map(( ticket, index ) => (
                  <Ticket ticket={ticket as TicketT} index={index} key={ticket?.id} />
                ))}
                {provided.placeholder}
                <NewTicket
                  colID={column?.colID}
                  columnName={column?.name}
                  withDelete
                />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
