import {Fragment, useState} from "react"
import './App.css';
import Header from './components/Header'
import Footer from "./components/Footer";
import Section from "./components/Section";


function App() {
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("all")

  return (
    <>
      <Header/>
      <Section todos={todos} setTodos={setTodos} status={status} />
      <Footer todos={todos} setStatus={setStatus} setTodos={setTodos} />
    </>
  );
}

export default App;
