const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const activityRoute = require('./routes/activityRoute')
const { sendEmailToUsers } = require('./controllers/emailController'); 
const cors = require('cors');
const bodyParser = require('body-parser')

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(cors())
app.use(bodyParser.json())
app.use("/user",activityRoute);


app.get('/',(req,res)=>{
  res.json({message:"Home Page"})
})

// Connect to MongoDB
mongoose.connect(process.env.MONGODBURL).then(()=>{
  console.log("MongoDb Connected")
}).catch((error)=>{
  console.log(error)
});


// Sending Email To All Users
sendEmailToUsers()
  .then(() => {
    console.log('Email sending process initiated successfully.');
  })
  .catch((error) => {
    console.error('Error initiating email sending process:', error);
  });

// Start the server

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
