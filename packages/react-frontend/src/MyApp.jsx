import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
   const [characters, setCharacters] = useState([]);

  function removeOneCharacter(id){
    removerUserUsingId(id) //calls function and waits until successful
	.then(() => {
	    const updated = characters.filter((character) => { //updates the local state
     	         return character.id !== id; });
            setCharacters(updated);
  });
}
  
  function updateList(person){ // will update the list only if our POST call is successful 
     postUser(person) 
        .then((UserWithId) =>{ //UserWithId will have the object from back 
	     setCharacters([...characters, UserWithId]);} )
	.catch((error) => {
	  console.log(error); });
} 
  
  function removerUserUsingId(id) {
      const url = `http://localhost:8000/users/${id}`; // a template literal for the url with id
      return fetch(url, {
	  method: "DELETE", //the http method we are going to use 
      })
      .then(response => {
	  if(response.status === 204){
	     return response; // will return response object if successful
      }
	  if(response.status === 404){ // will check for any error status 
		throw new Error("User not found");
      }
});
}

  function fetchUsers(){ //this will make the GET request from the backend  
	const promise = fetch("http://localhost:8000/users");
	return promise; }

  useEffect(() => { //this will call the fetchUsers and then when fulfilled set the the component stat using setcharacters
    fetchUsers()
	    .then((res) => res.json()) //expects response to be json format and then after parse it into a js object and occurs asynchronously
	    .then((json) => setCharacters(json["users_list"])) //initializes the state of the component
	    .catch((error) => { console.log(error); });
 }, []); //only called when the Myapp component passes an empty array as the second arg to useEffect
  
  function postUser(person) { // this will return the promise with the full json object that contains the Id as well 
     return fetch("http://localhost:8000/users", {
      method: "POST", //makes it a POST instead of the default GET 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person), //converts the in memory object to a string 
    })
    .then(response => {
	if(response.status === 201){
	   return response.json(); }
	else{
	    throw new Error("failed"); } }); 	
  }

  return(
    <div className="container">
        <Table
	   characterData={characters}
	   removeCharacter={removeOneCharacter}
	 />
        <Form handleSubmit={updateList}  />
    </div>
  );
}

export default MyApp;
