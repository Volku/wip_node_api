


const {USERNAME,PASSWORD,DATABASE,HOST} = require("./config");
const setting ={
    host: HOST,
    database:DATABASE,
    user:USERNAME,
    password:PASSWORD
}
const np = require('node-querybuilder');
const qb = new np(setting,'mysql','pool')
const express = require('express')
const app = express();


app.get("/students", async (req,res,next) => {
    try{
        const connection = await qb.get_connection();
        const response= await connection.select('wip_id').get('wip9_passes');
        console.log("Query Ran: " + qb.last_query());
        console.log("Results:", response);
    } catch (err) {
        return console.error("Uh oh! Couldn't get results: " + err.msg);
    } finally {
        qb.disconnect();
    }
})
app.listen(3000,() =>{
    console.log ("This server on port 3000")
})