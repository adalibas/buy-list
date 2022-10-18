import React from "react";
import ReactDOM from "react-dom/client"
import App from "./components/App"
import type {category} from "./components/types"

fetch("/cat").then(res=>res.json()).then(res => {
    let root = ReactDOM.createRoot(document.getElementById("root")!)
    root.render(<App data={res} />)
})

