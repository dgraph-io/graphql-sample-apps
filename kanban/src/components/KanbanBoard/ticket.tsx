import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useMemo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Button, Card, Form, Icon, Ref, Confirm, Image, Dropdown, DropdownItemProps, Popup } from "semantic-ui-react";
import { Comment as CommentT, Exact, Ticket as TicketT, TicketPatch } from "../../types/graphql";
import updateCacheAfterDelete from "../../utils/updateCacheAfterDelete";
import {
  useDeleteTicketMutation,
  useUpdateTicketMutation,
  useAddCommentMutation,
} from "./types/operations";
import Markdown from "markdown-to-jsx";
import CommentsComp from "./comments";
import { useAllUsersQuery } from "../Projects/types/operations";

const CLAIMS = process.env.REACT_APP_AUTH0_CLAIMS_KEY as string;

interface TicketProps {
  ticket: TicketT;
  index: number;
}
export const Ticket: React.FC<TicketProps> = ({ ticket, index }) => {
  const { user } = useAuth0();
  const { username = null } = user?.[CLAIMS] || {};
  const [editing, editTicket] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState<{username?: string}|null>(null)
  const [removeAssignee, setRemoveAssignee] = useState(false)
  const handleAssignChange = (value: string|null) => {
    if (value && value!=="") {
      setRemoveAssignee(false)
      setAssignee({ username: value })
    } else {
      setAssignee(null)
      if (ticket.assigned?.username) setRemoveAssignee(true)
    }
  }
  useEffect(()=>ticket.assigned?.username ? setAssignee({username: ticket.assigned.username}) : setAssignee(null),[ticket])
  const [comment, setComment] = useState("");
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
  const [addComment] = useAddCommentMutation()
  const { data: AllUsers } = useAllUsersQuery()
  const userOptions = useMemo(()=>{
    const options: DropdownItemProps[] = AllUsers?.queryUser?.map(user => {
      return {
        key: user?.username,
        text: user?.displayName,
        value: user?.username,
        image: user?.image || `https://identicon-api.herokuapp.com/${user?.displayName?.replace(/[^A-Za-z0-9!?]/,'')}/120?format=png` || `https://github.com/identicons/${user?.displayName?.replace(/[^A-Za-z0-9!?]/,'')}.png`
      }
    }) || []
    options.unshift({
      key: "",
      text: "No Assignee",
      value: "",
    })
    return options
  },[AllUsers])
  useEffect(() => {
    setTitle(ticket?.title);
    setDescription(ticket?.description as string);
  }, [ticket]);
  const [commenting, setCommenting] = useState(false);
  const [deleteTicket] = useDeleteTicketMutation({
    update: updateCacheAfterDelete,
  });
  const [updateTicket] = useUpdateTicketMutation();
  const handleNewComment = () => {
    if (!username) {
      console.error("Tried to add a comment without having a username")
      return
    }
    if (comment) {
      addComment({variables: {
        comment: {
          text: comment,
          datetime: new Date(),
          author: { username: username },
          onTicket: { id: ticket.id }
        }
      }})
      setComment("")
    }
    setCommenting(false);
  };
  const handleEditTicket = () => {
    const variables: Exact<{
      ticketID: string;
      ticket?: TicketPatch | null | undefined;
      remove?: TicketPatch | null | undefined;
    }> = {
      ticketID: ticket.id,
      ticket: {
        title,
        description,
        assigned: assignee
      },
    }
    if (removeAssignee) variables.remove = {
      assigned: {
        username: ticket.assigned?.username
      }
    }
    updateTicket({
      variables: variables
    });
    editTicket(false);
  };
  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <Ref innerRef={provided.innerRef}>
          <Card
            {...provided.draggableProps}
            style={{
              ...provided.draggableProps.style,
              width: "unset",
              backgroundColor: "#fefefe",
              padding: "10px",
              boxShadow: "0 1px 2px rgba(34,36,38,.15)",
              borderRadius: "0.5em",
              marginTop: "5px",
            }}
            {...provided.dragHandleProps}
          >
            <Card.Content>
              {editing && (
                <Form onSubmit={handleEditTicket}>
                  <Form.Input
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={(e, { value }) => setTitle(value)}
                  />
                  <Form.TextArea
                    placeholder="Description"
                    name="description"
                    value={description}
                    onChange={(e, { value }) => setDescription(value as string)}
                  />
                  <Dropdown
                    placeholder="Select User"
                    fluid
                    selection
                    options={userOptions}
                    value={assignee?.username}
                    closeOnChange={true}
                    onChange={(e,{value})=>handleAssignChange(value as string)}
                  />
                </Form>
              )}
              {!editing && (
                <>
                  {(Boolean(ticket.assigned?.image) || Boolean(ticket.assigned?.username)) && <Popup content={ticket.assigned?.displayName} hideOnScroll trigger={<Image
                    floated="right"
                    size="mini"
                    src={ticket.assigned?.image || `https://identicon-api.herokuapp.com/${ticket.assigned?.displayName?.replace(/[^A-Za-z0-9!?]/,'')}/120?format=png`}
                    avatar
                  />} />}
                  <Card.Header>{ticket?.title}</Card.Header>
                  <Card.Description className="description md"><Markdown>{ticket?.description as string}</Markdown></Card.Description>
                </>
              )}
            </Card.Content>
            {commenting && (
              <Card.Content>
                <Form onSubmit={handleNewComment}>
                  <Form.TextArea
                    placeholder="Comment"
                    name="comment"
                    value={comment}
                    onChange={(e, { value }) => setComment(value as string)}
                  />
                </Form>
              </Card.Content>
            )}
            <Card.Content>
              <Button.Group widths={3} size="mini">
                <Button
                  inverted
                  negative
                  animated="vertical"
                  color={editing || commenting ? "grey" : "blue"}
                  onClick={() =>
                    editing ? editTicket(false) : setCommenting(!commenting)
                  }
                  active={editing || commenting}
                >
                  <Button.Content visible>
                    <Icon
                      color={editing || commenting ? "grey" : undefined}
                      name={
                        editing || commenting ? "cancel" : "comment outline"
                      }
                    />
                  </Button.Content>
                  <Button.Content hidden>
                    {editing || commenting ? "Cancel" : "Add Comment"}
                  </Button.Content>
                </Button>
                <Button
                  inverted
                  negative
                  animated="vertical"
                  color={editing || commenting ? "green" : "orange"}
                  onClick={() =>
                    commenting
                      ? handleNewComment()
                      : editing
                      ? handleEditTicket()
                      : editTicket(true)
                  }
                  active={editing || commenting}
                >
                  <Button.Content visible>
                    <Icon
                      name={
                        editing || commenting ? "save outline" : "edit outline"
                      }
                    />
                  </Button.Content>
                  <Button.Content hidden>
                    {commenting
                      ? "Add Comment"
                      : editing
                      ? "Save Edits"
                      : "Edit Ticket"}
                  </Button.Content>
                </Button>
                {!commenting && !editing && <Button
                  inverted
                  negative
                  animated="vertical"
                  color="red"
                  onClick={() => setOpenConfirmDelete(true)}
                >
                  <Button.Content visible>
                    <Icon name="trash alternate outline" />
                  </Button.Content>
                  <Button.Content hidden>Delete Ticket</Button.Content>
                </Button>}
              </Button.Group>
              <Confirm
                content="Are you sure you want to delete this ticket?"
                open={openConfirmDelete}
                onCancel={()=>setOpenConfirmDelete(false)}
                onConfirm={()=>{
                  setOpenConfirmDelete(false)
                  deleteTicket({ variables: { ticketID: ticket.id } })
                }}
              />
            </Card.Content>
            {Boolean(ticket.comments?.length) && <Card.Content>
              <CommentsComp comments={ticket.comments as CommentT[]} />
            </Card.Content>}
          </Card>
        </Ref>
      )}
    </Draggable>
  );
}
