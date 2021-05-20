import './App.css';
import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from './components/Home';
import Dash from './components/Dash';

function App() {

  let handleSubmit = (evt) => {
    evt.preventDefault()

    let newUser = {
      name: evt.target[0].value,
      username: evt.target[1].value,
      password: evt.target[2].value,
      credits: 200
    }

    fetch('http://localhost:3000/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newUser)
    })
    // .then(resp => resp.json())
    // .then(data => {
    //   localStorage.setItem("token", data.jwt)
    // })
  }

  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/dash"} component={Dash} />
          </Switch>
        </BrowserRouter>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" />
          <input type="text" name="username" />
          <input type="password" name="password" />
          <input type="submit" value="Submit" />
        </form>
      </header>
    </div>
  );
}

export default App;
