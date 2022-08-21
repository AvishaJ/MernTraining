import React, { useEffect, useState } from "react";
import axios from "axios";

import NavBar from "./navigationBar/NavBar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./adminDashboard.css";
function AdminDashboard() {
  const navigation = new useNavigate();

  const [isLoggedIn, updateIsLoggedIn] = useState("");
  const [propertyToUpdate, updatepropertyToUpdate] = useState("username");
  const [value, updateValue] = useState("");
  // const [username, updateUsername] = useState("");
  const [fname, updateFname] = useState("");
  const [lname, updateLname] = useState("");

  const [password, updatePassword] = useState("");
  const [role, updateRole] = useState("user");
  const [username, updateUsername] = useState("");
  const [statusOfUpdateUser, updateStatusOfUpdateUser] = useState("");
  const [statusOfCreateUser, updateStatusOfCreateUser] = useState("");
  let currentUser = useParams();

  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isAdminLoggedIn/${currentUser.username}`,
        {}
      )
      .then((resp) => {
        updateIsLoggedIn(true);
      })
      .catch((error) => {
        updateIsLoggedIn(false);
      });
  }, []);
  const navToLogin = () => {
    navigation("/");
  };
  const handleUpdateUserSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios
      .put("http://localhost:8800/api/v1/updateUser", {
        username,
        propertyToUpdate,
        value,
      })
      .then((resp) => {
        updateStatusOfUpdateUser("user updated");
      })
      .catch((error) => {
        console.log(error);
        updateStatusOfUpdateUser(error.response.data);
      });
  };
  const handleGetAllUsers = () => {
    navigation(`/displayAllUsers/${currentUser.username}`);
  };
  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    const resp = await axios
      .post("http://localhost:8800/api/v1/createUser", {
        fname,
        lname,
        username,
        password,
        role,
      })
      .then((resp) => {
        updateStatusOfCreateUser("user created");
      })
      .catch((error) => {
        updateStatusOfCreateUser(error.response.data);
      });
  };

  if (!isLoggedIn) {
    return (
      <>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <p style={{ color: "red", fontSize: "20px" }}>
            User not logged in please login by clicking below
          </p>

          <button onClick={navToLogin} class="btn btn-secondary button">
            login
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <NavBar username={currentUser.username} />
      <div id="admindashboard">
        <div id="admindashboardform">
          <form onSubmit={handleCreateUserSubmit} id="formadmin">
          <br/><h2>Create Form</h2><br/>
            <label class="fw-bold">Firstname:</label>
            <input
              type="text"
              value={fname}
              onChange={(e) => updateFname(e.target.value)}
            ></input>
            <br />
            <label class="fw-bold">Lastname:</label>
            <input
              type="text"
              value={lname}
              onChange={(e) => updateLname(e.target.value)}
            ></input>
            <br />
            <label class="fw-bold">Username:</label>
            <input
              type="text"
              onChange={(e) => updateUsername(e.target.value)}
            ></input>
            <br />
            <label class="fw-bold">Password:</label>
            <input
              type="text"
              value={password}
              onChange={(e) => updatePassword(e.target.value)}
            ></input>
            <br />
          
            <label class="fw-bold">Role:</label>
            <select
              id="role"
              name="role"
              onChange={(e) => {
                updateRole(e.target.value);
              }}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <br />
            <button class="btn btn-primary button">Create User</button>
            <br />
            <br />
            {statusOfCreateUser}
          </form>
        </div>
        <div id="admindashboardform">
          <form onSubmit={handleUpdateUserSubmit} id="formadmin">
          <h2>Update form</h2><br/>
            <label class="fw-bold">Username:</label>
            <input
              type="text"
              onChange={(e) => {
                updateUsername(e.target.value);
              }}
            ></input>
            <br />

            <label for="property" class="fw-bold">
              Property:
            </label>
            <select id="property" name="property"
              onChange={(e) => {
                updatepropertyToUpdate(e.target.value);
              }}
            >
              <option value="username">Username</option>
              <option value="firstname">Firstname</option>
              <option value="lastname">Lastname</option>
            </select>
            <br />
            <label class="fw-bold">Value:</label>
            <input
              type="text"
              value={value}
              onChange={(e) => {
                updateValue(e.target.value);
              }}
            ></input>
            <br />
            <button class="btn btn-primary button">Update User</button>
            <br />
            <br />
            {statusOfUpdateUser}
          </form>
        </div>
        <div id="admindashboardform">
          <div>
            <button onClick={handleGetAllUsers} style={{height: "200px", width: "300px",}}
              class="btn btn-primary button">Show all Users</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminDashboard;
