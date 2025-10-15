import express from "express";
import cors from "cors";
impport userServices from "./user-services.js";

const app = express();
const port = 8000

app.use(cors()); //allows our backend to respond to calls from a different origin 

app.use(express.json());

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  
  userServices.getUsers(name, job)
    .then((result) => {
      if(result){ 
        res.send({ users_list: result });
      } else {
        res.status(404);
      }
    })
    .catch((error) => {
      res.status(500);
    });
});

app.get("/", (req, res) => { // root 
  res.send("Hello World!"); });

app.get("/users/:id", (req, res) => { // root users, find user by id and if not it will print out an empty list 
  const id = req.params["id"];
  
  userServices.findUserById(id) 
    .then((result) => {
       if (result === null) // if the id is not found 
          res.status(404);
       } else {
          res.send(result);
       }
    })
    .catch((error) => {
      res.status(400);
    });
});

app.post("/users", (req, res) => { //this will port the user being added to the list of users 
  const userToAdd = req.body;
  
  userServices.addUser(userToAdd)
   .then((newUser) => {
      res.status(201).send(newUser);
   })
   .catch((error) => {
      res.status(400);
   });
});

app.delete("/users/:id", (req,res) => { //will delete a user by their id
  const id = req.params["id"];
  
  userServices.removeUserById(id)
    .then((removedUser) => {
      if (removedUser) {
	res.status(204).send(); //will tell us that it was successful but nothing to return
      } else {
         res.status(404);
      }
   })
    .catch((error) => {
       res.status(500);
   });
});

app.listen(port, () => { 
  console.log(
    'Example app listening at http://localhost:${port}' ); });
