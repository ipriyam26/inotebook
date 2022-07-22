import React,{useState,useContext} from 'react'
import DarkModeContext from '../context/darkModeContext'
import NoteContext from '../context/NoteContext'

export default function AddNote(props) {
    let {color} = props
    const [adding, setAdding] = useState(false)
    const [note, setNote] = useState({
        title:"",
        description:"",
        tags:[],

    })
    const {addNote} = useContext(NoteContext)
    const {darkMode} = useContext(DarkModeContext)



    const handleInputTag = (e) => {
        let words = e.target.value.split(" ")
        const length = words.length
        if (length > 1) {
          if (words[length - 1] === "") {
            words[length - 2] = "#" + words[length - 2]
          }
        }
        setNote({
          ...note,
          tags: words
        })
      }
    
    const handleInputBody = (e) => {
        setNote({
          ...note,
          description: e.target.value
        })
      }
    
    
    const handleInputTitle = (e) => {
        setNote({
          ...note,
          title: e.target.value
        })
        setAdding(true);

      } 
      
      const handleAddNote= async ()=>{
        let tags = note.tags.map(tag=>tag.replace("#",""))
        await addNote(note.title,note.description,tags)
        setAdding(false)
        setNote({  title:"",
        description:"",
        tags:[],})
      }

  return (
    !adding ?
      <div className="container col-8 ">
        <input className={`form-control ${color.background + " " + color.text} form-control-lg`} onChange={handleInputTitle} type="text" value={note.title} placeholder="Take a note..." aria-label=".form-control-lg example" />
      </div>
      :
      <div className={`container col-8 border ${color.background} rounded-2 shadow`}>

        <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px' }} className={`form-control ${color.background + " " + color.text} form-control-lg`} onChange={handleInputTitle} type="text" value={note.title} placeholder="Title" aria-label=".form-control-lg example" />

        <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px', fontSize: '18px' }} className={`form-control ${color.background + " " + color.text} form-control-lg`} onChange={handleInputBody} type="text" size={5} value={note.description} placeholder="Description" id="description" aria-label=".form-control-lg example" />

        <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px', fontSize: '18px' }} className={`form-control text-bold ${color.background + " " + color.text} form-control-lg`} onChange={handleInputTag} type="text" size={5} value={note.tags.join(" ")} placeholder="Tags" aria-label=".form-control-lg example" />
        <div className="row my-3">
              <div className="col-7"></div>
              <button type="button" className={`btn btn-secondary text-${!darkMode?"light":"dark"} mx-2 col-2`}  >Close</button>
              <button type="button" className={`btn mx-2 btn-${!darkMode?"dark":"light"} text-${!darkMode?"light":"dark"} col-2`} onClick={handleAddNote}>Save changes</button>
            </div>

      </div>
  )
}
