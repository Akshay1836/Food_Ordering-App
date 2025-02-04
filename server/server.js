const app=require("./app")
const DB=require("./DB/Connect")


//handling uncaught error
process.on("uncaughtException",(err)=>{
    console.log(`Error:${err.message}`);
    console.log("shutting down the server for handling uncaught exception");
});

//config

if(process.env.NODE_ENV !== 'PRODUCTION'){
    require("dotenv").config({
        path:"Config/.env",
    })
}

//connect database

DB();


//create server
const server=app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
})

//unhandled promise rejection
process.on("unhandledRejection", (error) => {
    console.log(`shutting down the server for ${error.message}`);
    console.log("shutting down the server for unhandled promise rejection");
    server.close(() => {
      process.exit(1);
  });
  });