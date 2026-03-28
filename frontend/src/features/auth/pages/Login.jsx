import React ,{useState} from 'react'
import "../style/form.scss"
import {useAuth} from "../hooks/useAuth"
import { useNavigate } from 'react-router'
import { Link } from 'react-router'
const Login = () => {
 const {user,loading,handleLogin}= useAuth()

  const [username, setUsername] = useState()
  const [password,SetPassword]=useState()

   const navigate=useNavigate()

   const submitHandler = async (e)=>{
        e.preventDefault()
        await  handleLogin(username,password)
        console.log("loggedIn successfully");
        
        navigate('/')
    }

    if(loading){
        return (
            <main>
                <h1>Loading.....</h1>
            </main>
        )
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={submitHandler}>
            <input type="text" 
            name="username"
            placeholder="username"
            // value={username}
            onChange={(e)=>setUsername(e.target.value)}
          />
          <input 
           
            type="password"
            name="password " 
            placeholder="password"
            // value={password}
            onChange={(e)=>SetPassword(e.target.value)} />

            <button type="submit">Login</button>
            </form>
            <p>Don't have an account ? <Link to={"/register"} >Create One.</Link></p>
        </div>
        
    </main>
  )
}

export default Login
