
const express = require('express');
const router = express.Router();

router.use(express.json());

let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

router.get('/', (req, res) => {       // retrieve all users
   res.status(200).json(users);       // coverting json string to js object
});


router.get('/:email', (req, res) => {
  const email = req.params.email;
  const filteredUser =  users.filter((user) => user.email === email);       // based on the email provided find the user whose email matches
  
  if (!filteredUser) {
     return res.status(400).json({ message: 'Email Not Available'})
  }
  
  return res.status(200).json(filteredUser);

});

// POST request: Create a new user
router.post("/",(req,res)=>{
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports = router;


