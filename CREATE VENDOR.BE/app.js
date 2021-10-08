const express=require('express');
const app=express();
const cors=require('cors');
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');
const dataBase="mongodb://localhost:27017/vendorlist"
const config=require("./config/index")
const StoreAdmin=require('./model/addAdmin');
const Storevendor=require('./model/vendor');
mongoose.connect(dataBase,err=>{
  if(err){
    console.log("Error!",err);
  }else{
    console.log("Connect DB");
  }
})


app.use(express.json())
app.use(cors())

// addAdmin post
app.post("/addAdmin",(req,res)=>{

  let storeData=req.body.data
  let addAdmin= new StoreAdmin(storeData)
  addAdmin.save()
      .then((data)=>{
        console.log(data);
        res.json("Data Added")
      })
      .catch((error)=>{
        res.send("Unable to store data")
      })
})
//getAdmin
app.get('/getAdmin',(req,res)=>{
  StoreAdmin.find((err,data)=>{
    if(err){
      console.log("error");
    }else{
      console.log(data);
      res.json(data)
    }
  })
})

// vendordata post
app.post("/vendordata",(req,res)=>{

  let storeData=req.body
  let vendor= new Storevendor(storeData)
  vendor.save()
      .then((data)=>{
        console.log(data);
        res.json("Data Added")
      })
      .catch((error)=>{
        res.send("Unable to store data")
      })
})
//vendorlist
app.get('/vendorlist',(req,res)=>{
    Storevendor.find((err,data)=>{
    if(err){
      console.log("error");
    }else{
      console.log(data);
      res.json(data)
    }
  })
})
//vendordelete
app.delete('/deletedata/:id',(req,res,next)=>{
    Storevendor.remove({_id:req.params.id})
        .then(()=>{
            res.status(200).json({
                message:"Delete Successfully",
            })
        }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
})

app.listen(3000,()=>{
});
