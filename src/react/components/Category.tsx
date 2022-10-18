import type {category,item} from "./types"
import Item from "./items"
import CategoryEdit from "./CategoryEdit"
import React, { useState } from "react"

function Category({data: cat}: {data: category}){
    let {elements: elems, children, name, id} = cat
    let [edit,setEdit] = useState(false)
    
    let elarr;
    if (elems) {
        elarr = elems.map(elem=>{
            return (
                <Item data={elem} key={elem.id}/>
            )
        })
    }


   return (
    <div>
        
        <div >
            <h1>{name} { !edit? <button onClick={()=>setEdit(true)}> Edit </button> : <CategoryEdit data={{id, setEdit}}/>}</h1> 
            
        </div>
        
        
        {elarr}
        {children.map(cat => { return (
            <Category data={cat} key={cat.id} />
        )})
        }
    </div>
   )
}

export default Category