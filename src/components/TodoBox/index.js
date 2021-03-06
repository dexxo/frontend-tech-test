import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1'

import { getTodos } from '../../actions/todoActions';

import Todo from '../Todo';

class TodoBox extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.dispatch(getTodos());
  }

  render(){
    return (
      <div class="todo-box">
        {this.props.todos.map(todo => {
        return <Todo
          key={uuid()}
          id={todo.id}
          title={todo.title}
          description={todo.description}
          color={todo.color}
          complete={todo.complete}
          dispatch={this.props.dispatch}
          currPage={this.props.currPage}
         />;
       })}
      </div>
    );
  }
}

TodoBox.propTypes = {
  todos: PropTypes.array,
  currPage: PropTypes.number,
  dispatch: PropTypes.func
}

export default TodoBox;