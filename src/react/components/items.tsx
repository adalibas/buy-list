import React, {useState} from "react"
import type {item} from "./types"
import ItemEdit from "./ItemEdit"

function Item(props:{data:item}){
    let {id} = props.data
    let [itemEdit, setItemEdit] = useState(false)
    return (
        <>
        
        <div className="item" data-active={props.data.active} data-id={props.data.id} >
            <button>Active</button> 
            {props.data.name} 
            { !itemEdit 
            ?
             <button onClick={()=>setItemEdit(true)}> Edit </button> 
            :
             <ItemEdit {...{id, setItemEdit}}/>}
        </div>
        </>
    )
}

export default Item