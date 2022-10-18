import express, { json } from 'express';
import {readFile} from 'fs'
import * as db from "./db"

let app = express();
const port = 4000;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})

app.use(express.static(`${__dirname}/../../public`));
app.use(express.json())

app.post("/cat", (req,res)=>{
    let {command} = req.body;
    if (command == 'new-item'){
        let {parentCatId, name} = req.body;
        db.createItem(name,parentCatId);
        res.send("success");

    } else if (command == "delete-item"){
        let {itemId} = req.body;
        db.deleteItem(itemId);
        res.send("incoming")
    } else if (command == "rename-item") {
        let {itemId, newName} = req.body;
        db.renameItem(itemId,newName);
        res.send("success")
    } else if (command == "new-category"){
        let {parentId,name} = req.body;
        db.createCategory(name,parentId);
        res.send(`incoming`)
    } else if (command == "rename-category"){
        let {id,newName} = req.body;
        db.renameCategory(id,newName);
        res.send(`success`)
    } else if (command == "change-item-category"){
        let {itemId,catId} = req.body;
        console.log(`make item ${itemId} belong to cat ${catId}`);
        db.changeItemCategory(itemId,catId);
        res.send(`success`);
    }
})

app.get("/cat", (req,res)=>{
    res.send(db.dbTree())
})