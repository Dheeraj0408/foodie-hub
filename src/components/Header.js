// Header.js
import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Form, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredData } from "../redux/features/fetchDataSlice";
import styles from "../css/header.module.css";

const Header = ({ searchQuery, onSearchChange }) => {
  const { carts } = useSelector((state) => state.allCart);
  const location = useLocation();
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    dispatch(setFilteredData(filterValue));
  };

  return (
    <Navbar className={`bg-dark ${styles.navbar}`}>
      <Container>
        <Navbar.Brand href="/">
          <h4 className={`text-light mt-1  ${styles.header_heading}`}>Foodie&nbsp;Hub</h4>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          {location.pathname === "/" && (
            <Form className={`d-flex flex-grow-1 align-items-center justify-content-center`}>
              <Form.Label htmlFor="searchInput" visuallyHidden>
                Search
              </Form.Label>
              <Form.Control
                id="searchInput"
                type="search"
                placeholder="Search"
                className={`me-2 ms-auto ${styles.searchBar}`} // Add ms-auto for margin-left
                aria-label="Search"
                value={searchQuery}
                onChange={onSearchChange}
                style={{ width: "30%" }} 
              />
              <Form.Select
                className={`text-dark me-2 ${styles.dropDown}`}
                aria-label="Filter"
                onChange={handleFilterChange}
                style={{ width: "15%" }} 
              >
                <option className={styles.opt1}>Filter By</option>
                <optgroup label="Price">
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                </optgroup>
                <optgroup label="Rating">
                  <option value="ratingLowToHigh">Rating: Low to High</option>
                  <option value="ratingHighToLow">Rating: High to Low</option>
                </optgroup>
              </Form.Select>
            </Form>
          )}
          <Nav className="ms-auto">
            <NavLink
              to={"/cart"}
              className="text-decoration-none mx-2 text-light"
            >
              <div className={styles.cartIcon}>
                <div
                  className={`text-light ${styles.badge} bg-danger`}
                  style={{ fontSize: "11px" }}
                >
                  {carts.length}
                </div>
                <span className="text-light fa-2x fa-stack">
                  <i className="fas fa-shopping-cart fa-stack-1x"></i>
                </span>
              </div>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
