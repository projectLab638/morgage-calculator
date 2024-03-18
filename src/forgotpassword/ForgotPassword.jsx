import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import firebase from "../firebase/Firebase";
import "./ForgotPassword.css";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      await firebase.auth().sendPasswordResetEmail(email);
      setMessage('הודעה עם הוראות לאיפוס הסיסמה נשלחה לדוא"ל שלך.');
    } catch (error) {
      setError("שגיאה בשליחת הודעת איפוס סיסמה, אנא נסה שנית.");
      console.error("Error sending password reset email:", error);
    }
  };

  return (
    <div className="one_low">
      <Container>
        <h2>שחכתי סיסמה</h2>
        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group
            style={{
              marginTop: "20px",
            }}
          >
            <Form.Label>דוא"ל</Form.Label>
            <Form.Control
              style={{
                textAlign: "right",
                width: "30%",
                display: "flex",
                margin: "auto",
              }}
              type="email"
              placeholder="הזן את כתובת הדואר האלקטרוני שלך"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            style={{
              marginTop: "20px",
            }}
          >
            שלח הודעת איפוס סיסמה
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default ForgotPassword;
