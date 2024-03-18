// SignUp.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./SignUp.css"; // Make sure you have a corresponding CSS file for custom styles
import firebase, { firestore } from "../../firebase/Firebase";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    debugger;
    console.log(formData);
    try {
      // Using Firebase SDK to create user
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password);
      const user = userCredential.user;

      // Optionally: Update user profile (e.g., display name)
      await user.updateProfile({
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // Add user data to Firestore
      await firebase.firestore().collection("users").doc(user.uid).set({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      });
      navigate("/sign-in"); // Redirect to home page after successful sign-up
      console.log("User created:", user);
      // Redirect or perform additional actions upon success
    } catch (error) {
      alert("Error signing up:", error.message);
      console.error("Error signing up:", error.message);
      // Display an appropriate error message to the user
    }
  };

  return (
    <div className="one_low">
      <Container className="signup-form ">
        <Row className="justify-content-md-center">
          <Col md={8} lg={6}>
            <Form onSubmit={handleSubmit} dir="rtl">
              <h2 className="text-center mb-4">הרשמה לחדש</h2>

              {/* First Name and Last Name */}
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Control
                    type="text"
                    name="firstName"
                    required
                    onChange={handleChange}
                    placeholder="שם פרטי *"
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Control
                    type="text"
                    name="lastName"
                    required
                    onChange={handleChange}
                    placeholder="שם משפחה *"
                  />
                </Col>
              </Row>

              {/* Email */}
              <Row>
                <Col md={6} xl={12}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="email"
                      name="email"
                      required
                      onChange={handleChange}
                      placeholder="אימייל *"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xl={12}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="tel"
                      style={{ direction: "rtl " }}
                      name="phone"
                      required
                      onChange={handleChange}
                      placeholder="מספר פלאפון *"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6} xl={12}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      name="password"
                      required
                      onChange={handleChange}
                      placeholder="סיסמה *"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} xl={12}>
                  <Form.Group className="mb-3">
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      required
                      onChange={handleChange}
                      placeholder="אימות סיסמה *"
                    />
                  </Form.Group>
                </Col>
              </Row>
              {/* Password */}
              <div className="text-center">
                <Link to="/sign-in">כבר רשום? התחברות</Link>
              </div>

              <div className="text-center mt-2">
                <Link to="/forgot-password">שיחזור סיסמה</Link>
              </div>
              <div className="text-center mb-3">
                <Button variant="primary" type="submit">
                  יצירת חשבון
                </Button>
              </div>

              {/* Link to terms of service */}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
