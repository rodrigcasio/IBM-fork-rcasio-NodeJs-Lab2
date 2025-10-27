
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


router.get('/:email', (req, res) => {      // filtered the users array to find whose email matches the extracted email parameter `:email`
  const email = req.params.email;
  const filteredUser =  users.filter((user) => user.email === email);
  
  if (!filteredUser) {
     return res.status(400).json({ message: 'Email Not Available'})
  }
  
  return res.status(200).json(filteredUser);

});

router.post('/', (req, res) => {      // based on the query parameters from the request, we push that new user into the 'users' db

  users.push({
    "firstName": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.emial,
    "DOB": req.query.DOB
  });


  res.status(200).json({ message: `The user ${req.query.firstName} has been added successfully`}); 
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



/*
  (FIRST APROACHES FOR PRACTICE)


// POST request: Create a new user (first approach [not verified to be correct])
router.post('/', (req, res) => {
  const newUser = req.body;
  
  if (!newUser) {
    return res.status(400).json({ message: 'Needed content for the request' });
  }

  users.push(newUser);
  return res.status(200).json({ 
    message: `New user named: '${newUser.firstName}' added successfully`,
    email: newUser.email,
  } );
});
*/
