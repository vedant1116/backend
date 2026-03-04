import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
// import { useEffect } from 'react'

const App = () => {
  const [notes, setnotes] = useState([])

  // useEffect(()=>{
  //   axios.get('http://localhost:8080/notes').then((res)=>{
  //     setnotes(res.data.notes)
  //   })
  // },[])

   
  useEffect(()=>{
    getNotes();
   
  },[])
  function getNotes(){
     axios.get('https://backend-sh78.onrender.com/notes').then((res)=>{
    setnotes(res.data.notes);
   console.log(res.data);
   })
  }
 function submithandler(e){
  e.preventDefault();
  const title1=e.target.title.value;
  const description1=e.target.description.value;
  
  axios.post('https://backend-sh78.onrender.com/notes',{
    title:title1,
    description:description1,

  }).then((res)=>{
    getNotes();
  })
 }
 function deletehandler(noteid){
  console.log(noteid);
  
 axios.delete('https://backend-sh78.onrender.com/notes/'+noteid).then((res)=>{
  getNotes();
 })
}

function updatehandler(noteid){
  // const description=prompt("Enter new description");
  // const id=prompt("Enter id of note to be updated");
  // axios.patch('http://localhost:3000/notes/'+id,{description}).then((res)=>{
  //   getNotes();
  // })
  axios.patch('https://backend-sh78.onrender.com/notes/'+noteid,{description:prompt("Enter new description")}).then((res)=>{
    getNotes();
  })
}
  return (
   <>
   <form className='form' onSubmit={submithandler}>
    <input name="title" type="text" placeholder='title' />
    <input name="description" type="text" placeholder='description' />
    <button type='submit'>Add Note</button>
   </form>
  
   <div className="notes">
    {notes.map((note,index)=>{ 
       return( <div className="note">
        <h1>{note.title}</h1>
        <p>{note.description}</p>
        <button className='btn' onClick={()=>{
          deletehandler(note._id)
        }}>Delete</button>
        <button className='btn'onClick={()=>{
          updatehandler(note._id)
        }}>Update Note</button>
       </div>

       )
    })}
   </div>
   </>
  )
}

export default App
