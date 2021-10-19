import React, { Component } from 'react'
import './index.css'

export default class Header extends Component {
    render() {
        return (
            <header className="todo-app__header">
                <h1 className="todo-app__title">todos</h1>
            </header>
        )
    }
}
