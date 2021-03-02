const express = require("express")
const cors = require("cors");

const port = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",async (req,res) =>{
    try{
        res.status(200).send({
            "message": "NodeJS Api is up and running"
        })
    }
    catch(err){
        res.status(400).send({
            "message" : err
        })
    }

})

app.listen(port, () => {
    console.log("NodeJS Api is listening to port :", port);
});