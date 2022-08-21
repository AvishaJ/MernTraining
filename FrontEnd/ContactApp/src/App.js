import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState } from "react";
import Login from "./Components/Login/Login.js";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Components/adminDashboard/adminDashboard";
import UserDashboard from "./Components/userDashboard/userDashboard";
import DisplayAllUsers from "./Components/displayAllUsers/displayAllUsers";
import CreateContact from "./Components/createContact/CreateContact";
import UpdateContacts from "./Components/updateContacts/UpdateContacts";
import GetAllContacts from "./Components/getAllContacts/GetAllContacts";
function App() {
  return (
    <Routes>
      <Route
        exact
        path="/adminDashboard/:username"
        element={<AdminDashboard />}
      />
      <Route exact path="/" element={<Login />} />
      <Route
        exact
        path="/userDashboard/:username"
        element={<UserDashboard />}
      />
      <Route
        exact
        path="/displayAllUsers/:username"
        element={<DisplayAllUsers />}
      />
      <Route
        exact
        path="/userDashboard/createContacts/:username"
        element={<CreateContact />}
      />
      <Route
        exact
        path="/adminDashboard/:username"
        element={<AdminDashboard />}
      />
      <Route
        exact
        path="/userDashboard/GetAllContacts/:username"
        element={<GetAllContacts />}
      />
      <Route
        exact
        path="/userDashboard/UpdateContacts/:username"
        element={<UpdateContacts />}
      />
    </Routes>
  );
}

export default App;
