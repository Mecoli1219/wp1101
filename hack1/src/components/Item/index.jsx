import React, { Component } from 'react'
import x from "./x.png"
import './index.css'

export default class Item extends Component {

    constructor(props){
        super(props)
        this.state =  {
            style: {
                textDecoration: "",
                opacity: 1
            }
        }
        if (props.todo.done){
            this.state.style.textDecoration = "line-through"
            this.state.style.opacity = 0.5
        }
    }

    changeTodoStatus = (event) => {
        const {checked} = event.target
        const {todo, updateTodo} = this.props
        updateTodo(todo.id, checked)
        const style = {}
        if (checked === true){
            style.textDecoration = "line-through"
            style.opacity = 0.5
        }else{
            style.textDecoration = ""
            style.opacity = 1
        }
        this.setState({style})

    }

    delete = ()=> {
        const {todo, deleteTodo} = this.props
        deleteTodo(todo.id)
    }

    render() {
        const {todo} = this.props
        const {style} = this.state

        return (
            <li className="todo-app__item" id={`li-${todo.id}`} >
                <div className="todo-app__checkbox">
                    <input type="checkbox" id={todo.id} checked={todo.done} onChange={this.changeTodoStatus}/>
                    <label htmlFor={todo.id}></label>
                </div>
                <h1 className="todo-app__item-detail" id={`h1-${todo.id}`} style={style}>{todo.detail}</h1>
                <img src={x} alt="x" className="todo-app__item-x" id={todo.id} onClick={this.delete} />
            </li>
        )
    }
}
