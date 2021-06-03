import React from 'react';
import { useEffect } from 'react';
import {BrowserRouter as Router ,Switch,Route} from "react-router-dom";
import './App.css';
import {getUserAuth} from "./actions";
import Header from './component/Header';
import Home from "./component/Home";
import Login from './component/Login';
import { connect } from 'react-redux';

function App(props) {
  useEffect(() =>{
    props.getUserAuth();
  },[]);
  return (
    <div className="App">
      <Router>
      <Switch>
      <Route exact path="/">
      
      <Login/>
      </Route>
      <Route path="/home">
      <Header/>
      <Home/>
      </Route>
      </Switch>
      </Router>
    </div>
  );
}


const mapStateToProps = (state)=>{
          return {};
};


const mapDispatchTOProps = ( dispatch)=>({
  getUserAuth : () => dispatch(getUserAuth())
});



export default connect(mapStateToProps,mapDispatchTOProps)(App);
