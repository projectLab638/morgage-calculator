import React, { useState } from "react";
import emailjs from "emailjs-com";

import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./ContactUs.css";
const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_u33p8ad",
        "template_3sc8j9u",
        e.target,
        "1EEYTPZz41j68fuwK"
      )
      .then(
        (result) => {
          console.log(result.text);
          setShowConfirmation(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <Container className="my-5 one_low">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2 style={{ marginBottom: "1rem" }}>צור קשר</h2>

          {!showConfirmation ? (
            <Form onSubmit={handleSubmit} className="contact-form">
              <Row form>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>שם פרטי *</Form.Label>
                    <Form.Control
                      type="text"
                      style={{ textAlign: "center" }}
                      name="name"
                      required
                      onChange={handleChange}
                      placeholder="הזן את שמך הפרטי"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>דוא"ל *</Form.Label>
                    <Form.Control
                      type="email"
                      style={{ textAlign: "center" }}
                      name="email"
                      required
                      onChange={handleChange}
                      placeholder="הזן את כתובת הדואר האלקטרוני שלך"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>נושא *</Form.Label>
                    <Form.Control
                      as="select"
                      name="subject"
                      required
                      onChange={handleChange}
                      defaultValue=""
                    >
                      <option value="" disabled hidden>
                        בחר את נושא הפנייה
                      </option>
                      <option value="זקוק להמלצה איזה בנק הכי כדאי לי">
                        זקוק להמלצה איזה בנק הכי כדאי לי
                      </option>
                      <option value="שעות פעילות">שעות פעילות</option>
                      <option value="שאלה כללית">שאלה כללית</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  <Form.Group>
                    <Form.Label>הודעה *</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="message"
                      style={{ textAlign: "right" }}
                      required
                      onChange={handleChange}
                      rows={5}
                      placeholder="תוכן ההודעה"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                variant="primary"
                type="submit"
                style={{
                  fontSize: "20px",
                  padding: "10px 20px",
                  marginTop: "20px",
                }}
              >
                שלח
              </Button>
            </Form>
          ) : (
            <div className="confirmation-message">
              <h3>תודה רבה!</h3>
              <p>ההודעה נשלחה בהצלחה</p>
              <p>נחזור אליך בהקדם</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
