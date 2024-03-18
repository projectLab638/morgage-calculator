import React from "react";
import { useState, useEffect } from "react";
import { Range, getTrackBackground } from "react-range";
import Select from "react-select";
import "../oneLow/OneLow.css";
import { useNavigate } from "react-router-dom";
import "../oneLow/OneLow";
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
  "הגשת בקשה פרטנית בבנק",
  "הבנק בודק את הבקשה ",
  "החלטה של הבנק האם לאשר הלוואה פרטנית",
];

const FewLow = () => {
  const isAuthenticated = localStorage.getItem("login");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [selectedBanks, setSelectedBanks] = useState([]);

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
    <Container className="one_low">
      <div
        style={{
          padding: "20px",
        }}
      >
        <h3>מעוניין לקחת הלוואה רגילה</h3>
        <h3>מעוניין לקחת הלוואה עד 100 אלף ש"ח</h3>
        <h1 className="font-weight-bold text-success">
          אני מעוניין לקחת כמה הלוואות{" "}
        </h1>
      </div>
      <div>
        <h3
          style={{
            padding: "20px",
            color: "red",
          }}
        >
          אין לך אפשרות לקחת כמה הלוואות עבור סכום הקטן מ 100 אלף ש"ח
        </h3>
        <h2>אופציות אחרות </h2>
      </div>
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
      <p>פתיחת תיק: 500 ש"ח</p>
    </Container>
  );
};

export default FewLow;
