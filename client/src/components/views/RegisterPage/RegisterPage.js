import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/User_action';



function RegisterPage(props) {

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("")
  
  const onEmailHandler=(event)=>{
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler=(event)=>{
    setPassword(event.currentTarget.value)
  }

  const onSubmitHandler=(event)=>{
    event.preventDefault();

    let body={
      email:Email,
      password:Password,
    }
    
    dispatch(loginUser(body)).then(response => {
      if (response.payload.loginSuccess) {
          props.history.push('/')
      } else {
          alert('Error˝')
      }
  })
    
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:"100%",height:"100vh"}}>
      <form style={{display:'flex', flexDirection:'column'}}
      onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>confirmPassword</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onPasswordHandler} />
        <br />
        <button>login</button>
      </form>
    </div>
  )
}

export default RegisterPage