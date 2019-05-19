const express = require('express');
const path = require('path');

const app = express();
const port1 = 8080
const port2 = 8081

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath));

app.listen(port1,()=>{
    console.log(`Server is up on port ${port1}!`)
})
