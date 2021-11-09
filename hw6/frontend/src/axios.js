import axios from "axios"

const instance = axios.create({baseURL: 'http://localhost:4000/api/guess'})

const startGame = async(playWithServer) => {
    try{
        const {data:{msg}} = await instance.post('/start', {params: {playWithServer}})
        return msg
    }catch(err){
        console.log(err)
        return false
    }
}


const guess = async(number) => {
    try {
        const {data:{msg}} = await instance.get('/guess', {params: {number}})
        return msg
    } catch(err) {
        try{
            console.log(err)
            const {status} = err.response
            if(status === 406){
                return `Error: "${number}" is not a valid number (1 - 100)`
            }else{
                return `Error: ${status}`
            }
        }catch{
            return "Server unavailable..."
        }
    }
}

const serverGuess = async(memory)=>{
    try {
        const {data:{server}} = await instance.get('/server-guess', {params: {memory}})
        return server
    }
    catch(err) {
        try{
            console.log(err)
            const {status} = err.response
            return `Error: ${status}`
        }catch{
            return "Server unavailable..."
        }
    }
}

const restart = async(playWithServer) => {
    try{
        const {data:{msg}} = await instance.post('/restart', {params: {playWithServer}})
        return msg
    }catch(err){
        console.log(err)
        return false
    }
}

export {startGame, guess, restart, serverGuess}