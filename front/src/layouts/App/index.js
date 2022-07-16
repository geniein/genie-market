import "antd/dist/antd.css";
import "./index.css";
import MainPage from "../../pages/main/index";
import LoginPage from "../../pages/login/index";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "../../upload";
import ProductPage from "../../product";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/constants";
import axios from "axios";

function App() {
  const history = useHistory();
  const [login, setLogin] = useState(false);
  //hooks

  useEffect(async ()=>{
    let loginState = await axios
    .get(`${API_URL}/auth/auth`, { withCredentials : true })
    // .then((res)=>{      
    //    if(res.data !== null){
    //     setLogin(true);
    //    }
    // })
    console.log('state');
    console.log(loginState);
    if(loginState !== null){
      setLogin(true);
    }
  },[login]);

  const clickLogout = () =>{
    console.log('logout');
    axios
    .post(`${API_URL}/auth/logout`,{},{ withCredentials : true })
    .then((res)=>{
      console.log(res);
    })
  }

  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/icons/logo.png" />
          </Link>        
          <div>
          {login && <div>
            <Button
              size="large"
              onClick={clickLogout}
              style={{marginRight:'10px'}}            
            >
              Logout
            </Button>          
            <Button
              size="large"
              onClick={function () {
                history.push({
                  pathname: '/login',                
                  state: { loginState:false },
                });              
              }}            
            >
              Mypage
            </Button>
          </div>
          }          
          {!login && <div>
            <Button
              size="large"
              onClick={function () {
                history.push("/login");
              }}
              style={{marginRight:'10px'}}            
            >
              Login
            </Button>          
            <Button
              size="large"
              onClick={function () {
                history.push({
                  pathname: '/login',                
                  state: { loginState:false },
                });              
              }}            
            >
              Signup
            </Button>
          </div>
          }
        </div>
      </div>
    </div>
    <div id="body">
        <Switch>
          <Route exact={true} path="/login">
            <LoginPage />
          </Route>
          <Route exact={true} path="/">
            <MainPage />
          </Route>
          <Route exact={true} path="/products/:id">
            <ProductPage />
          </Route>
          <Route exact={true} path="/upload">
            <UploadPage />
          </Route>
        </Switch>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
