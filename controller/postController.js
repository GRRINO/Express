const Post = require('../models/postModel')
const User = require('../models/userModel')
const multer = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination:'./public/uploads',
    filename:(_req,file,cb)=>{
        cb(null,file.filename + '_'+ Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
}).single('photo')

exports.index = async (req,res)=>{
    try{
        const posts = await Post.findAll()
        res.render('posts/list',{posts})
    } catch (error){
        console.error('Error fetching posts: ',error)
        res.status(500).send('Server Error')
    }
}

exports.showCreateForm = async (_req,res) =>{
    try{
        const users = await User.findAll()
        res.render('posts/create',{users})
    } catch (error){
        console.error('Error fetching posts: ',error)
        res.status(500).send('Server Error')
    }
}

exports.create = async (req,res) => {
    upload(req,res,async(err)=>{
        if(err){
            console.error('Error uploading photo:',err);
            return res.status(500).send('Error uploading photo')
        }
        const {user_id,title,content}=req.body;
        const photo = req.file ? req.file.filename:null;
        try{
            await Post.create(user_id,title,content,photo)
            res.redirect('/posts')
        }catch (error){
            console.error('Error creating posts: ',error)
            res.status(500).send('Server Error')
        }
    })
};

exports.showEditForm = async (req,res) =>{
    try{
        const post = await Post.findById(req.params.id)
        const users = await User.findAll()
        res.render('posts/edit',{post,users})
    } catch (error){
        console.error('Error fetching posts: ',error)
        res.status(500).send('Server Error')
    }
}

exports.update = async (req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
            console.error('Error uploading photo:',err);
            return res.status(500).send('Error uploading photo')
        }
        const {title,content}=req.body;
        const photo = req.file ? req.file.filename:null;
        try{
            await Post.update(req.params.id,title,content,photo)
            res.redirect('/posts')
        }catch (error){
            console.error('Error creating posts: ',error)
            res.status(500).send('Server Error')
        }
    })
}

exports.delete = async (req,res)=>{
    try{
        await Post.delete(req.params.id);
        res.redirect('posts')
    }catch (error){
        console.error('Error deleting posts: ',error)
        res.status(500).send('Server Error')
    }
}