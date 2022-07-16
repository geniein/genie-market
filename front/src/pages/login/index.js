import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko");

function LoginPage() {
  const [loginState, setLoginState] = useState(true);
  const location = useLocation();
  
  useEffect(()=>{
    if(location.state!==undefined){
      const fromHeader = location.state.loginState;
      setLoginState(false);
      location.state = undefined;
    } 
    console.log(loginState);
  },[loginState]);
  

  
   return (
    <div style={{display:"flex", justifyContent:"center"}}>      
        {loginState &&<LoginCard LoginState={setLoginState}></LoginCard>}
        {!loginState && <SignupCard LoginState={setLoginState}></SignupCard>}
    </div>
  );
}

function LoginCard( props ) {
  const history = useHistory();
  const [userId, setUserId] = useState('');
  const [pwd, setPwd] = useState('');

  const login = () =>{
    const url = 'http://localhost:8080/auth/login';
    const data = {
      userId,
      pwd
    }
    axios.post(url,data, { withCredentials : true }).then(
      (rtn)=>{
        console.log(rtn.data);
        if(userId===rtn.data){
          // history.push("/");
          <Redirect to={{ pathname: "/" }}></Redirect>
        }else{
          alert("없는 아이디 입니다.");
        }
      }
    )
  }

  return (
   <div>      
       <div className='login_wrap'>
        <div className='login_title'>로그인</div>
        <div className='login_box'>
          <div style={{margin:"auto"}}>                       
            <input type="text" className='input_box' placeholder='ID' onChange={(e)=>setUserId(e.target.value)}></input>            
            <input type="password" className='input_box' placeholder='Password' onChange={(e)=>setPwd(e.target.value)}></input>                        
          </div>
        </div>        
        <button className='login_btn' 
                onClick={login}>
                Login</button>        
        <button className='login_btn'
                style={{cursor:"pointer"}}
                onClick={function () { props.LoginState(false);}}>
                Signup</button>
       </div>
   </div>
 );
}

function SignupCard(props) {
  const history = useHistory();

  const [userId, setUserId] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdChk, setPwdChk] = useState('');
  const [nickname, setNickname] = useState('');

  function signup(){
    //restapi
    const url = 'http://localhost:8080/auth/signup';
    const data = {
      userId,
      pwd,
      pwdChk,
      nickname
    }
    axios.post(url,data).then((res)=>{
      console.log(res);
      props.LoginState(true)  
    }).catch((err)=>console.log(err));
    
  }


  return (
   <div>      
       <div className='signup_wrap'>
        <div className='login_title'>회원가입</div>
        <div style={{margin:"auto"}}>
          <div className='signup_label'>아이디</div>
          <input type="text" className='signup_input' onChange={(e)=>setUserId(e.target.value)}></input>
          <div className='signup_label'>비밀번호</div>
          <input type="password" className='signup_input' onChange={(e)=>setPwd(e.target.value)}></input>
          <div className='signup_label'>비밀번호확인</div>
          <input type="password" className='signup_input' onChange={(e)=>setPwdChk(e.target.value)}></input>
          <div className='signup_label'>별명</div>
          <input type="text" className='signup_input' onChange={(e)=>setNickname(e.target.value)}></input>
        </div>
        <button className='login_btn' 
                onClick={signup}>
                Signup</button>                
       </div>
   </div>
 );
}

export default LoginPage;
