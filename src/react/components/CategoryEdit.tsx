import e from "express";
import React, { useContext, useState } from "react";
import {Functions} from "./App"

function CategoryEdit({data: {id,setEdit}}:{data: {id: number, setEdit: any }}){
    let {newItem,newCategory,renameCategory} = useContext(Functions) as {newItem: any, newCategory:any, renameCategory:any}
    let [newCatName,setNewCatName] = useState("Add new child category name");
    let [newName, setNewName] = useState("new name")
    let [newItemName,setNewItemName] = useState("new item name")

    function renameCat(e: any){
        e.preventDefault();
        renameCategory(id,newName)
        setEdit(false);
    }

    function addItem(e:any){
        e.preventDefault()
        console.log(`cat with id ${id} add item ${newItemName}`);
        newItem(id,newItemName)
        setEdit(false);
    }

    function addSubCat(e:any){
        e.preventDefault()
        newCategory(id,newCatName);
        setEdit(false);
    }

    function deleteCat(){
        console.log(`delete cat with ${id}`);
        setEdit(false);
    }

    return (
    <>
        <form className="Rename -input" onSubmit={e=>renameCat(e)}>
            <input type="text" value={newName} onChange={e=>setNewName(e.target.value)}/>
            <input type="submit"/>
        </form>

        <form className="Add-item-input" onSubmit={e=>addItem(e)}>
            <input type="text" value={newItemName} onChange={e=>setNewItemName(e.target.value)}/>
            <input type="submit" />
        </form>

        <form className="Add-sub-input" onSubmit={e=>addSubCat(e)}>
            <input type="text" value={newCatName} onChange={e=>setNewCatName(e.target.value)} />
            <input type="submit" />

        </form>
        <div className="delete-category">
            <button onClick={deleteCat}>Delete cateogy</button>
        </div>
    </>
    )
}

export default CategoryEdit