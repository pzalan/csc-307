import express from "express";

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

const findUserByName = (name) => { //this will let us getting a user by their name and use the query argument in the root users to get it 
  return users["users_list"].filter(
    (user) => user["name"] === name );};

const findUserById = (id) => //will let find a user by id num 
  users["users_list"].find((user) => user["id"] === id);


app.use(express.json());

app.get("/", (req, res) => { // root 
  res.send("Hello World!"); });

app.get("/users/:id", (req, res) => { // root users, find user by id and if not it will print out an empty list 
  const id = req.params["id"];
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Rsource not found.");
  }else{
   res.send(result);}  });

app.listen(port, () => { 
  console.log(
    'Example app listening at http://localhost:${port}' ); });
