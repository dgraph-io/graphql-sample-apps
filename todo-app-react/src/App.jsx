import { Button, Container, Flex, Input, Item, Spacer, Title, Paragraph, Card, List, Link, CopyRight, Img } from './Styles'
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useAuth0 } from '@auth0/auth0-react';
import { GET_TODOS, ADD_TODO, DELETE_TODO, CLEAR_COMPLETED_TODOS, TOGGLE_TODO, UPDATE } from "./GraphQLData";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MyModal from './components/modal'
import React from 'react';

const App = () => {

  const [input, setInput] = useState("");
  const[editTask, setEditTask] = useState(false)
  const [selectedTodo, setSelectedTodo] = useState(null);
  
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const { loading, error, data } = useQuery(GET_TODOS)

  const [add] = useMutation(ADD_TODO)
  const [del] = useMutation(DELETE_TODO)
  const [clear] = useMutation(CLEAR_COMPLETED_TODOS)
  const [toggleTodo] = useMutation(TOGGLE_TODO)
  const [upd] = useMutation(UPDATE)
  
  if (loading) return <p>Loading</p>
  if (error) {
    return <p>`Error: ${error.message}`</p>
  }

  const addNewTodo = () => {
    if (!input.trim() && isAuthenticated) {
      return toast("Please type something to-do");
    }

    if (input && !isAuthenticated) {
      return toast("You must be logged in to perform this action.");
    }

    if (!input && !isAuthenticated) {
      return toast("You must be logged in to perform this action.");
    }
  
    add({
      variables: {
        task: {
          title: input,
          completed: false,
          user: { username: user.email },
        },
      },
      refetchQueries: [{
        query: GET_TODOS
      }],
    });
  
    setInput("");
  };

  const updateTaskModal = selectedTodo => {
    const newText = selectedTodo.value;

    upd({
      variables: {
        taskID: selectedTodo.id,
        title: newText
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    })

    setEditTask(false)
  }
  
  const deleteTodo = (id) =>
    del({
      variables: { id },
      update(cache, { data }) {
        data.deleteTask.task.map(t => cache.evict({ id: cache.identify(t) }))
      },
    })

  const handleInputChange = (event, inputId) => {
    const newValue = event.target.value;
    if (inputId === "input1") {
      setInput(newValue);
    } else if (inputId === "input2") {
      setSelectedTodo({
        ...selectedTodo,
        value: newValue,
      });
    }
  };

  const toggle = todoToToggle => {
    toggleTodo({
      variables: {
        taskID: todoToToggle.id,
        completed: !todoToToggle.completed
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    })
  }

  const clearCompleted = () =>
    clear({
      variables: {
        completed: true
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    })

  const openModal = (todo) => {
    console.log(todo.value);
    setSelectedTodo(todo);
    setEditTask(true);
  }

  const closeModal = () => {
    setSelectedTodo(null);
    setEditTask(false);
  }

  const activeTodoCount = data.queryTodo.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1
  }, 0)

  const completedCount = data.queryTodo.length - activeTodoCount;

  const logInOut = !isAuthenticated ? (
    <Flex direction="row">
      <Button width="100px" >
        <a href="#" onClick={loginWithRedirect}>Log in</a>
      </Button>
    </Flex>
  ) : (
    <>
    <Flex direction="row">
      <Button width="100px">
        <Link
          href="#"
          onClick={() => {
            logout({ returnTo: window.location.origin });
          } }
        >
          Log out
        </Link>{" "}
      </Button>
      <Paragraph >
        <h4><i class='bx bxs-user-circle'></i> {user.email}</h4>
      </Paragraph>
      </Flex>
    </>
  );

  return (
    <Container text-align="center">
      {logInOut} 
      <Title>
        Todo List <Img src="/dgraph_color_icon.png"></Img>
      </Title>
      
      <Flex direction="row">
        <Input placeholder='New Task'
               value={input}
               onChange={(e) => handleInputChange(e, "input1")}
               id="input1"/>
        <Button onClick={addNewTodo}>Add</Button>
        <Button onClick={clearCompleted}>Clear</Button>
      </Flex>
        <ToastContainer theme="dark"/>
      <Spacer margin="6px" />
      
      <Flex direction="row">
        <Card>
          <Paragraph>Active Tasks: {activeTodoCount}</Paragraph>  
        </Card>
        <Card>
          <Paragraph>Completed Tasks: {completedCount}</Paragraph>
        </Card>
      </Flex>
      <Spacer margin="6px" />
      
      <List>
        {data.queryTodo.map((todo) => (
          <>
            <Item checked={todo.completed} key={todo.id} >
              <p className='texto'>
                {todo.value}
              </p>
              <Flex direction="row">
                <button onClick={() => toggle(todo)}>
                  <i className='bx bx-check'></i>
                </button>
                <button onClick={() => openModal(todo)}>
                  <i className='bx bxs-edit-alt' ></i>
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                  <i className='bx bx-trash'></i>
                </button>
                
              </Flex>
            </Item>
            <Spacer margin="12px" />
          </>
          )
        )}
        <MyModal isOpen={editTask} todo={selectedTodo}>
        {selectedTodo && (
          <>
          <Input type="text" value={selectedTodo.value} onChange={(e) => handleInputChange(e, "input2")} id="input2" width="60%"></Input>
          <Button onClick={() => updateTaskModal(selectedTodo)}>Save</Button>
          <Button onClick={closeModal}>Close</Button>
          </> 
        )}
        </MyModal>
      </List>
      <CopyRight>&copy; Dgraph Labs</CopyRight>
    </Container>
  )
}

export default App
