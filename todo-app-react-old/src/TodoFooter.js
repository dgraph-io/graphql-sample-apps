import React from 'react'
import classNames from 'classnames'

import defs from './defs'
import Utils from './Utils'

export default class TodoFooter extends React.Component {
  render() {
    const { completedCount, count, nowShowing, onClearCompleted } = this.props
    const clearButton = completedCount === 0
      ? null
      : (
        <button
          className="clear-completed"
          onClick={onClearCompleted}>
          Clear completed
        </button>
      )
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{count}</strong> {Utils.pluralize(count, 'item')} left
        </span>
        <ul className="filters">
          <li>
            <a
              href="#/"
              className={classNames({selected: nowShowing === defs.ALL_TODOS})}>
                All
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/active"
              className={classNames({selected: nowShowing === defs.ACTIVE_TODOS})}>
                Active
            </a>
          </li>
          {' '}
          <li>
            <a
              href="#/completed"
              className={classNames({selected: nowShowing === defs.COMPLETED_TODOS})}>
                Completed
            </a>
          </li>
        </ul>
        {clearButton}
      </footer>
    )
  }
}
