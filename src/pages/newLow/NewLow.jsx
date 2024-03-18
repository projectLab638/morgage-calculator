import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { Range, getTrackBackground } from "react-range";
import Select from "react-select";
import "./NewLow.css"; // Add this line at the top of your file
import { useNavigate } from "react-router-dom";
import MultiSelectCheckbox from "../../components/multiselect/MultiSelectCheckbox";
import firebase from "../../firebase/Firebase"; // Ensure you import firebase correctly

const NewLow = () => {
  const nationalityOptions = [
    { value: "israeli", label: "ישראלית" },
    { value: "american", label: "אמריקאית" },
    { value: "european", label: "אירופאית" },
  ];

  const [values, setValues] = useState([0]); // Initialize with the default value
  const [selectedNationalities, setSelectedNationalities] = useState([]);

  const [loadfor, setLoadfor] = useState("");
  const [selectedBanks, setSelectedBanks] = useState([]);

  const [sliderValue, setSliderValue] = useState([50]);

  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const loginStatus = localStorage.getItem("login");
    const user = firebase.auth().currentUser;

    if (!user || loginStatus == null || loginStatus === false) {
      navigate("/sign-in"); // Redirect to login if not logged in
      return;
    }
    debugger;
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          newLow: {
            bank: selectedBanks,
            loadfor: loadfor,
            sliderValue: sliderValue,
            selectedNationalities: selectedNationalities,
          },
        });

      navigate("/new-low/custom-table");
    } catch (error) {
      console.error("Error updating user document:", error);
      // Handle error appropriately (e.g., show an error message)
    }
  };
  const openTermsPDF = () => {
    window.open(
      "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
      "_blank"
    );
  };
  return (
    <div className="new-low-container">
      {" "}
      <h1 className="font-weight-bold text-success">
        מעוניין לקחת משכנתא חדשה
      </h1>
      <h1>
        איפה הכי כדאי לקחת משכנתא? כמה כסף אני יכול לקחת? כמה עולה לי לקחת
      </h1>
      <Container
        className="new-page-container"
        style={{
          marginTop: "20px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Form onSubmit={handleSubmit} className="new-low-form">
          <Row>
            <Col md={6}>
              <Form.Group controlId="bank">
                <Form.Label>שם בנק בו מתנהל חשבונך </Form.Label>
                <MultiSelectCheckbox
                  setSelectedBanks={setSelectedBanks}
                  selectedBanks={selectedBanks}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="fullName">
                <Form.Group controlId="propertyType">
                  <Form.Label>אני מעוניין לקחת משכנתא עבור</Form.Label>
                  <Form.Control
                    as="select"
                    value={loadfor}
                    onChange={(e) => setLoadfor(e.target.value)}
                    required
                  >
                    <option value="" style={{}}>
                      לחץ כאן כדי לבחור
                    </option>
                    <option value="נכס חדש">נכס חדש</option>
                    <option value="נכס משופץ">נכס משופץ</option>
                    <option value="נכס בבניה">נכס בבניה</option>
                  </Form.Control>
                </Form.Group>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formSlider">
                <Form.Label
                  required
                  style={{
                    marginBottom: "27px",
                    marginTop: "20px",
                  }}
                >
                  כמה כסף אתה צריך להלוות? (באלפי ש"ח)
                </Form.Label>
                <Range
                  step={1}
                  min={0}
                  max={100}
                  values={values}
                  onChange={(values) => setValues(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "6px",
                        width: "100%",
                        backgroundColor: "#ccc",
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "20px",
                        borderRadius: "10px",
                        width: "20px",
                        backgroundColor: "#999",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-28px",
                          left: "-5px",
                          color: "#fff",
                          fontWeight: "bold",
                          borderRadius: "20px",
                          padding: "4px",

                          backgroundColor: "#548BF4",
                        }}
                      >
                        {values[0]}
                      </div>
                    </div>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formNationality">
                <Form.Label>אזרחות נוכחית</Form.Label>
                <Select
                  required
                  isMulti
                  options={nationalityOptions}
                  classNamePrefix="select"
                  placeholder="בחר אזרחות..."
                  value={selectedNationalities}
                  onChange={setSelectedNationalities}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      marginBottom: "10px",
                      border: "1px solid black",
                      boxShadow: "none",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      border: "1px solid black",
                    }),
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="formCheckbox">
                <Form.Check
                  type="switch"
                  style={{
                    fontSize: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  id="agree-to-terms-switch"
                  label="אני מסכים לתנאים המתוארים"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  required
                />
              </Form.Group>
              <a
                onClick={openTermsPDF}
                style={{ cursor: "pointer", color: "#007bff" }}
              >
                קרא את התקנון
              </a>
            </Col>
          </Row>
          <Button
            variant="primary"
            type="submit"
            style={{
              fontSize: "20px",
              padding: "10px 20px",
              marginTop: "20px",
              width: "30%",
            }}
          >
            חשב
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default NewLow;
