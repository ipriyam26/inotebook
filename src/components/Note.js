import React,{useContext} from 'react'
import DarkModeContext from '../context/darkModeContext'

export default function Note(props) {
  const { darkMode } = useContext(DarkModeContext)
  const date = new Date(props.note.date).toLocaleDateString()
  return (

        <div className={`card text-${!darkMode?"dark":"light"} bg-${darkMode?"dark":"light"} mb-3 shadow`}  style={{maxWidth:'18rem'}}>

  <div className="card-body">
    <div className="row">
    <h5 className="card-title col-10">{props.note.title}</h5>
    </div>
    <h6 className="card-text text-muted">{props.note.description}</h6>
    <p className="card-subtitle mt-2 text-muted text-end" style={{
      fontSize: '0.8rem',
    }} >{date}</p>
  </div>
    <div className="card-footer">
      {props.note.tags.map((tag, index) => {
       return <div key={index} className={`badge rounded-pill text-${darkMode?"dark":"light"} bg-${!darkMode?"dark":"secondary"} mx-1`}>{tag}</div>
      })}
    </div>
</div>

  )
}
