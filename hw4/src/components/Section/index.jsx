import React, { Component } from 'react'
import './index.css'
import Item from '../Item'

export default class Section extends Component {

    state = {
        next_id: 0
    }

    updateTodo = (id, done) => {
        const {todos, setTodos} = this.props
        const newTodos = todos.map((todo)=>{
            if (todo.id === id){
                return {...todo, done}
            }else{
                return todo
            }
        })
        setTodos(newTodos)
    }

    handleKeyUp = (event)=>{
        const {next_id} = this.state
        const {keyCode, target} = event
        const {todos, setTodos} = this.props
        if(keyCode !== 13) return
        if (target.value.trim() === ''){
            alert('ADD Something!')
            return
        }
        const todoObj = {id: next_id, detail:target.value, done:false}
        this.setState({next_id: next_id +1})
        const newTodos = [...todos, todoObj]
        setTodos(newTodos)
        target.value = ''
    }

    deleteTodo = (id) => {
        const {todos, setTodos} = this.props
        const newTodos = todos.filter((todo)=> {
            return todo.id !== id
        })
        setTodos(newTodos)
    }

    render() {
        const {todos, status} = this.props
        const ul_style = {display:"none"}
        if (todos.length !== 0){
            ul_style.display = "block"
        }
        var filtered = []
        if (status === "all"){
            filtered = todos
        }else if(status === "active"){
            filtered = todos.filter((todo)=>{
                return !todo.done
            })
        }else{
            filtered = todos.filter((todo)=>{
                return todo.done
            })
        }

        return (
            <section className="todo-app__main" >
                <input type="text" className="todo-app__input" id="todo-input" placeholder="What needs to be done?" onKeyUp={this.handleKeyUp}/>
                <ul className="todo-app__list" id="todo-list" style={ul_style}>
                    {
                        filtered.map((todo)=>{
                            return <Item todo={todo} key={todo.id} updateTodo={this.updateTodo} deleteTodo={this.deleteTodo} />
                        })
                    }
                </ul>
            </section>
        )
    }
}
