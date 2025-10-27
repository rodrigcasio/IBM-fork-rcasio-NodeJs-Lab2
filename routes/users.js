
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

router.put('/:email', (req, res) => {     // updating info from existing user   (can update email aswell if neccessary)
  const email = req.params.email;
  const filteredUsers = users.filter((user) => user.email === email);    // new array with only the user with the matched email

  if (filteredUsers.length > 0) {
    let filtered_user = filteredUsers[0];     // selecting the first matching user and upadate attributes if provided

    // update DOB  or any other info:
    let newDOB = req.query.DOB;
    if (newDOB) {
      filtered_user.DOB = newDOB;
    }

    let newFirstName = req.query.firstName;
    if (newFirstName) {
      filtered_user.firstName = newFirstName;
    }
    
    let newLastName = req.query.lastName;
    if (newLastName) {
      filtered_user.lastName = newLastName;
    }

    let newEmail = req.query.email;
    if (newEmail) {
      filtered_user.email = newEmail;
    }

    // replacing the old user with the updated user  
    // (modifying the 'users' db with a new array with all the users that dont match the :email, 
    // like deleting the user with the matching ':email' and then adding it again with updated info in: (users.push(filtered_user) )
    
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);
    
    res.status(200).json({ message: `User with the email '${filtered_user.email}' successfully updated.` });
  } else {
      res.status(400).json({ message: `Unable to find user  with email '${email}'. Please try again.` });
  }
});

// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports = router;



/*
  (FIRST APROACHES FOR PRACTICE)

1. 
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
  ----------

  2. update anything from an existing user: curl --request PUT 'localhost:5000/user/johnsmith@gamil.com?DOB=9/7/1999&firstName=Johnnathan'
    (rcasio approach)
    (WORKS well)

router.put('/:email', (req, res) => {     // updating users DOB
  const email = req.params.email;
  const userToUpdate = users.find(user => user.email === email);

  if (!userToUpdate) {
    return res.status(400).json({ message: 'Invalid email, not available within our database' });
  }

  let newfirstName = req.query.firstName;
  let newLastName = req.query.lastName;
  let newEmail = req.query.email;
  let newDOB = req.query.DOB;

  if (newfirstName || newLastName || newEmail || newDOB) {
    userToUpdate.firstName = newfirstName;
    userToUpdate.lastName = newLastName;
    userToUpdate.email = newEmail;
    userToUpdate.DOB = newDOB;

    return res.status(200).json({
      message: `Updated info of user named: '${userToUpdate.firstName}'`,
      lastname: `${userToUpdate.lastName}`,
      email: `${userToUpdate.email}`,
      DOB: `${userToUpdate.DOB}`
    });

  } else {

    res.status(400).json({ message: `New info not provided within the request`});
  }
});
*/
