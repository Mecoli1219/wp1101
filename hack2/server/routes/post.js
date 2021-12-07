import express from 'express'
import Post from '../models/post'
import moment from 'moment'

const router = express.Router()

// TODO 2-(1): create the 1st API (/api/allPosts)
const getAllPost = async(req, res) => {
    const posts = await Post.find().sort({timestamp: -1})
    if (posts.length !== 0){
        res.status(200).send({
            "message": "success",
            "data": posts
        })
    }else{
        res.status(403).send({
            "message": "error",
            "data": null
        })
    }
}
router.get("/allPosts", getAllPost)

// TODO 3-(1): create the 2nd API (/api/postDetail)
const getPostDetail = async(req, res) => {
    const {pid} = req.query
    const post = await Post.findOne({postId: pid})
    if (post){
        res.status(200).send({
            "message": "success",
            "post": post
        })
    }else{
        res.status(403).send({
            "message": "error",
            "post": null
        })
    }
}
router.get("/postDetail", getPostDetail)

// TODO 4-(1): create the 3rd API (/api/newPost)
const postNewPost = async(req, res) => {
    const {postId, title, content, timestamp} = req.body
    const post = await new Post({postId, title, content, timestamp})
    try{
        await post.save()
        res.status(200).send({
            "message": "success",
        })
    }catch{
        res.status(403).send({
            "message": "error",
        })
    }
}
router.post("/newPost", postNewPost)

// TODO 5-(1): create the 4th API (/api/post)
const deletePost = async(req, res) => {
    const {pid} = req.query
    try {
        await Post.deleteOne({postId: pid})
        res.status(200).send({
            "message": "success"
        })
    }catch{
        res.status(403).send({
            "message": "error",
        })
    }
}
router.delete("/post", deletePost)

export default router