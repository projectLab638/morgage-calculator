import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import firebase from "../../firebase/Firebase";
import { LinkContainer } from "react-router-bootstrap";
import { Accordion } from "react-bootstrap";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { FaBars, FaHome, FaUser } from "react-icons/fa";

const RightSideMenu = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row-reverse",
    height: "100%",
  };

  const [show, setShow] = useState(false);
  const [username, setUserName] = useState("");
  const location = useLocation();
  const [isConnected, setIsConnected] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const fireName = localStorage.getItem("firstName");
  useEffect(() => {
    if (fireName) {
      setUserName(fireName);
    }
  }, [fireName]);
  console.log("username", username);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.clear(); // Clear all local storage
        // Optionally, reset any state that may be dependent on local storage or user session
        setUserName(""); // If you're storing the user name in the component's state
        setIsConnected(false); // Update the state to reflect that the user is not connected
        // Use navigate to redirect to the sign-in page without reloading the entire page
        navigate("/sign-in"); // Adjust the route as necessary
      })
      .catch((error) => {
        console.error("Logout error:", error);
        // Handle logout error, for example, by showing a message to the user
      });
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      עד 100,000 ש"ח
    </Tooltip>
  );

  return (
    <div>
      <Navbar
        className="p-1 custom-navbar"
        sticky={"top"}
        style={containerStyle}
      >
        <Button onClick={handleShow} className="custom-nav-btn">
          <FaBars />
        </Button>
        <Navbar.Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {username ? username : "משתמש אנונימי"} <FaUser size={24} />
        </Navbar.Text>
        <Button
          className="login-btn mx-3"
          onClick={username ? handleLogout : undefined}
          href={!username ? "/sign-in" : undefined}
        >
          {username ? "התנתק" : "התחבר"}
        </Button>
      </Navbar>

      <div>
        <Offcanvas
          show={show}
          onHide={handleClose}
          bg="primary"
          placement="end"
        >
          <Offcanvas.Header className="custom-nav-title">
            <Offcanvas.Title className="text-icon">
              <FaHome /> תפריט
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column" z-index={1000}>
              <LinkContainer to="/">
                <Nav.Link className="custom-nav-link" onClick={handleClose}>
                  דף הבית
                </Nav.Link>
              </LinkContainer>
              <Navbar.Brand className="sidebar-section-title">
                מעוניין לקחת תשכנתא חדשה
              </Navbar.Brand>
              <LinkContainer to="/new-low">
                <Nav.Link className="custom-nav-link" onClick={handleClose}>
                  רוצה לבדוק איפה הכי כדאי לי לקחת משכנתא
                </Nav.Link>
              </LinkContainer>
              <Navbar.Brand className="sidebar-section-title">
                מעוניין לקחת הלוואה רגילה
              </Navbar.Brand>
              <Accordion style={{ direction: "rtl", border: "none" }}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header
                    style={{
                      border: "none",
                    }}
                  >
                    מעוניין לקחת הלוואה עד 100 אלף שח
                  </Accordion.Header>
                  <Accordion.Body
                    style={{
                      border: "none",
                    }}
                  >
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <LinkContainer to="/one-low" onClick={handleClose}>
                        <Nav.Link>אני מעוניין לקחת הלוואה אחת</Nav.Link>
                      </LinkContainer>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <LinkContainer to="/multiple-loan" onClick={handleClose}>
                        <Nav.Link>אני מעוניין לקחת כמה הלוואות</Nav.Link>
                      </LinkContainer>
                    </OverlayTrigger>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              <Nav.Link
                className="custom-nav-link"
                href="/contact-us"
                onClick={handleClose}
              >
                מעוניין לקחת הלוואה מעל 100 אלף ש"ח
              </Nav.Link>
              <LinkContainer to="/contact-us">
                <Nav.Link className="custom-nav-link" onClick={handleClose}>
                  צור קשר
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default RightSideMenu;
