import "./createContactDetail.css";
import NavBar from "../userDashboard/navigationBar/NavBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function CreateContactDetail() {
  const [isLoggedIn, updateIsLoggedIn] = useState("");
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
  }, []);
  const handleCreateContact = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:8800/api/v1/createContact/${username.username}`, {
        fname,
        lname,
      })
      .then((resp) => {
        updateStatus("Contact Created");
      })
      .catch((error) => {
        updateStatus(error.response.data);
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
           Please login!!
          </p>

          <button
            onClick={() => navigation("/")}
            class="btn btn-secondary button"
          >
            Login
          </button>
        </div>
      </>
    );
  }
  return <></>;
}
export default CreateContactDetail;
