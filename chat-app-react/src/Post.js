import React, { useState } from "react";
import { useSubscription } from "@apollo/react-hooks";
import { useMutation } from '@apollo/react-hooks';
import { SUBSCRIPTION_QUERY, SEND_MESSAGE } from "./Query"
import "./index.css";

const Posts = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [sendMessage, { loading: mutationLoading, error: mutationError }] = useMutation(SEND_MESSAGE);
  const { data, loading: subscriptionLoading, error: subscriptionError } = useSubscription(SUBSCRIPTION_QUERY);

  if (!data || !data.queryMessage) return (<h1>No Database Connection...</h1>);
  if (subscriptionLoading || mutationLoading) return (<h1>Loading...</h1>);
  if (subscriptionError || mutationError) return (<h1>Error...</h1>);

  const handleClick = () => {
    if (name && message) {
      sendMessage({ variables: { name, message, time: (new Date()).toISOString() } });
    }
  }

  return (
    <>
      <hr></hr>
      <label>Enter you name : </label>
      <input required type="text" name="name" maxLength="25" onChange={e => setName(e.target.value)}></input>
      <label> Enter your message : </label>
      <input required type="text" name="message" onChange={e => setMessage(e.target.value)}></input>
      <button type="button" onClick={() => handleClick()}>Post</button>
      <hr></hr>
      <h3>Total Posts : {data.queryMessage.length}</h3>
      <hr></hr>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Author</th>
            <th>Post</th>
          </tr>
        </thead>
        <tbody>
          {data.queryMessage.map(m => (
            <tr>
              <td>{(new Date(m.time)).toUTCString()}</td>
              <td align="left">{m.name}</td>
              <td width="1000" align="left">{m.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Posts;
