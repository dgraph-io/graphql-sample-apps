import { useAuth0 } from "@auth0/auth0-react";
import Markdown from "markdown-to-jsx";
import React, { useEffect, useState } from "react";
import { Button, Comment, Confirm, Form } from "semantic-ui-react";
import { Comment as CommentT } from "../../types/graphql"
import TimeAgo from "../../utils/TimeAgo";
import updateCacheAfterDelete from "../../utils/updateCacheAfterDelete";
import { useDeleteCommentMutation, useUpdateCommentMutation } from "./types/operations";

const CLAIMS = process.env.REACT_APP_AUTH0_CLAIMS_KEY as string;

interface CommentProps {
  comment: CommentT
}

export const CommentComp: React.FC<CommentProps> = ({ comment }) => {
  const {user} = useAuth0()
  const [editing, setEditing] = useState(false)
  const [commentVal, setCommentVal] = useState(comment.text)
  const [openConfirmDelete,setOpenConfirmDelete] = useState(false)
  useEffect(()=>setCommentVal(comment.text),[comment])
  const claims = user?.[CLAIMS] || {};
  const isAdmin: Boolean = claims?.isAdmin || false
  const [updateComment] = useUpdateCommentMutation({
    variables: {
      commentID: comment.id,
      commentPatch: {
        text: commentVal
      }
    }
  })
  const handleCommentUpdate = () => {
    updateComment()
    setEditing(false)
  }
  const [deleteComment] = useDeleteCommentMutation({
    update: updateCacheAfterDelete,
    variables: {
      commentID: comment.id
    }
  })
  const canDelete = isAdmin || comment.author.username===user.email
  const canEdit = comment.author.username===user.email

  // const isAdmin = false // FIXME: set this from Auth0 info
  return (
    <Comment key={comment?.id}>
      <Comment.Avatar src={comment?.author?.image || "https://github.githubassets.com/images/modules/logos_page/Octocat.png"} />
      <Comment.Content>
        <Comment.Author as="span">{comment?.author.displayName}</Comment.Author>
        <Comment.Metadata>
          <div>{Boolean(comment?.datetime) && <TimeAgo date={comment?.datetime as Date} />}</div>
        </Comment.Metadata>
        {!editing && <Comment.Text className="comment md"><Markdown>{comment?.text}</Markdown></Comment.Text>}
        {editing && <Comment.Text className="comment md">
          <Form onSubmit={handleCommentUpdate}>
            <Form.Input
              name="comment"
              placeholder="Comment"
              value={commentVal}
              onChange={(e,{value})=>setCommentVal(value)}
              action={{
                color: "green",
                icon: "save outline"
              }}
            >
              <input />
              <Button onClick={()=>setEditing(false)} color="grey" icon="close" />
              <Button type="submit" color="green" icon="save outline" />
            </Form.Input>
          </Form>
        </Comment.Text>}
        {(canDelete || canEdit) && <Comment.Actions>
          {canEdit && <Comment.Action onClick={()=>setEditing(true)}>Edit</Comment.Action>}
          {canDelete && <>
            <Comment.Action onClick={()=>setOpenConfirmDelete(true)}>Delete</Comment.Action>
            <Confirm 
              content="Ae you sure you want to delete this comment?"
              open={openConfirmDelete}
              onCancel={()=>setOpenConfirmDelete(false)}
              onConfirm={()=>{
                setOpenConfirmDelete(false)
                deleteComment()
              }}
            />
          </>}
        </Comment.Actions>}
      </Comment.Content>
    </Comment>
  )
}

interface CommentsProps {
  comments: CommentT[]
}

export const CommentsComp: React.FC<CommentsProps> = ({ comments }) => {
  const [limit, setLimit] = useState(true)
  const toggleLimit = () => setLimit(!limit)
  return (
    <Comment.Group>
      {comments?.map((comment,i) => {
        if (limit && i>2) return null
        return (
          <CommentComp comment={comment} key={comment.id} />
        )
      })}
      {comments.length>3 && <Button onClick={()=>toggleLimit()} >{limit ? "Show More" : "Show Less"}</Button>}
    </Comment.Group>
  )
}

export default CommentsComp