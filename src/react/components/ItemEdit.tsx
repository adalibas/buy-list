import React, { useContext, useState } from "react";
import {Functions} from "./App"

export default function ItemEdit({id,setItemEdit}: {id:number, setItemEdit: any}){
    let [newItemName, setNewItemName] = useState("new name");
    let [cat,setCat] = useState(1);
    let {deleteItem,renameItem,changeItemCategory, categories} = useContext(Functions) as {deleteItem: any, renameItem:any,changeItemCategory:any ,categories:{id:number,name:string}[] }


    function renameitem(e:any){
        e.preventDefault();
        renameItem(id,newItemName);
        setItemEdit(false)
    }

    function deleteitem(){
        console.log(`inside buttons delete`)
        deleteItem(id)
        setItemEdit(false)
    }

    function changeCat(e:any){
        e.preventDefault();
        changeItemCategory(id,cat)
    }

    return (
        <>
        <form className="Rename-input" onSubmit={e=>renameitem(e)}>
            <input type="text" value={newItemName} onChange={e=>setNewItemName(e.target.value)}/>
            <input type="submit"/>
        </form>
        <form className="changeCategory-input" onSubmit={e=>changeCat(e)}>
            <select name="categories" id="categories" onChange={e=>setCat(Number(e.target.value))}>
                {categories.map(cat=> 
                    <option key={cat.id} value={cat.id}>{cat.name}</option>    
                )}
            </select>
            <input type="submit" />
        </form>
        <div className="delete-item">
            <button onClick={deleteitem}>Delete item</button>
        </div>
        </>
    )
}