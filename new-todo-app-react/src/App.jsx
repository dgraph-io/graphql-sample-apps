import { Button, Container, Flex, Input, Item, Spacer, Title, Paragraph, Card, List, Link, CopyRight, Img } from './Styles'
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useAuth0 } from '@auth0/auth0-react';
import { GET_TODOS, ADD_TODO, DELETE_TODO, UPDATE_TODO, CLEAR_COMPLETED_TODOS, TOGGLE_COMPLETED, TOGGLE_TODO, UPDATE } from "./GraphQLData";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

// import { Modal, Form } from 'semantic-ui-react';
import MyModal from './components/modal'
// import Modal from 'react-modal';
import React from 'react';

const ENTER_KEY = 13

const App = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a to-do app", completed: false },
    { id: 3, text: "Celebrate!", completed: false },
  ]);
 
  const [input, setInput] = useState("");
  const [getEditing, setEditing] = useState(null);
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const[editTask, setEditTask] = useState(false)
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState('');

  {/* Logic for render to-do out of map todo */}
  const [selectedTodo, setSelectedTodo] = useState(null);

  const { loading, error, data } = useQuery(GET_TODOS)

  const [add] = useMutation(ADD_TODO)
  const [del] = useMutation(DELETE_TODO)
  const [upd] = useMutation(UPDATE_TODO)
  const [clear] = useMutation(CLEAR_COMPLETED_TODOS)
  const [toggleTodo] = useMutation(TOGGLE_TODO)
  const [up] = useMutation(UPDATE)
  
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

  const updateTaskPrompt = todo => {
    const newValue = prompt("Edit your to-do", todo.value);
    const taskIDToUpdate = todo.id;

    // const updatedTaskData = {
    //   id: taskIDToUpdate,
    //   value: newValue,
    //   completed: false,
    // };

    up({
      variables: {
        taskID: todo.id,
        title: newValue
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    })
  }

  const updateTaskModal = selectedTodo => {
    const newText = selectedTodo.value;
    // const taskIDToUpdate = selectedTodo.id;

    // const updatedTaskData = {
    //   id: taskIDToUpdate,
    //   value: newValue,
    //   completed: false,
    // };

    up({
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
 
  // const addTodo = () => {
  //   if (input.trim()) {
  //     setTodos([...todos, { id: Math.random(), text: input.trim(), completed: false }]);
  //     setInput("");
  //   }
  // };
 
  // const deleteTodo = (id) => {
  //   setTodos(todos.filter((todo) => todo.id !== id));
  // };
 
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? {...todo, text: newText } : todo))
    );
  };

  // const toogleChecked = (id, completed) => {
  //   const index = todos.findIndex(todo => todo.id === id);
  //   const newList = todos;
  //   newList[index].completed = !completed;
  //   setTodos([...newList]);
  // };

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

  // Count tasks
  const activeTodoCount = data.queryTodo.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1
  }, 0)

  const completedCount = data.queryTodo.length - activeTodoCount;

  const logInOut = !isAuthenticated ? (
    <Button>
      <a href="#" onClick={loginWithRedirect}>Log in</a>
    </Button>
  ) : (
    <>
      <Button width="100px">
        <Link
          href="#"
          onClick={() => {
            logout({ returnTo: window.location.origin });
          } }
        >
          Log out
        </Link>{" "}
        {/* once you are finished, {user.email}. */}
      </Button>
      <Paragraph>
        <i class='bx bxs-user-circle'></i> {user.email}
      </Paragraph>
    </>
  );

  // Função que abre a modal
  const openModal = (todo) => {
    console.log(todo.value);
    {/* Logic for render to-do out of map todo */}
    setSelectedTodo(todo);
    setEditTask(true);
  }

  // Função que fecha a modal
  const closeModal = () => {
    {/* Logic for render to-do out of map todo */}
    setSelectedTodo(null);
    setEditTask(false);
  }


  return (
    <Container text-align="center">
      {logInOut} 
      {/* {showModal} */}
      <Title>
        Todo List <Img src="/dgraph_color_icon.png"></Img>
      </Title>
      {/* <Spacer/> */}
      
      <Flex direction="row">
        <Input placeholder='New Task'
               value={input}
               onChange={(e) => handleInputChange(e, "input1")}
               id="input1"/>
        <Button onClick={addNewTodo}>Add</Button>
        <Button onClick={clearCompleted}>Clear</Button>
        {/* <Button onClick={notify}>Notify !</Button> */}
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
                {/* <button onClick={() => {updateTaskPrompt(todo)}}>
                  <i className='bx bxs-edit-alt' ></i>
                </button> */}
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
        {/* Logic for render to-do out of map todo */}
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
