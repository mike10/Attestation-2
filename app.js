// подключение express
const express = require("express");
//let http = require('http');
const axios = require('axios');
const app = express();
const fetch = require('node-fetch');
const { json } = require("express/lib/response");
const postPars = express.json();

let page =0

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})
app.get("/users", async function(request, response){//список пользователей
	let page = 0
    let answ 
    try{
        answ = await axios.get(`https://dummyapi.io/data/v1/user?page=${page}limit=20`, {
        headers: {
            "app-id": '61812ad9523754cd8285f9e7'
            }
        })     
    
        response.send(answ.data)
    }catch(err){
        console.log(err);
        response.send(err)
    }
});

app.get("/posts", async function(request, response){//список постов
	let page = 0
    let answ 
    try{
        answ = await axios.get(`https://dummyapi.io/data/v1/post?page=${page}limit=20`, {
        headers: {
            "app-id": '61812ad9523754cd8285f9e7'
            }
        })     
    
        response.send(answ.data)    
    }catch(err){
        console.log(err);
        response.send(err)
    }
});

app.get("/comments", async function(request, response){//список комментариев в посте
    let answ 
    let id = request.query.id;
    try{
        answ = await axios.get(`https://dummyapi.io/data/v1/post/${id}/comment?limit=10`, {
        headers: {
            "app-id": '61812ad9523754cd8285f9e7'
            }
        })     
   
        response.send(answ.data)
    }catch(err){
        console.log(err);
        response.send(err)
    }
});

app.get("/profile/:id", async function(request, response){//Полная инфа пользователя
    let answ 
    let id = request.params.id
    try{
        answ = await axios.get(`https://dummyapi.io/data/v1/user/${id}`, {
        headers: {
            "app-id": '61812ad9523754cd8285f9e7'
            }
        })     

    response.send(answ.data)
    }catch(err){
        response.send(err)
    }
});

app.get("/profileposts", async function(request, response){
	let page = 0
    let answ
    let id = request.query.id; 
    try{
        answ = await axios.get(`https://dummyapi.io/data/v1/user/${id}/post?limit=5`, {
        headers: {
            "app-id": '61812ad9523754cd8285f9e7'
            }
        })     

    response.send(answ.data)

    }catch(err){
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
        console.log(err.message); 
        response.send(err)
    }
});

app.put("/update/:id", postPars, async function(request, response){
	let page = 0
    let answ 
    let id = request.params.id
    console.dir(request.body);
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
        console.log(err.message); 
        response.send(err)
    }
});

// начинаем прослушивать подключения на 3000 порту
app.listen(7000, "127.0.0.1", ()=>{console.log("Start Server")});
