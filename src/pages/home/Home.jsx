import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Carousel } from "react-bootstrap"; // Import Carousel component from react-bootstrap
import image1 from "../../assets/image1.jpeg"; // Import image1.jpg
import image2 from "../../assets/image2.jpeg"; // Import image2.jpg
import "./Home.css"; // Import Home.css
const Home = () => {
  const captionStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    color: "white",
    padding: "10px",
    borderRadius: "5px",
  };
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block " src={image1} alt="First slide" />
        <Carousel.Caption style={captionStyle}>
          <h3>הלוואות עד 100,000 ש"ח</h3>
          <p>מצא את התנאים המועדפים עבורך להלוואות בסכומים גבוהים יותר.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block " src={image2} alt="Second slide" />
        <Carousel.Caption style={captionStyle}>
          <h3>הלוואות לעסקים</h3>
          <p>פתרונות מימון מותאמים אישית לעסק שלך.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Home;
