import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RightSideMenu from "./components/sidebar/Sidebar";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import NewLow from "./pages/newLow/NewLow";
import OneLow from "./pages/oneLow/OneLow";
import CustomTable from "./pages/newLow/CustomTable";
import ContactUs from "./pages/contactus/ContactUs";
import SignUp from "./pages/signup/SignUp";
import SignIn from "./pages/SignIn/SignIn";
import ForgotPassword from "./forgotpassword/ForgotPassword";
import FewLow from "./pages/fewlow/FewLow";
import { Nav } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Button } from "react-bootstrap";
import { FaBars, FaHome, FaUser } from "react-icons/fa";
import firebase from "./firebase/Firebase";
import { useNavigate } from "react-router-dom";

const containerStyle = {
  display: "flex",
  postion: "absolute",
  zIndex: 1000,
  justifyContent: "space-between",
  alignItems: "flex-start",
  widht: "50%",
  flexDirection: "row-reverse",
};
function App() {
  const [username, setUserName] = useState(localStorage.getItem("firstName"));
  const [show, setShow] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 768px)").matches
  );
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
  useEffect(() => {
    const handler = () =>
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return (
    <div className="App">
      <Router>
        <Container fluid={true}>
          {" "}
          {!isMobile && (
            <Navbar
              className="p-1 custom-navbar"
              sticky={"top"}
              style={{
                direction: "rtl",
                width: "74%",
                justifyContent: "space-between",
              }}
            >
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
          )}
          <Row
            style={{
              display: "flex",
              flexDirection: "row-reverse",
            }}
          >
            {isMobile ? (
              <Col xs={12}>
                <RightSideMenu />
              </Col>
            ) : (
              <>
                <Col
                  xs={12}
                  md={4}
                  lg={4}
                  xl={3}
                  className={`sidebar ${isMobile ? "d-none" : "d-block"}`}
                >
                  <Nav className="flex-column" z-index={1000}>
                    <LinkContainer to="/">
                      <Nav.Link className="custom-nav-link">דף הבית</Nav.Link>
                    </LinkContainer>
                    <Navbar.Brand className="sidebar-section-title">
                      מעוניין לקחת תשכנתא חדשה
                    </Navbar.Brand>
                    <LinkContainer to="/new-low">
                      <Nav.Link className="custom-nav-link">
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
                            <LinkContainer to="/one-low">
                              <Nav.Link>אני מעוניין לקחת הלוואה אחת</Nav.Link>
                            </LinkContainer>
                          </OverlayTrigger>
                          <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltip}
                          >
                            <LinkContainer to="/multiple-loan">
                              <Nav.Link>אני מעוניין לקחת כמה הלוואות</Nav.Link>
                            </LinkContainer>
                          </OverlayTrigger>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>

                    <Nav.Link className="custom-nav-link" href="/contact-us">
                      מעוניין לקחת הלוואה מעל 100 אלף ש"ח
                    </Nav.Link>
                    <LinkContainer to="/contact-us">
                      <Nav.Link className="custom-nav-link">צור קשר</Nav.Link>
                    </LinkContainer>
                  </Nav>
                </Col>
              </>
            )}

            {/* Main content */}
            <Col xs={12} md={isMobile ? 12 : 8} lg={8} xl={9}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/new-low" element={<NewLow />} />
                <Route path="/new-low/custom-table" element={<CustomTable />} />
                <Route path="/one-low" element={<OneLow />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/multiple-loan" element={<FewLow />} />
                {/* Define more routes as needed */}
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
