import React from "react";
import { Switch } from "react-router";
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Home from './pages/Home';
import SignIn from "./pages/SignIn";
import './styles/main.scss';


function App() {
  return (
    <Switch>
      <PublicRoute>
        <SignIn path="/signin"/>
      </PublicRoute>
      <PrivateRoute>
        <Home  path="/" />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
