import React, { useContext, useEffect, useState, useRef } from 'react'
import DarkModeContext from '../context/darkModeContext'
import NoteContext from '../context/NoteContext'
import AddNote from './AddNote'
import Note from './Note'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom'


export default function Home() {

  const { darkMode } = useContext(DarkModeContext)
  const { notes, getNotes, editNote,deleteNote } = useContext(NoteContext)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const [color, setColor] = useState({
    "background": "bg-light",
    "text": "text-dark"
  })

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      getNotes()
    }
    else{
      navigate('/login')
    }

    // eslint-disable-next-line 
  }, [])

  useEffect(() => {
    setColor({
      "background": darkMode ? "bg-dark" : "bg-light",
      "text": darkMode ? "text-light" : "text-dark"
    })
  }, [darkMode])
  const ref = useRef(null);
  const noteInitial = {
    _id: "",
    title: "",
    description: "",
    userId: "",
    tags: [
    ],
    date: "",
    __v: 0
  }

  const [activeNote, setActiveNote] = useState(noteInitial)

  const handleUpdateNote = () => {
    editNote(activeNote._id, activeNote.title, activeNote.description, activeNote.tags)

  }


  const handleUpdateInputTag = (e) => {
    let words = e.target.value.split(" ")
    const length = words.length
    if (length > 1) {
      if (words[length - 1] === "") {
        words[length - 2] = "#" + words[length - 2]
      }
    }
    setActiveNote({
      ...activeNote,
      tags: words
    })
  }

  const handleUpdateInputBody = (e) => {
    setActiveNote({
      ...activeNote,
      description: e.target.value
    })
  }


  const handleUpdateInputTitle = (e) => {
    setActiveNote({
      ...activeNote,
      title: e.target.value
    })

  }
  const handleDeleteNote = () =>{
deleteNote(activeNote._id)
  }


  return (
    <>

      <button type="button" ref={ref} className="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch
      </button>
      {updateNote()}
      <div className="container">

        <div className="row-1 mt-4 align-content-center">
          <AddNote color={color} />
        </div>

        <div className="row mt-4 align-content-center">
          {
            notes.map((note, index) => {
              return <div onClick={() => {
                setActiveNote(note)
                ref.current.click()
              }} className="col-3 my-2">
                <Note key={note._id} note={note} />
              </div>
            })
          }
        </div>

      </div>

    </>
  )





  function updateNote() {
    return <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
      <div className={`modal-dialog modal-lg  modal-dialog-centered modal-dialog-scrollable`}>
        <div className={`modal-content bg-${darkMode ? "dark" : "light"}  `}>
          <div className="modal-body">

            <div className={`container col-8 border ${color.background} rounded-2 shadow `}>

              <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px' }} className={`form-control text- ${color.background + " " + color.text} form-control-lg`} onChange={handleUpdateInputTitle} type="text" value={activeNote.title} placeholder="Title" aria-label=".form-control-lg example" />

              <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px', fontSize: '16px' }} className={`form-control ${color.background + " " + color.text} form-control-lg`} onChange={handleUpdateInputBody} type="text" size={5} value={activeNote.description} placeholder="Description" aria-label=".form-control-lg example" />

              <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px', fontSize: '15px' }} className={`form-control text-bold ${color.background + " " + color.text} form-control-lg`} onChange={handleUpdateInputTag} type="text" size={5} value={activeNote.tags} placeholder="Tags" aria-label=".form-control-lg example" />

            </div>
          </div>
          <div className="row my-3">
            <div className="col-5"></div>
            <button type="button" className="btn btn-secondary mx-2 col-2" data-bs-dismiss="modal" onClick={() => {
              setActiveNote(noteInitial)
            }}>Close</button> 
            <button type="button" className="btn btn-danger mx-2 col-2" data-bs-dismiss="modal" onClick={handleDeleteNote}><i className="bi bi-trash"></i> Delete</button>
            <button type="button" className="btn btn-primary mx-2 col-2" data-bs-dismiss="modal" onClick={handleUpdateNote} >Save changes</button>
          </div>
        </div>
      </div>
    </div>
  }
}
