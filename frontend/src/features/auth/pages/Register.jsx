import React, {useState} from 'react'
import {useAuth} from "../hooks/useAuth"
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
import '../style/form.scss'


const Register = () => {
    const {user,loading,handleRegister}=useAuth()

    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

        const navigate = useNavigate()
    async function handleSubmit(e){
     e.preventDefault()
      await handleRegister(username,email,password)

     navigate('/')
    }

    if (loading) {
        return (<main>
            <h1>Loading.....</h1>
        </main>)
    }
  return (
   <main>
    <div className='form-container'>
    <h1>Register</h1>
    <form onSubmit={handleSubmit}>
        <input 
        onInput={(e)=>{setusername(e.target.value)}}
        type="text" 
        name="username" 
        placeholder="Enter username" />
        <input 
        onInput={(e)=>{setemail(e.target.value)}}

        type="email" 
        name="email" 
        placeholder="Enter email" />
        <input 
        onInput={(e)=>{setpassword(e.target.value)}}
        type="text" 
        name="password" 
        placeholder="Enter password" />
        <button type="submit">Register</button>
    </form>
    <p>Already have an account <Link to='/login'>Login</Link></p>
    </div>
   </main>
  )
}

export default Register