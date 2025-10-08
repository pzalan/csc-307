import express from "express";
import cors from "cors";

const app = express();
const port = 8000

const users = {
  users_list: [
    {
	id: "xyz789",
	name:"Charlie",
	job: "Janitor" },
    {
	id: "abc123", 
	name: "Mac",
	job: "Bouncer" },
    {
	id: "ppp222",
	name: "Mac",
	job: "Professor" },
    {
	id: "yat999",
	name: "Dee",
	job: "Aspring actress" },
    {
	id: "zap555",
	name: "Dennis",
	job: "Bartender" }
  ]

};

const findUserByNameAndJob = (name,job) => { //this will let us getting a user by their name and job by use the query argument in the root users to get it 
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] == job );};

const findUserById = (id) => //will let find a user by id num 
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => { //this will add a user 
  users["users_list"].push(user);
  return user; };

const removeUserbyId = (id) =>{ //will remove a user by id 
  const index = users["users_list"].findIndex( user => user["id"] === id);
    if(index != -1){ //it element passes test then it won't be a negative num
 	users["users_list"].splice(index, 1); //then it will remove user with splice 
	return true; }
    return false;}; // else if its a negative number then it will return false 

const generateRandomId = () => { // this will generate a random id for the user, using toSting to convert num to string and substring to get rid of decimal 
   return Math.random().toString(36).substring(2,8);
};

app.use(cors()); //allows our backend to respond to calls from a different origin 

app.use(express.json());

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name != undefined && job != undefined) {
    let result = findUserByNameAndJob(name,job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  } });

app.get("/", (req, res) => { // root 
  res.send("Hello World!"); });

app.get("/users/:id", (req, res) => { // root users, find user by id and if not it will print out an empty list 
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  }else{
   res.send(result);}  });

app.post("/users", (req, res) => { //this will port the user being added to the list of users 
  const userToAdd = req.body;
  userToAdd.id = generateRandomId(); //generates an Id and puts it into the object that is missing it 
  addUser(userToAdd);
  res.status(201).send(userToAdd); });//will update the state in the frontend if status 201 comes up 

app.delete("/users/:id", (req,res) => { //will delete a user by their id
  const id = req.params["id"];
  const wasRemoved = removeUserbyId(id);

  if(wasRemoved){
    res.status(204).send();
  } else{
    res.status(404).send("User not found."); }
});

app.listen(port, () => { 
  console.log(
    'Example app listening at http://localhost:${port}' ); });
