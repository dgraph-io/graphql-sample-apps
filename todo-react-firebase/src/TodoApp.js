import React, { useState, useEffect, useContext } from 'react'
import { useQuery, useMutation } from "@apollo/react-hooks";
import {withRouter} from "react-router";
import defs from './defs'
import history from './history';
import TodoFooter from './TodoFooter'
import TodoItem from './TodoItem'
import { GET_USER, GET_TODOS, ADD_USER, ADD_TODO, DELETE_TODO, TOGGLE_TODO, UPDATE_TODO, CLEAR_COMPLETED_TODO, TOGGLE_ALL_TODO } from "./GraphQLData";
import { AuthContext } from './Auth';

const ENTER_KEY = 13

const useImperativeQuery = (query) => {
  const { refetch } = useQuery(query, { skip: true });
  const imperativelyCallQuery = (variables) => {
    return refetch(variables);
  };
  return imperativelyCallQuery;
};

const TodoApp = () => {
  const [nowShowing, setNowShowing] = useState(defs.ALL_TODOS);
  const [getEditing, setEditing] = useState(null);
  const [newTodo, setNewTodo] = useState("");
  const [shownTodos, setShownTodos] = useState([]);

  const [addUser] = useMutation(ADD_USER);
  const [addTodo] = useMutation(ADD_TODO);
  const [toggleTodo] = useMutation(TOGGLE_TODO);
  const [toggleAllTodo] = useMutation(TOGGLE_ALL_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);
  const [updateTodo] = useMutation(UPDATE_TODO);
  const [clearCompletedTodo] = useMutation(CLEAR_COMPLETED_TODO);
  const getUsers = useImperativeQuery(GET_USER)

  const {currentUser} = useContext(AuthContext);

  const createUser = () => {
    if (currentUser === undefined) {
      return null;
    }
    const { data: getUser } = getUsers({
      username: currentUser.email
    });
    if (getUser && getUser.getUser === null) {
      const newUser = {
        username: currentUser.email,
        name: currentUser.nickname,
      };
      addUser({
        variables: {
          user: newUser
        }
      })
    }
  }

  const { loading, error, data } = useQuery(GET_TODOS);
  const getData = () => {
    if (loading) {
      return null;
    }
    if (error) {
      console.error(`GET_TODOS error: ${error}`);
      return `Error: ${error.message}`;
    }
    if (data.queryTask) {
      setShownTodos(data.queryTask)
    }
  }

  useEffect(() => {
    const setNowShowingFn = nowShowing => () => setNowShowing(nowShowing)
    const routes = {
      '/': setNowShowingFn(defs.ALL_TODOS),
      '/active': setNowShowingFn(defs.ACTIVE_TODOS),
      '/completed': setNowShowingFn(defs.COMPLETED_TODOS),
    }
    const processLocationHash = hash => {
      if (hash) {
        hash = hash.substring(1)
      }
      const route = routes[hash] || routes['/']
      route()
    }
    processLocationHash(history.location.hash)
    history.listen((location, action) =>
      processLocationHash(location.hash)
    )
    getData()
  }, [currentUser, data]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = event => {
    setNewTodo(event.target.value)
  }

  const handleNewTodoKeyDown = event => {
    if (event.keyCode !== ENTER_KEY) {
      return
    }
    event.preventDefault()
    const val = newTodo
    if (val) {
      add(val)
      setNewTodo('')
    }
  }

  const add = (title) =>
    addTodo({
      variables: { task: [
        { title: title, completed: false, user: { username: currentUser.email } }
      ]},
      refetchQueries: [{
        query: GET_TODOS
      }]
    });

  const destroy = todo =>
    deleteTodo({
      variables: {
        taskID: [todo.id]
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    })

  const toggleAll = event => {
    const checked = event.target.checked
    toggleAllTodo({
      variables: {
        completed: checked
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    })
  }

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

  const edit = todo => setEditing(todo.id)

  const save = (todoToSave, text) => {
    updateTodo({
      variables: {
        taskID: todoToSave.id,
        task: {
          title: text
        }
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    })
    setEditing(null)
  }

  const cancel = () =>
    setEditing(null)

  const clearCompleted = () =>
    clearCompletedTodo({
      variables: {
        completed: true
      },
      refetchQueries: [{
        query: GET_TODOS
      }]
    })

  const newTodos = shownTodos.filter(todo => {
    switch (nowShowing) {
      case defs.ACTIVE_TODOS:
        return !todo.completed
      case defs.COMPLETED_TODOS:
        return todo.completed
      default:
        return true
    }
  })

  const todoItems = newTodos.map(todo => {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        onToggle={() => toggle(todo)}
        onDestroy={() => destroy(todo)}
        onEdit={() => edit(todo)}
        editing={getEditing === todo.id}
        onSave={text => save(todo, text)}
        onCancel={cancel}
      />
    )
  })

  const activeTodoCount = shownTodos.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1
  }, 0)

  const completedCount = shownTodos.length - activeTodoCount

  const footer = (activeTodoCount || completedCount)
    ? <TodoFooter
        count={activeTodoCount}
        completedCount={completedCount}
        nowShowing={nowShowing}
        onClearCompleted={clearCompleted}
      />
    : null

  const main = !shownTodos.length
    ? null
    : (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={toggleAll}
          checked={activeTodoCount === 0}
        />
        <label
          htmlFor="toggle-all"
        />
        <ul className="todo-list">
          {todoItems}
        </ul>
      </section>
    )

  return (
    <div>
      <header className="header">
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onKeyDown={handleNewTodoKeyDown}
          onChange={handleChange}
          autoFocus={true}
        />
      </header>
      {main}
      {footer}
    </div>
  )
}

export default withRouter(TodoApp);
