import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {

    clearComplete = (undone) => {
        return ()=>{
            const {setTodos} = this.props
            setTodos(undone)
        }
    }

    render() {
        const {todos, setStatus} = this.props
        const undone = todos.filter((todo)=>{
            return !todo.done
        })
        const undone_num = undone.length
        const done_num = todos.length - undone_num
        const footer_style = {display:"none"}
        if (todos.length !== 0){
            footer_style.display = "flex"
        }
        const p_style = {display:"block", color:"white"}
        const button_style = {display:"none"}
        if(done_num !== 0){
            p_style.display = "none"
            button_style.display = "block"
        }
        return (
            <footer className="todo-app__footer" id="todo-footer" style={footer_style}>
                <div className="todo-app__total" id="todo-app__total">{undone_num} left</div>
                <ul className="todo-app__view-buttons">
                <button id="all-button" onClick={() =>{setStatus("all")}} >All</button>
                <button id="active-button" onClick={() =>{setStatus("active")}} >Active</button>
                <button id="complete-button" onClick={() =>{setStatus("complete")}} >Completed</button>
                </ul>
                <div className="todo-app__clean">
                <button id="clear" style={button_style} onClick={this.clearComplete(undone)} >Clear completed</button>
                <p style={p_style} id="p" >clear complete</p>
                </div>
            </footer>
        )
    }
}
