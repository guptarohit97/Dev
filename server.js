const express=require('express')
const app=express();

const {readDb,writeDb}=require('./dbFunctions')
const port=3737;

app.use(express.json())



app.get('/:friend', (req,res)=>{
    const {friend}=req.params
    const {limit}=req.query
    console.log(limit)
    res.status(200).send({message: readDb().friends.filter(frnd=>{
        return frnd.includes(friend)
    }).splice(0,limit)})
})
app.get('/', (req,res)=>{
    res.status(200).send({friends:readDb().friends})
})
app.post('/', (req,res)=>{
    const {newFriend}=req.body
    if(!newFriend)
        return res.status(400).send({message: 'Please include name'})
    try{
        const currFrnds=readDb().friends
        writeDb({friends:[...currFrnds,newFriend]})
    }
    catch(err){
        writeDb({friends:[newFriend]})
    }
    res.status(200).send({ message : `Where is your address ${newFriend}`})
    
})
// app.put('/', (req,res)=>{
    
// })
app.delete('/', (req,res)=>{
    const {enemy}= req.body
    try{ 
        const currFriends=readDb().friends
        writeDb({
            friends:currFriends.filter(friend=>{
                return !friend.includes(enemy)
            })
        })
        res.status(200).send({friendsList:readDb().friends})

    }catch (err){
        return res.status(200).send({message:'You have no such friend'})
    }
    
})
app.listen(port,()=>console.log(`Listenin to port: ${port}`))

