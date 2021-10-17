import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from './app/components/header';

import HomePage from "./app/pages/home";
import ErrorPage from "./app/pages/error";
import {
  AddAnnouncementPage,
  AnnouncementsPage,
  AnnouncementPage
} from './app/pages/announcement';
import LoginPage from './app/pages/login';
import RegisterPage from './app/pages/register';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header> 
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/announcements" exact>
            <AnnouncementsPage />
          </Route>
          <Route path="/announcement/add" exact>
            <AddAnnouncementPage />
          </Route>
          <Route path="/announcement/:id">
            <AnnouncementPage />
          </Route>
          <Route path="/">
            <ErrorPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
