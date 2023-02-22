import "./App.css";
import SignUp from "./components/Authorization/SignUp";
import LogIn from "./components/Authorization/LogIn";
import Registration from "./components/Registration/Registration";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import AdminLogin from "./components/Admin/AdminLogin";
import AdminView from "./components/Admin/AdminView";
import { Redirect, Route, Switch } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  const { admin } = useContext(AuthContext);
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <SignUp />
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to={`/employee/${user.email}`} /> : <LogIn />}
        </Route>
        <Route exact path="/employeeRegistration">
          {admin && <Registration />}
        </Route>
        <Route exact path="/employee/:email">
          {user || admin ? <Profile /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/adminlogin">
          {admin ? <Redirect to="/adminsview" /> : <AdminLogin />}
        </Route>
        <Route exact path="/adminsview">
          {admin && <AdminView />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
