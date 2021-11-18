import express from "express";
import clear_db from "./api/clear_db.js"
import create_card from "./api/create_card.js"
import query_cards from "./api/query_cards.js"

const router = express.Router()

router.get('/', (req, res)=>{
    console.log("hi");
})

router.delete('/clear-db', clear_db)

router.post('/create-card', create_card)

router.get('/query-cards', query_cards)

export default router

