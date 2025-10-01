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


app.use(express.json());

app.get("/", (req, res) => { // root 
  res.send("Hello World!"); });

app.get("/users", (req, res) => { // root users, find user by name and if not it will print out an empty list 
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  }else{
   res.send(users);}  });

app.listen(port, () => { 
  console.log(
    'Example app listening at http://localhost:${port}' ); });
