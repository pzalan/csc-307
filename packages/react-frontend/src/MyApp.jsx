import React, { useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
   const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index){
    const updated = characters.filter((character, i) => {
      return i !== index; });
    setCharacters(updated);
  }
  
  function updateList(person){ // will update the lsit 
    setCharacters([...characters, person]); } 

  function fetchUsers(){ //this will make the GET request from the backend  
	const promise = fetch("http://localhost:8000/users");
	return promise; }

  useEffect(() => { //this will call the fetchUsers and then when fulfilled set the the component stat using setcharacters
    fetchUsers()
	    .then((res) => res.json()) //expects response to be json format and then after parse it into a js object and occurs asynchronously
	    .then((json) => setCharacters(json["users_list"])) //initializes the state of the component
	    .catch((error) => { console.log(error); });
 }, []); //only called when the Myapp component passes an empty array as the second arg to useEffect

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
