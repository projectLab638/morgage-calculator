import React from "react";
import { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";

const bankOptions = [
  { label: 'בנק דיסקונט לישראל בע"מ - 11001', value: "11001" },
  { label: 'בנק הפועלים בע"מ - 12001', value: "12001" },
  { label: 'בנק "יהב" לעובדי המדינה בע"מ - 4001', value: "4001" },
  { label: 'בנק ירושלים בע"מ - 54001', value: "54001" },
  { label: 'בנק לאומי לישראל בע"מ - 10001', value: "10001" },
  { label: 'וואן זירו הבנק הדיגיטלי בע"מ - 18001', value: "18001" },
  { label: 'בנק מזרחי טפחות בע"מ - 20001', value: "20001" },
  { label: 'בנק מסד בע"מ - 46001', value: "46001" },
  { label: 'בנק מרכנתיל דיסקונט בע"מ - 17001', value: "17001" },
  { label: 'הבנק הבינלאומי הראשון לישראל בע"מ - 31001', value: "31001" },
];
const MultiSelectCheckbox = ({ selectedBanks, setSelectedBanks }) => {
  const handleChange = (selectedOptions) => {
    setSelectedBanks(selectedOptions || []);
  };

  return (
    <>
      <CreatableSelect
        isClearable
        isMulti // Allows multiple selections
        options={bankOptions}
        onChange={handleChange} // Handle selection changes
        value={selectedBanks} // Current selection
        placeholder="לחץ כאן כדי לבחור"
      />
    </>
  );
};

export default MultiSelectCheckbox;
