const express=require('express'),
      port=8080;

var app=express();
app.use(express.static('./'));
app.listen(port,()=>{
    console.log('server is starting on port '+port);
})