const express = require('express')
const app = express()
const path = require('path');
const port = 5000;
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
//mongoose
//Mongoose specific stuff
mongoose.connect('mongodb://localhost:27017/yellowChat',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

//Define mongoose Scema
const RegisterSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:Number,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  confirmpassword:{
    type:String,
    required:true
  }
});
const Register = mongoose.model("Register", RegisterSchema); 

//Express
app.use(express.urlencoded());
app.use('/img', express.static('img'));

//PUG SPECIFIC STUFF
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => { //for redirecting to the signup page
  res.render('login.pug');
});

app.post('/login', (req, res) => { // for redirecting game page
  // res.render('login2.pug');
  // res.send('information has been saved to the database');

  let data = new Register(req.body);
    const pass = req.body.password;
    const cpass = req.body.confirmpassword; 

    if(pass === cpass){

      data.save()
      .then(doc => {
        console.log(doc);
      })
      .catch(err => {
        console.error(err)
      }) 
      if(req.body.name == ""){
        res.render('login.pug');
      }
      else if(req.body.email == ""){
        res.render('login.pug');
      }
      else if(req.body.phone == ""){
        res.render('login.pug');
      }
      else if(req.body.password == ""){
        res.render('login.pug');
      }
      else if(req.body.confirmpassword == ""){
        res.render('login.pug');
      }
      else{

        res.status(200).render('login2.pug');
      }
    }
    else{
      res.send('Password are not matching');
    }
})

app.get('/login2', (req, res) => { //for redirecting to the login page
  res.render('login2.pug');
});

app.post('/login2', async(req, res) => { //for redirecting to the game page
  
  // // change
  // let data2 = new Register(req.body);
  // console.log(data2);
  // // change

  try {
    const email = req.body.email;
    const password = req.body.password;

    const useremail = await Register.findOne({email:email});
      if(useremail.password === password){
        res.render('index.pug');
    }
      else{
        res.send('Invalid Login Details');
      }

  } 
  catch (error) {
    res.status(400).send('Invalid Login Details');  
  }

});


//START THE SERVER
app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
});