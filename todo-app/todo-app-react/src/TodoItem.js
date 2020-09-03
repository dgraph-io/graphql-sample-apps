import React, { useState, useEffect } from 'react'
import classNames from 'classnames'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

function TodoItem(props) {
  const [editText, setEditText] = useState(props.todo.title);
  const editField = React.useRef(null)

  useEffect(() => {
    if (!editField.current && props.editing) {
      const node = editField.current
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  })

  const handleSubmit = event => {
    const {onDestroy, onSave } = props
    var val = editText.trim()
    if (val) {
      onSave(val)
      setEditText(val)
    } else {
      onDestroy()
    }
  }

  const handleEdit = () => {
    const { onEdit, todo } = props
    onEdit()
    setEditText(todo.title)
  }

  const handleKeyDown = event => {
    const { onCancel, todo } = props
    if (event.which === ESCAPE_KEY) {
      setEditText(todo.title)
      onCancel(event)
    } else if (event.which === ENTER_KEY) {
      handleSubmit(event)
    }
  }

  const handleChange = event => {
    if (props.editing) {
      setEditText(event.target.value)
    }
  }

  const { editing, onDestroy, onToggle, todo } = props
  return (
    <li className={classNames({
      completed: todo.completed,
      editing: editing,
    })}>
      <div className="view">
        <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={onToggle}
        />
        <label onDoubleClick={handleEdit}>
            {todo.title}
        </label>
        <button className="destroy" onClick={onDestroy} />
      </div>
      <input
        ref={editField}
        className="edit"
        value={editText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </li>
  )
}

export default TodoItem
