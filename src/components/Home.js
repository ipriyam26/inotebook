import React, { useContext, useEffect, useState, useRef } from 'react'
import DarkModeContext from '../context/darkModeContext'
import AddNote from './AddNote'
import Note from './Note'


export default function Home() {

  const { darkMode } = useContext(DarkModeContext)
  const ListNotes = [
    {
      "_id": "62d7b34ea4d9dfbccb0fb7de",
      "title": "Test Title2",
      "description": "Test description2",
      "userId": "62d6fe492ce0a3419c006e1c",
      "tags": [
        "General",
        "Family"
      ],
      "date": "2022-07-20T07:48:30.431Z",
      "__v": 0
    },
    {
      "_id": "62d7b369a4d9dfbccb0fb7e1",
      "title": "Test3 Title2",
      "description": "Test3 description2",
      "userId": "62d6fe492ce0a3419c006e1c",
      "tags": [
        "Family",
        "Meme"
      ],
      "date": "2022-07-20T07:48:57.107Z",
      "__v": 0
    },
    {
      "_id": "62d919aa81bdb94573d9aa60",
      "title": "New Note for me to you",
      "description": "Test3 description2",
      "userId": "62d6fe492ce0a3419c006e1c",
      "tags": [
        "Family",
        "Meme"
      ],
      "date": "2022-07-21T09:17:30.647Z",
      "__v": 0
    },
    {
      "_id": "62d919c481bdb94573d9aa62",
      "title": "New2 work me to you",
      "description": "Random rate 2 you",
      "userId": "62d6fe492ce0a3419c006e1c",
      "tags": [
        "Family"
      ],
      "date": "2022-07-21T09:17:56.333Z",
      "__v": 0
    }
  ]
  const [color, setColor] = useState({
    "background": "bg-light",
    "text": "text-dark"
  })

  useEffect(() => {
    setColor({
      "background": darkMode ? "bg-dark" : "bg-light",
      "text": darkMode ? "text-light" : "text-dark"
    })
  }, [darkMode])
  const ref = useRef(null);

  const [activeNote, setActiveNote] = useState({
    title: '',
    body: '',
    tags: ''
  })



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
      tags: words.join(" ")
    })
  }

  const handleUpdateInputBody = (e) => {
    setActiveNote({
      ...activeNote,
      body: e.target.value
    })
  }


  const handleUpdateInputTitle = (e) => {
    setActiveNote({
      ...activeNote,
      title: e.target.value
    })

  }

  function EditNote() {
    return <div className={`container col-8 border ${color.background} rounded-2 shadow shadow-intensity-md`}>

      <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px' }} className={`form-control text- ${color.background + " " + color.text} form-control-lg`} onChange={handleUpdateInputTitle} type="text" value={activeNote.title} placeholder="Title" aria-label=".form-control-lg example" />

      <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px', fontSize: '18px' }} className={`form-control ${color.background + " " + color.text} form-control-lg`} onChange={handleUpdateInputBody} type="text" size={5} value={activeNote.body} placeholder="Description" aria-label=".form-control-lg example" />

      <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px', fontSize: '18px' }} className={`form-control text-bold ${color.background + " " + color.text} form-control-lg`} onChange={handleUpdateInputTag} type="text" size={5} value={activeNote.tags} placeholder="Tags" aria-label=".form-control-lg example" />

    </div>
  }



  return (
    <>

      <button type="button" ref={ref} className="btn d-none btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch
      </button>


      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-body">

              {EditNote()}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container">

        <div className="row-1 mt-4 align-content-center">
          <AddNote color = {color}/>
        </div>

        <div className="row mt-4 align-content-center">
          {
            ListNotes.map((note, index) => {
              return <div onClick={()=>{
                ref.current.click()
                setActiveNote(note)
              }} className="container col">
                <Note key={index} note={note} />
              </div>
            })
          }
        </div>

      </div>

    </>
  )




}
