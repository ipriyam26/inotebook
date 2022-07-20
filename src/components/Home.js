import React, {useContext,useEffect, useState} from 'react'
import DarkModeContext from '../context/darkModeContext'
export default function Home() {

  const {darkMode} = useContext(DarkModeContext)
  const [note, setNote] = useState({
    title: '',
    body: '',
    tags: ''
  })


  const [color, setColor] = useState({
    "background": "bg-light",
    "text": "text-dark"
})
const [adding, setAdding] = useState(false)

  useEffect(() => {
    setColor({
      "background": darkMode ? "bg-dark" : "bg-light",
      "text": darkMode ? "text-light" : "text-dark"
    })
  }, [darkMode])

  const handleInput = (e) => {
    setNote({
      ...note,
      body: e.target.value
    })
  }
  const handleInputTitle = (e) => {
    setNote({
      ...note,
      title: e.target.value
    })
    setAdding(true);
  }


  return (
    <>
    <div className="container">
    <div className="row mt-4 align-content-center">
      {/* <div className="col-2"></div> */}
      {!adding?
      <div className="container col-8 ">
        <input className={`form-control ${color.background+" "+color.text} form-control-lg`} onChange={handleInputTitle} type="text" value={note.title} placeholder="Take a note..." aria-label=".form-control-lg example"/>
      </div>
      :
      <div className={`container col-8 border ${color.background} rounded shadow shadow-intensity-md`}>
        <input style={{border:0,boxShadow:'none',borderRadius:'0px'}} className={`form-control ${color.background+" "+color.text} form-control-lg`}  onChange={handleInputTitle} type="text" value={note.title} placeholder="Title" aria-label=".form-control-lg example"/>

        <input style={{border:0,boxShadow:'none',borderRadius:'0px',fontSize:'18px'}} className={`form-control ${color.background+" "+color.text} form-control-lg`} onChange={handleInput} type="text" size={5} value={note.body} placeholder="Description" aria-label=".form-control-lg example"/>
      </div>
    }
      {/* <div className="col-2"></div> */}
      </div>
      
    </div>
    </>
  )
}
