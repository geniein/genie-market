import "antd/dist/antd.css";
import "./index.css";
import MainPage from "../../pages/main/index";
import LoginPage from "../../pages/login/index";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "../../upload";
import ProductPage from "../../product";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
function App() {
  const history = useHistory();
  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/icons/logo.png" />
          </Link>
          <div>
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
              history.push("/signup");
            }}            
          >
            Signup
          </Button>
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
