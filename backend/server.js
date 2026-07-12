require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Blog = require("./models/Blog");
const User = require("./models/User");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ================= MONGODB =================

mongoose.connect(process.env.MONGO_URI)

.then(function(){

    console.log("✅ MongoDB Connected");

})

.catch(function(err){

    console.log(err);

});

// ================= HOME =================

app.get("/", function(req,res){

    res.json({

        message:"Blogify Backend Running"

    });

});

// ================= GET ALL BLOGS =================

app.get("/blogs", async function(req,res){

    const blogs = await Blog.find();

    res.json(blogs);

});

// ================= GET BLOG BY ID =================

app.get("/blogs/:id", async function(req,res){

    const blog = await Blog.findById(req.params.id);

    if(blog){

        res.json(blog);

    }

    else{

        res.status(404).json({

            message:"Blog Not Found"

        });

    }

});

// ================= ADD BLOG =================

app.post("/blogs", async function(req,res){

    const blog = new Blog({

        title:req.body.title,

        category:req.body.category,

        author:req.body.author,

        date:req.body.date,

        content:req.body.content,

        image:req.body.image

    });

    await blog.save();

    res.json({

        message:"Blog Added Successfully",

        blog

    });

});



// ================= UPDATE BLOG =================

app.put("/blogs/:id", async function(req,res){

    const blog = await Blog.findById(req.params.id);

    if(!blog){

        return res.status(404).json({

            message:"Blog Not Found"

        });

    }

    blog.title = req.body.title;
    blog.category = req.body.category;
    blog.author = req.body.author;
    blog.date = req.body.date;
    blog.content = req.body.content;
    blog.image = req.body.image;

    await blog.save();

    res.json({

        message:"Blog Updated Successfully",

        blog

    });

});

// ================= DELETE BLOG =================

app.delete("/blogs/:id", async function(req,res){

    const blog = await Blog.findById(req.params.id);

    if(!blog){

        return res.status(404).json({

            message:"Blog Not Found"

        });

    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({

        message:"Blog Deleted Successfully"

    });

});

// ================= SIGNUP =================

app.post("/signup", async function(req,res){

    const {name,email,password} = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser){

        return res.status(400).json({

            message:"User Already Exists"

        });

    }

    const user = new User({

        name,
        email,
        password

    });

    await user.save();

    res.json({

        message:"Signup Successful"

    });

});

// ================= LOGIN =================

app.post("/login", async function(req,res){

    const {email,password} = req.body;

    const user = await User.findOne({

        email,
        password

    });

    if(!user){

        return res.status(401).json({

            message:"Invalid Email or Password"

        });

    }

    res.json({

        message:"Login Successful"

    });

});

// ================= START SERVER =================

app.listen(PORT,function(){

    console.log(`🚀 Server Running On Port ${PORT}`);

});