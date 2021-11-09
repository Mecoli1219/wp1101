import './App.css';
import {useState} from "react"
import {guess, startGame, restart, serverGuess} from './axios'

var memory = [0, 101]

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [hasLose, setHasLose] = useState(false)
  const [number, setNumber] = useState("")
  const [status, setStatus] = useState("")
  const [gameWithServer, setGameWithServer] = useState(false)
  const [serverStatus, setServerStatus] = useState({number:"", status:""})
  const [preNumber, setPreNumber] = useState("")

  const memorize  = (number, status) => {
    if (number*1 > memory[0] && number *1 < memory[1]){
      if (status === "Bigger"){
        memory[0] = number*1
      }else{
        memory[1] = number*1
      }
    }
    console.log(memory)
  }

  const handleStart = (playWithServer) => {
    return async() =>{
      const response = await startGame(playWithServer)
      if (response){
        setHasStarted(true)
        setGameWithServer(playWithServer)
      }else{
        alert("Backend server is unavailable.")
      }
    }
  }

  const handleInputOnChange = (e) => {
    setNumber(e.target.value)
  }

  const handleGuess = async() => {
    const response = await guess(number)
    if (response === 'Equal') setHasWon(true)
    else{
      memorize(number, response)
      setStatus(response)
      setNumber('')
    }
  }

  const handleGuessWithServer = async() => {
    const cli_response = await guess(number)
    if (cli_response === 'Equal') {
      setHasWon(true)
    }else{
      memorize(number, cli_response)
      setStatus(cli_response)
      setPreNumber(number)
      setNumber('')
      const server_response = await serverGuess(memory)
      if (server_response.status === 'Equal'){
        setHasLose(true)
      }else{
        memorize(server_response.number, server_response.status)
        setServerStatus(server_response)
      }
    }
  }

  const handleRestart = (playWithServer) => {
    return async() =>{
      memory = [0,101]
      const response = await restart(playWithServer)
      if(response){
        setHasStarted(true)
        setStatus('')
        setNumber('')
        setHasWon(false)
        setHasLose(false)
        setServerStatus({number:"", status:""})
        setPreNumber('')
      }else{
        alert("Backend server is unavailable.")
      }
    }
  }

  const startMenu = 
    <div>
      <button onClick={handleStart(false)} >start original game</button><br/>
      <button onClick={handleStart(true)} >play game with server</button>
    </div>

  const gameMode = 
    <>
      <p>Guess a number between 1 to 100</p>
      <input type="text" onChange={handleInputOnChange} />
      <button onClick={handleGuess} disabled={!number} >guess!</button>
      <p>{status}</p>
    </>

  const gameWithServerMode = 
    <>
      <p>Guess a number between 1 to 100</p>
      <input type="text" onChange={handleInputOnChange} />
      <button onClick={handleGuessWithServer} disabled={!number} >guess!</button>
      <div>
        <div>
          <h1>Your guess: {preNumber}</h1>
          <p>{status}</p>
        </div>
        <div>
          <h1>Server's guess: {serverStatus.number}</h1>
          <p>{serverStatus.status}</p>
        </div>
      </div>
    </>
  
  const winningMode = 
    <>
      <p>you {hasWon ? "win!": "lose..."} The number was {hasWon ? number : serverStatus.number}.</p>
      <button onClick={handleRestart(false)}>restart original game</button><br/>
      <button onClick={handleRestart(true)}>restart game with server</button>
    </>

  const game = 
    <div>
      {(hasWon || hasLose) ? winningMode : (gameWithServer ? gameWithServerMode : gameMode)}
    </div>

  return (
    <div className="App">
      {hasStarted ? game : startMenu}
    </div>
  );
}

export default App;
