import express from 'express'
import {getNumber, genNumber, genNumberFromMemory} from "../core/getNumber"

const router = express.Router()

function roughScale(x, base) {
  var parsed = Number.parseInt(x, base);
  if (Number.isNaN(parsed)) {
    return 0;
  }
  if ('' + parsed !== x){
    return 0;
  }
  return parsed;
}

router.post('/start', (_, res) => {
    genNumber()
    res.json({msg: 'The game has started.'})
})

router.get('/guess', (req, res) => {
    const number = getNumber()
    if (number === 0){
        genNumber()
    }
    const guessed = roughScale(req.query.number, 10)
    if (!guessed || guessed < 1 || guessed  > 100){
        res.status(406).send({msg: "Not a legal number."})
    }else if (number === guessed){
        res.status(200).send({msg: "Equal"})
    }else if (guessed > number){
        res.status(200).send({msg: "Smaller"})
    }else {
        res.status(200).send({msg: "Bigger"})
    }
})

router.get('/server-guess', (req, res) => {
    const number = getNumber()
    if (number === 0){
        genNumber()
    }
    const server_number = genNumberFromMemory(req.query.memory)
    const guessed = server_number
    if (number === guessed){
        res.status(200).send({server: {number: server_number, status: "Equal"}})
    }else if (guessed > number){
        res.status(200).send({server: {number: server_number, status: "Smaller"}})
    }else {
        res.status(200).send({server: {number: server_number, status: "Bigger"}})
    }
})

router.post('/restart', (_,res) => {
    genNumber()
    res.json({msg: 'The game has started.'})
})

export default router
