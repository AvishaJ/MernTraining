import "./GetAllContacts.css";
import NavBar from "../userDashboard/navigationBar/NavBar";
import { useParams } from "react-router-dom";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function GetAllContacts() {
  const username = useParams();
  const navigation = new useNavigate();
  const [isLoggedIn, updateIsLoggedIn] = useState("");
  const [allContacts, updateAllContacts] = useState([]);
  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isUserLoggedIn/${username.username}`,
        {}
      )
      .then((resp) => {
        updateIsLoggedIn(true);
      })
      .catch((error) => {
        updateIsLoggedIn(false);
      });
    getContacts();
  }, []);
  async function getContacts() {
    axios
      .get(`http://localhost:8800/api/v1/getContacts/${username.username}`)
      .then((resp) => {
        updateAllContacts(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  let rowOfContact;
  if (allContacts != null) {
    rowOfContact = Object.values(allContacts).map((u) => {
      return (
        <tr id={u.contactId}>
          <td> </td>
          <td>{u.fname}</td>
          <td>{u.lname}</td>
          <td>{u.fullname}</td>
          <td>{u.role}</td>
          <td id={u.contactId}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={u.isActive}
                    // onChange={toogleActiveFlag}
                    id={u.fullname}
                  />
                }
              />
            </FormGroup>
          </td>
        </tr>
      );
    });
    console.log(rowOfContact)
  }

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
          Please login!!
          </p>

          <button onClick={() => navigation("/")} class="btn btn-secondary button">
            login
          </button>
        </div>
      </>
    );
  }
  return (
    <>
      <NavBar username={username.username} />
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col"> </th>
              <th scope="col">Username</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Role</th>
              <th scope="col">Active</th>
            </tr>
          </thead>
          <tbody>{rowOfContact}</tbody>
        </table>
      </div>
    </>
  );
}
export default GetAllContacts;
