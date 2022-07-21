import React,{useState} from 'react'

export default function AddNote(props) {
    let {color} = props
    const [adding, setAdding] = useState(false)
    const [note, setNote] = useState({
        title:"",
        body:"",
        tags:"",

    })


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
          tags: words.join(" ")
        })
      }
    
    const handleInputBody = (e) => {
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
    !adding ?
      <div className="container col-8 ">
        <input className={`form-control ${color.background + " " + color.text} form-control-lg`} onChange={handleInputTitle} type="text" value={note.title} placeholder="Take a note..." aria-label=".form-control-lg example" />
      </div>
      :
      <div className={`container col-8 border ${color.background} rounded-2 shadow`}>

        <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px' }} className={`form-control ${color.background + " " + color.text} form-control-lg`} onChange={handleInputTitle} type="text" value={note.title} placeholder="Title" aria-label=".form-control-lg example" />

        <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px', fontSize: '18px' }} className={`form-control ${color.background + " " + color.text} form-control-lg`} onChange={handleInputBody} type="text" size={5} value={note.body} placeholder="Description" id="description" aria-label=".form-control-lg example" />

        <input style={{ border: 0, boxShadow: 'none', borderRadius: '0px', fontSize: '18px' }} className={`form-control text-bold ${color.background + " " + color.text} form-control-lg`} onChange={handleInputTag} type="text" size={5} value={note.tags} placeholder="Tags" aria-label=".form-control-lg example" />

      </div>
  )
}
