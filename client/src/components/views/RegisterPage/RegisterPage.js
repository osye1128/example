import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/User_action';
import {withRouter} from 'react-router-dom';





function RegisterPage(props) {

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  
  const onEmailHandler=(event)=>{
    setEmail(event.currentTarget.value)
  }
  const onNameHandler=(event)=>{
    setName(event.currentTarget.value)
  }
  const onPasswordHandler=(event)=>{
    setPassword(event.currentTarget.value)
  }

  const onconfirmPasswordHandler=(event)=>{
    setconfirmPassword(event.currentTarget.value)
  }

  const onSubmitHandler=(event)=>{
    event.preventDefault();

    let body={
      email:Email,
      password:Password,
      name:Name,
    }

    if(Password !== confirmPassword){
      alert('비밀번호를 다시 확인해주세요.')
    }
    
    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
          props.history.push('/login')
      } else {
          alert('Error')
      }
  })
    
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:"100%",height:"100vh"}}>
      <form style={{display:'flex', flexDirection:'column'}}
      onSubmit={onSubmitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>confirmPassword</label>
        <input type="password" value={confirmPassword} onChange={onconfirmPasswordHandler} />
        <br />
        <button>register</button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage)