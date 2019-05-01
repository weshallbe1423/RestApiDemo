var express=require('express');
var app=express();
var morgan=require('morgan');
var bodyParser=require('body-parser');
var ejs=require('ejs');

var mongoose=require('mongoose');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/cartdb')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');
const usersRoute=require('./api/routes/users');
app.set('view engine', 'ejs');


app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use((req,res,next)=>{

    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Origin','Origin,X-Requested-With,Content-Type,Authorizatopn');
    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Origin','PUT,POST,GET,PATCH,DELETE');
        return res.status(200).json({});
    }
    next();
});


app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/users',usersRoute);

app.use((req,res,next)=>{
 const error=new Error('Not Found!!')
  error.status=404;
  next(error);  
    
})
app.use((error,req,res,next)=>{
res.status(error.status||500);
res.json({
    error:{
        message:error.message
    }
})
})

module.exports=app;


