import express from "express";
const app= express();
const PORT=8080;
app.use(express.json())
app.use(express.urlencoded({extended:true}))
import cors from "cors";
import apirouter from "./routing.js"
app.use(cors())

app.use("/api", apirouter);

//Error handling function.
app.use((err, req, res, next)=>{
   res.status(500).send(err);
})
app.listen(PORT, (err)=>{
  console.log("server started on port> "+PORT);
})