import React from "react";
import "./index.css";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { useHistory } from 'react-router-dom';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

function LoginPage() {
   return (
    <div style={{display:"flex", justifyContent:"center"}}>      
        {/* <LoginCard></LoginCard> */}
        <SignupCard></SignupCard>
    </div>
  );
}

function LoginCard() {
  const history = useHistory();
  return (
   <div>      
       <div className='login_wrap'>
        <div className='login_title'>로그인</div>
        <div className='login_box'>
          <div style={{margin:"auto"}}>                       
            <input type="text" className='input_box' placeholder='ID'></input>            
            <input type="password" className='input_box' placeholder='Password'></input>                        
          </div>
        </div>        
        <button className='login_btn' 
                onClick={function () { history.push("/");}}>
                Login</button>        
        <button className='login_btn'>Signup</button>
       </div>
   </div>
 );
}

function SignupCard() {
  const history = useHistory();
  return (
   <div>      
       <div className='signup_wrap'>
        <div className='login_title'>회원가입</div>
        <div style={{margin:"auto"}}>
          <div className='signup_label'>아이디</div>
          <input type="text" className='signup_input'></input>
          <div className='signup_label'>비밀번호</div>
          <input type="text" className='signup_input'></input>
          <div className='signup_label'>비밀번호확인</div>
          <input type="text" className='signup_input'></input>
          <div className='signup_label'>별명</div>
          <input type="text" className='signup_input'></input>
        </div>
        <button className='login_btn' 
                onClick={function () { history.push("/login");}}>
                Signup</button>                
       </div>
   </div>
 );
}

export default LoginPage;
