

const express = require('express');
const {sequelize, User, Post} = require('./models');


const app = express();

app.use(express.json());


// ------------------------------------------------------------------------------------------------
app.get ('/', (req, res, next) => {
    res.json({message: "Welcome to Tutorial Application !"})
  });
  

// ------------------------------------------------------------------------------------------------
app.post('/users', async (req,res)=> {
    const { name, email, role } = req.body;

    try {
        const user = await User.create( { name, email, role})
        // return res.json({...user});
        // return res.json({user});
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err)
    }
})

//  ----------------------------------------------------------------------------------------------

app.get('/users', async (req,res)=> {

    try {
        const users = await User.findAll();
        return res.json(users);
    } catch (err) {
        return res.status(400).json(err);
    }
    
})

// ------------------------------------------------------------------------------------------------

// app.get('/users/:uuid', async (req,res)=> {

//     const uuid = req.params.uuid
//     try {
//         const user = await User.findOne( {
//             where: {uuid }
//         });
//         return res.json(user);
//     } catch (err) {
//         return res.status(400).json(err);
//     }
    
// })

// ---------

app.get('/users/:uuid', async (req,res)=> {
    const uuid= req.params.uuid

    try {
        const user = await User.findOne({ 
            where: {uuid},
            include: 'posts'  // using alias defined in user.js
          })  
        return res.json(user);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);   
    }
    
})


// ------------------------------------------------------------------------------------------------

app.get('/users/:uuid', async (req,res)=> {

    const uuid = req.params.uuid
    try {
        const user = await User.findOne( {
            where: {uuid }
        });
        return res.json(user);
    } catch (err) {
        return res.status(400).json(err);
    }
    
})

// ------------------------------------------------------------------------------------------------

app.post('/posts', async (req,res)=> {

    const { userUuid, content} = req.body
    try {
        const user = await User.findOne({ where: {uuid: userUuid}})
        const post = await Post.create({content, ownerId:user.id})
        return res.json(post);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);
        
    }
    
})

// Find all the posts
// ------------------------------------------------------------------------------------------------

// app.get('/posts', async (req,res)=> {

//     try {
//         const posts = await Post.findAll()
//         return res.json(posts);
//     } catch (err) {
//         console.log(err)
//         return res.status(400).json(err);
        
//     }
    
// })

// Find the user of the many post
// ------------------------------------------------------------------------------------------------


// app.get('/posts', async (req,res)=> {

//     try {
//         const posts = await Post.findAll({ include: [User]})
//         return res.json(posts);
//     } catch (err) {
//         console.log(err)
//         return res.status(400).json(err);
        
//     }
    
// })

// --------------

app.get('/posts', async (req,res)=> {

    try {
        const posts = await Post.findAll({ include: 'user'})  // using alias defined in posts.js
        return res.json(posts);
    } catch (err) {
        console.log(err)
        return res.status(400).json(err);   
    }
    
})

// --------------------------------------------------------------------------------------------


app.delete('/users/:uuid', async (req,res)=> {

    const uuid = req.params.uuid
    try {
        const user = await User.findOne( { where: {uuid} })
        await user.destroy()
        return res.json({message: `User ${uuid} deleted !`});
    } catch (err) {
        return res.status(400).json(err);
    }
    
})


// ------------------------------------------------------------------------------------------------

app.put('/users/:uuid', async (req,res)=> {

    const uuid = req.params.uuid
    const { name, email, role} = req.body
    try {
        const user = await User.findOne( { where: {uuid} })

        user.name = name;
        user.email = email;
        user.role = role;

        await user.save()



        return res.json(user);
    } catch (err) {
        return res.status(400).json(err);
    }
    
})


// ------------------------------------------------------------------------------------------------



app.listen({port: 5000}, async() => {
    console.log('Serve runnning on http://localhost:5000');
    // await sequelize.sync( {force:true});
    // await sequelize.sync( {});
    await sequelize.authenticate();
    console.log(" Database Connected !")
})


// async function main () {
//     // await sequelize.sync();
//     await sequelize.sync( {force:true});
// }
// main();