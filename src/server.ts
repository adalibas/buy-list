import express from 'express';

let app = express();
const port = 4000;
app.listen(port,()=>{
    console.log(`app is listening on port ${port}`);
})