import './styles.scss';

import React from 'react';
import PropTypes from 'prop-types';

import { removeTodo, editTodo } from '../../actions/todoActions';

const initialState = () => {
  return {
    id: null,
    title: '',
    description: '',
    complete: false
  }
};

class Todo extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState();
    this.updateField = this.updateField.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  updateField(field, e){
    e.preventDefault();
    this.setState({[field]: e.target.value});
  }

  saveTodo(e){
    e.preventDefault();
    this.props.dispatch(editTodo({
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      complete: this.state.complete
    }));
  }

  removeTodo(e){
    e.preventDefault();
    this.props.dispatch(removeTodo(this.props.id));
  }

  changeColor(id) {
    this.todoElm.classList.remove('yellow', 'blue', 'purple');
    switch(id){
      case 1:
        this.todoElm.classList.add('yellow');
        break;
      case 2:
        this.todoElm.classList.add('blue');
        break;
      case 3:
        this.todoElm.classList.add('purple');
        break;
    }
  }

  toggleTodo(e){
    e.preventDefault();
    const flag = this.state.complete ? false : true;
    this.setState({complete: flag});
    this.props.dispatch(editTodo({
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      complete: flag
    }));
  }

  componentWillMount() {
    this.setState({
      id: this.props.id,
      title: this.props.title,
      description: this.props.description,
      complete: this.props.complete
    });
  }

  componentWillUnmount(){
    this.setState(initialState());
  }

  render(){
    return (
      <div class="todo" ref={(elm) => this.todoElm = elm}>
        <div class="todo-title-content">
          <input placeholder={'Title'} disabled={this.state.complete} class="todo-title" onChange={this.updateField.bind(this, 'title')} onBlur={this.saveTodo} value={this.state.title} />
        </div>
        <div class="todo-description-content">
          <textarea placeholder={'Description'} disabled={this.state.complete} class="todo-description" onChange={this.updateField.bind(this, 'description')} onBlur={this.saveTodo} value={this.state.description}></textarea>
        </div>
        <i class="fa fa-thumbtack todo-pin"></i>
        <i class="fa fa-trash todo-icon-delete" aria-hidden="true"></i>
        <i class="fa fa-check-circle todo-icon-complete"></i>
        <i class="todo-complete" onClick={this.toggleTodo}></i>
        <i class="todo-delete" onClick={this.removeTodo}></i>
        <div class="todo-colors">
          <span class="yellow" onClick={this.changeColor.bind(this, 1)}></span>
          <span class="blue" onClick={this.changeColor.bind(this, 2)}></span>
          <span class="purple" onClick={this.changeColor.bind(this, 3)}></span>
        </div>
        {this.state.complete ? <div class="todo-done">
          <span>- Done -</span>
        </div>: ''}
      </div>
    );
  }
}

Todo.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  complete: PropTypes.bool,
  dispatch: PropTypes.func
};


export default Todo;