import React, { createContext, useState } from "react";
import Category from "./Category";
import type { category } from "./types";


export const Functions = createContext();

function listCategories(cat: category): {id:number, name:string}[]{
    if (cat.children.length == 0) {
        return [{id: cat.id, name: cat.name}]
    } else {
        return [{id:cat.id, name:cat.name}, ...cat.children.map(child=>listCategories(child)).flat()]
    }
}

function App({data}: {data: category}){
    let [category, setCategory] = useState(data);

    let categories = listCategories(category)
    
    async function newItem(parentCatId: number,name: string):Promise<void>{
        let command = "new-item";
        let mes = {command, parentCatId, name};
        console.log("inside new item")
        await fetch(`/cat`,{method:`POST`, body:JSON.stringify(mes), headers:{'Content-Type': "application/json"}})

        let res = await fetch("/cat");
        let data = await res.json();

        setCategory(data);
    }

    async function deleteItem(itemId:number){
        let command = "delete-item";
        let mes = {command, itemId};
        console.log(`inside apps delete item`)
        await fetch(`/cat`,{method:`POST`, body:JSON.stringify(mes), headers:{'Content-Type': "application/json"}})
    
        let data = await fetch("/cat").then(res=> res.json());
        setCategory(data)
    }

    async function renameItem(itemId:number, newName: string){
        let command = "rename-item";
        let mes = {command, itemId, newName}
        await fetch(`/cat`,{method:`POST`, body:JSON.stringify(mes), headers:{'Content-Type': "application/json"}})
        
        let data = await fetch("/cat").then(res=> res.json());
        setCategory(data)
    }

    async function changeItemCategory(itemId:number, catId: number){
        let command = "change-item-category";
        let mes = {command, itemId, catId}
        await fetch(`/cat`,{method:`POST`, body:JSON.stringify(mes), headers:{'Content-Type': "application/json"}})
        
        let data = await fetch("/cat").then(res=> res.json());
        setCategory(data)
    }

    async function newCategory(parentId: number, name: string){
        let command = "new-category";
        let mes = { command, parentId, name}
        await fetch(`/cat`,{method:`POST`, body:JSON.stringify(mes), headers:{'Content-Type': "application/json"}})

        let data = await fetch("/cat").then(res=> res.json());
        setCategory(data);
    }

    async function renameCategory(id: number, newName: string){
        let command = "rename-category";
        let mes = { command, id, newName}
        await fetch(`/cat`,{method:`POST`, body:JSON.stringify(mes), headers:{'Content-Type': "application/json"}})

        let data = await fetch("/cat").then(res=> res.json());
        setCategory(data);
    }

    return (
        <Functions.Provider value={{newItem, renameItem, deleteItem,newCategory,renameCategory, changeItemCategory, categories}}>
        <div className="App">
            <Category data={category} key={category.id}/>
        </div>
        </Functions.Provider>
    )
 
    
}

export default App