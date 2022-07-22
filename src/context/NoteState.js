import { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props) => {
    const host = "http://localhost:7400"
    const noteInitial = []
    const token = localStorage.getItem("access_token")
    const [notes, setNotes] = useState(noteInitial);


    const getNotes = async () => {
        // API Call 
        const response = await fetch(`${host}/api/notes/getall`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "x-access-token": token,

          }
        });
        const json = await response.json() 
        setNotes(json)
      }
    
        // Add a Note
  const addNote = async (title, description, tags) => {
    // console.log(title, description, tag)
    // API Call 
    

    let body = JSON.stringify(
        {   title: title,
            description: description,
            tags: tags}
    );

    const response = await fetch(`${host}/api/notes/create`, {
      method: 'POST',
      headers: {
        "Accept": "*/*",
        'Content-Type': 'application/json',
        "x-access-token": token
      },
      body: body
    });
    const note = await response.json();
    console.log(note)
    setNotes([...notes, note])
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": token 
      }
    });
    // const json = response.json(); 
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

    // Update a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const contentBody = JSON.stringify({title, description, tag})
    console.log(contentBody)
    console.log("id",id)
    const response = await fetch(`${host}/api/notes/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": token
      },
      body: contentBody
    });
    const json = await response.json(); 
    console.log(json)
    const newNotes = [...notes]
   for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === id) {
        newNotes[i] = json
      }
    }
    setNotes(newNotes);
  }

  return (
  <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
    {props.children}
    </NoteContext.Provider>
)

}
export default NoteState;