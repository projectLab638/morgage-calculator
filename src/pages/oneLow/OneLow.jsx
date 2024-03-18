import React from "react";
import { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import "./OneLow.css";
import MultiSelectCheckbox from "../../components/multiselect/MultiSelectCheckbox";

import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
const nationalityOptions = [
  { value: "israeli", label: "ישראלית" },
  { value: "american", label: "אמריקאית" },
  { value: "european", label: "אירופאית" },
];
const stepTitles = [
  "יש ליצור קשר עם הבנק",
  "נא לספק ת.ז, פרטי חשבון בנק, פרטים נוספים לפי הצורך",
  "יש לשלוח 3 משכורות אחרונות",
  "הכסף מתקבל בחשבון",
];

const OneLow = () => {
  const isAuthenticated = localStorage.getItem("login");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [selectedBanks, setSelectedBanks] = useState([]);

  const openTermsPDF = () => {
    window.open(
      "https://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
      "_blank"
    );
  };

  const [formValues, setFormValues] = useState({
    bankName: "",
    loanAmount: 0,
    payBackMethod: "",
    citizenship: [],
    acknowledge: false,
    agreement: false,
  });
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [showErrorLabel, setShowErrorLabel] = useState(false);
  const [values, setValues] = useState([0]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      setShowErrorLabel(true);
      return;
    }
    setButtonClicked(true);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormValues((prevValues) => ({ ...prevValues, [name]: newValue }));
  };

  const handleRangeChange = (values) => {
    setValues(values);
    setFormValues((prevValues) => ({ ...prevValues, loanAmount: values[0] }));
  };

  const handleNationalityChange = (selectedOptions) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      citizenship: selectedOptions.map((option) => option.value),
    }));
  };
  const renderGrid = () => {
    return (
      <Container
        className="new-page-container"
        style={{
          marginTop: "20px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <Form onSubmit={handleSubmit} className="new-low-form ">
          {/* Bank Name */}
          <Row>
            <Col xs={12} md={6}>
              <Form.Group controlId="bankName">
                <Form.Label>שם בנק בו מתנהל חשבונך</Form.Label>
                <MultiSelectCheckbox
                  setSelectedBanks={setSelectedBanks}
                  selectedBanks={selectedBanks}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              {/* Loan Amount */}
              <Form.Group controlId="loanAmount">
                <Form.Label>כמה כסף אתה מעוניין להלוות? (בש"ח)</Form.Label>
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
          </Row>

          <Row>
            <Col xs={12} md={6}>
              {/* Citizenship */}
              <Form.Group controlId="citizenship">
                <Form.Label>אזרחות נוכחית</Form.Label>
                <Select
                  isMulti
                  options={nationalityOptions}
                  classNamePrefix="select"
                  placeholder="בחר אזרחות..."
                  value={nationalityOptions.filter((option) =>
                    formValues.citizenship.includes(option.value)
                  )}
                  onChange={handleNationalityChange}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              {/* Payback Method */}
              <Form.Group controlId="payBackMethod">
                <Form.Label>בחר שיטת החזר רצוייה</Form.Label>
                <Form.Control
                  as="select"
                  style={{
                    borderRadius: "0",
                  }}
                  value={formValues.payBackMethod}
                  name="payBackMethod"
                  onChange={handleInputChange}
                  required
                >
                  <option value="">בחר...</option>
                  <option value="primeInterest">ריבית פריים</option>
                  <option value="fixedInterestLinked">
                    ריבית קבועה צמודה למדד
                  </option>
                  <option value="fixedInterestNotLinked">
                    ריבית קבוע לא צמודה
                  </option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>ההצעה היא רק לאומדן בלבד</Tooltip>}
              >
                <Form.Check
                  style={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  label="ידוע לי שההצעה היא רק לאומדן בלבד"
                  type="checkbox"
                  id="acknowledge"
                  name="acknowledge"
                  checked={formValues.acknowledge}
                  onChange={handleInputChange}
                />
              </OverlayTrigger>
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
    );
  };

  return (
    <Container className="pt-4 one_low">
      <h3>מעוניין לקחת הלוואה רגילה</h3>
      <h3>מעוניין לקחת הלוואה עד 100 אלף ש"ח</h3>
      <h1 className="font-weight-bold text-success">
        אני מעוניין לקחת הלוואה אחת
      </h1>
      {isButtonClicked ? renderAfterCalc() : renderGrid()}
      {showErrorLabel && (
        <Alert variant="danger">שגיאת חישוב: משתמש לא מחובר</Alert>
      )}
    </Container>
  );
};

const renderAfterCalc = () => {
  const Stepper = ({ currentStep }) => {
    return (
      <>
        {stepTitles.map((title, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div
              className={`step ${currentStep >= index + 1 ? "activeStep" : ""}`}
            >
              {index + 1}
            </div>
            <div className="stepTitle">{title}</div>
          </div>
        ))}
      </>
    );
  };
  const currentStep = 1; // This should represent the current step in your process

  return (
    <Container>
      <div className="stepperContainer">
        <Stepper currentStep={currentStep} />
      </div>
      <Row className="gridContainer">
        <Col></Col>
      </Row>
      <p>
        מחפש נותן שירות או צריך עזרה בתהליך?
        <a href="contact-us"> פנה אלינו לפרטים </a>
      </p>
      <p>עלויות משוערות</p>
      <p>פתיחת תיק: 1000 ש"ח</p>
      <p>עמלת ביצוע פעולה: 0.1%</p>
    </Container>
  );
};
export default OneLow;
