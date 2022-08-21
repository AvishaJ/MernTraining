import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useNavigate, useParams } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
function NavBar({ username, role }) {
  let navigation = useNavigate();
  const handleCreateContact = () => {
    console.log("hiiii");
    navigation(`/userDashboard/createContacts/${username}`);
  };
  const handleUpdateContact = () => {
    navigation(`/userDashboard/UpdateContacts/${username}`);
  };
  const handleGetAllContact = () => {
    navigation(`/userDashboard/GetAllContacts/${username}`);
  };
  const handleMyLogout = async () => {
    await axios.post("http://localhost:8800/api/v1/logout").then(() => {
      navigation("/");
    });
  };

  return (
    <>
      <Navbar className="fixed-top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Contact App</Navbar.Brand>
          <Nav className="me-auto">
            <div className='pull-right' >
              <ul class="nav navbar-nav">

                <button onClick={handleCreateContact} className="btn btn-primary" style={{ backgroundColor: "pink", display: "inlineBlock" }}>Create</button>

                <button onClick={handleUpdateContact} className="btn btn-primary" style={{ backgroundColor: "pink", display: "inlineBlock" }}>Update</button>

                <button onClick={handleGetAllContact} className="btn btn-primary" style={{ backgroundColor: "pink", display: "inlineBlock" }}>View</button>

                <button onClick={handleMyLogout} className="btn btn-primary" style={{ backgroundColor: "pink", display: "inlineBlock" }}>Logout</button>

              </ul>
            </div>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
export default NavBar;