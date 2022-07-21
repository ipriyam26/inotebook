import React from 'react'

export default function Note(props) {
  const date = new Date(props.note.date).toLocaleDateString()
  return (

        <div className="card text-bg-dark mb-3"  style={{maxWidth:'18rem'}}>

  <div className="card-body">
    <h5 className="card-title">{props.note.title}</h5>
    <h6 className="card-text text-muted">{props.note.description}</h6>
    <p className="card-subtitle mt-2 text-muted text-end" style={{
      fontSize: '0.8rem',
    }} >{date}</p>
  </div>
    <div className="card-footer">
      {props.note.tags.map((tag, index) => {
       return <div key={index} className="badge rounded-pill bg-dark mx-1">{tag}</div>
      })}
    </div>
</div>

  )
}
