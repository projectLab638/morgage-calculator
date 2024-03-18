// SignIn.js
import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignIn.css"; // Make sure to have this CSS file for styles
import { useNavigate } from "react-router-dom";
import firebase from "../../firebase/Firebase";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formData;

    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      if (user) {
        debugger;
        const userDoc = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const firstName = userData.firstName;
          console.log("First Name:", firstName);
          localStorage.setItem("firstName", firstName);
          localStorage.setItem("login", true);
        } else {
          console.log("No user document found!");
        }
        navigate("/"); // Adjust this as needed
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      alert("Error signing in: " + error.message);
    }
  };

  return (
    <div className="one_low">
      <Container className="signin-container">
        <Row className="justify-content-md-center">
          <Col md={8} lg={6}>
            <Form onSubmit={handleSubmit} dir="rtl">
              <h2 className="text-center">התחברות</h2>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>דואר אלקטרוני</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="הזן דואר אלקטרוני"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>סיסמה</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="הזן סיסמה"
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button variant="primary" type="submit">
                  התחבר
                </Button>
              </div>

              <div className="auth-links text-center">
                <Link to="/sign-up">אין לך חשבון? הרשמה</Link>
                <br />
                <Link to="/forgot-password">שכחת סיסמה?</Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;
