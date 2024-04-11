import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../css/footer.module.css";
const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <Row className="py-3">
            <Col xs={12} md={6} className="text-center text-md-start">
              <h5 className={styles.footerHeading}>Foodie Hub</h5>
              <p className={styles.footerText}>Your go-to place for delicious food !</p>
            </Col>
            <Col xs={12} md={6} className="text-center text-md-end">
              <ul className={styles.footerLinks}>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
            <Col className="text-center">
               <p className={styles.footerCopy}>&copy; {new Date().getFullYear()} Foodie Hub. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
