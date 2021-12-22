// подключение express
const express = require("express");
//let http = require('http');
const axios = require('axios');
const app = express();
const postPars = express.json();
//import { User } from "./addition/User.js"
//const User = require('./addition/User') 

const User = {//Список пользователей
    page: 0,
    total: 0,
    limit: 20,
}
const Post = {//Список постов
    page: 0,
    total: 0,
    limit: 20,
}
const PostProfile = {//Посты в профиле
    page: 0,
    total: 0,
    limit: 5,
}
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
    next()
})
app.get("/users", async function(request, response){//список пользователей
    let limit = User.limit
    let total = User.total
    let page = request.query.page;
    
    let answ 
    try{
        answ = await axios.get(`https://dummyapi.io/data/v1/user?page=${page}&limit=20`, {
        headers: {
            "app-id": '61812ad9523754cd8285f9e7'
            }
        })
        User.page = answ.data.page + 1
        User.limit = answ.data.limit
        User.total = answ.data.total
        if(total < page*limit ){
            let data = answ.data
            data.isFull = true    
            response.send({data: data, page: User.page})
        }else{
           response.send({data: answ.data.data, page: User.page}) 
        }
    }catch(err){
        response.send(err)
    }
});

app.get("/posts", async function(request, response){//список постов
	let limit = Post.limit
    let total = Post.total
    let page = request.query.page;

    let answ 
    try{
        answ = await axios.get(`https://dummyapi.io/data/v1/post?page=${page}&limit=20`, {
        headers: {
            "app-id": '61812ad9523754cd8285f9e7'
            }
        })     
        Post.page = answ.data.page + 1
        Post.limit = answ.data.limit
        Post.total = answ.data.total
        if(total < page*limit ){
            let data = answ.data
            data.isFull = true    
            response.send({data: data, page: Post.page})
           
        }else{
           response.send({data: answ.data.data, page: Post.page}) 
        } 
    }catch(err){
        response.send(err)
    }
});

app.get("/comments", async function(request, response){//список комментариев к посту
    try{
        let id = request.query.id;
        let page = request.query.page;
        console.log(id, page);
        let answ = await axios.get(`https://dummyapi.io/data/v1/post/${id}/comment?page=${page}&limit=5`, {
        headers: {
            "app-id": '61812ad9523754cd8285f9e7'
            }
        })
        console.log(answ.data);
        page =  parseInt(page) + 1
        let limit = 5
        let total = answ.data.total
        if(total - (page*limit) > 0){
            response.send({data: answ.data, page: page, isFull: false}) 
        }else{
            response.send({data: answ.data, page: page, isFull: true})
        } 
        //response.send(answ.data)
    }catch(err){
        response.send(err)
    }
});


app.route("/profile/:id")
    .get(async function(request, response, next){//Полная инфа пользователя
        let answ 
        let id = request.params.id
        try{
            answ = await axios.get(`https://dummyapi.io/data/v1/user/${id}`, {
            headers: {
                "app-id": '61812ad9523754cd8285f9e7'
                }
            })
            app.set("prof", answ.data)         
            next()    
        }catch(err){
            response.send(err)
        }
    })
    .get(async function(request, response){
        let answ
        let id = request.params.id;
        //let page = request.query.page;
        console.log("id ="+id);
        try{
            answ = await axios.get(`https://dummyapi.io/data/v1/user/${id}/post?page=0&limit=5`, {
            headers: {
                "app-id": '61812ad9523754cd8285f9e7'
                }
            })
            if(answ.data.total < 5){
                //console.log("/profile/:id true");
                //console.log({profile: app.get("prof"), posts: {data: answ.data, page: 1, isFull: true}});
                response.send({profile: app.get("prof"), posts: {data: answ.data, page: 1, isFull: true}})  
            } else {
                console.log("/profile/:id false");
                //console.log({profile: app.get("prof"), posts: {data: answ.data, page: 1, isFull: false}});
                response.send({profile: app.get("prof"), posts: {data: answ.data, page: 1, isFull: false}})
            }
        }catch(err){
            response.send(err)
        }
    });
    
app.get("/profile/:id/posts", async function(request, response){//Добавление постов в профиль
    try{
        let id = request.params.id;
        let page = request.query.page;
        let answ = await axios.get(`https://dummyapi.io/data/v1/user/${id}/post?page=${page}&limit=5`, {
        headers: {
            "app-id": '61812ad9523754cd8285f9e7'
            }
        })
        
        page =  parseInt(page) + 1
        console.log(page);
        let limit = 5
        let total = answ.data.total
        
        
        if(total - (page*limit) > 0){
            response.send({data: answ.data, page: page, isFull: false}) 
        }else{
            response.send({data: answ.data, page: page, isFull: true})
        }   
           
    
    }catch(err){
        console.log(err.data);
        response.send(err)
    }
});
app.post("/create", postPars, async function(request, response){
	let answ 
    if(!request.body) return response.sendStatus(400);
   
    try{
       
        answ = await axios.post(`https://dummyapi.io/data/v1/user/create`, 
        request.body, 
        {
        headers: {
            "Content-type": "application/json",
            "app-id": '61812ad9523754cd8285f9e7'
            },
          
        })
        
        response.send(answ.data)
    }catch(err){
        response.send(err)
    }
});

app.put("/update/:id", postPars, async function(request, response){
	let page = 0
    let answ 
    let id = request.params.id
    if(!request.body) return response.sendStatus(400);
    try{
        answ = await axios.put(`https://dummyapi.io/data/v1/user/${id}`,
        request.body,
        {
            headers: {
                "Content-type": "application/json",
                "app-id": '61812ad9523754cd8285f9e7'
                }     
        })     

        response.send(answ.data)
    }catch(err){
        response.send(err)
    }
});

// начинаем прослушивать подключения на 3000 порту
app.listen(7000, "127.0.0.1", ()=>{console.log("Start Server")});
