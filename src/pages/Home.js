import React, { useEffect, useState } from "react";
import { CardImg, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Header from "../components/Header";
import styles from "../css/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCartFromHome } from "../redux/features/cartSlice";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../redux/features/fetchDataSlice";
import Footer from "../components/Footer";

const Home = () => {
  const { isLoading, data, filteredData } = useSelector((state) => state.fetchData);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleNavigation = (id) => {
    navigate(`/productDetail/${id}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const send = (item) => {
    dispatch(addToCartFromHome(item));
    toast.success("Item Added In Your Cart");
  };

  let searchedItems = [];
  if (filteredData.length > 0) {
    searchedItems = filteredData.filter((item) =>
      item.dish.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else {
    searchedItems = data.filter((item) =>
      item.dish.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <Toaster />
      <section className="container mt-4">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "65vh" }}>
            <div className={styles.customSpinner}></div>
          </div>
        ) : (
          <div className="d-flex justify-content-around align-items-center row mt-2">
            {searchedItems.length > 0 ? (
              searchedItems.map((item) => (
                <React.Fragment key={item.id}>
                  <Card style={{ width: "18rem" }} className={`mb-4 ${styles.hove}`} border="dark">
                    <CardImg
                      src={item.imgdata}
                      variant="top"
                      className={styles.cardImage}
                      onClick={() => handleNavigation(item.id)}
                    />
                    <div className="p-4">
                      <div onClick={() => handleNavigation(item.id)}>
                        <div className={`d-flex justify-content-between align-items-center ${styles.upperData}`}>
                          <h4 className="mt-2 fs-6" style={{ maxWidth: "12rem", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{item.dish}</h4>
                          <span>{item.rating}&nbsp;★</span>
                        </div>
                        <div className={`d-flex justify-content-between align-items-center ${styles.lowerData}`}>
                          <h5 className="text-success">{item.address}</h5>
                          <span>₹{item.price}</span>
                        </div>
                      </div>
                      <div className={styles.extra}></div>
                      <div className={`${styles.lastData} d-flex justify-content-between align-items-center mb-3`}>
                        <img src={item.delimg} className={styles.limg} />
                        <Button className="bg-danger border-none" variant="outline-light" onClick={() => send(item)}>Add to Cart</Button>
                        <img src={item.arrimg} className={styles.laimg} />
                      </div>
                    </div>
                  </Card>
                </React.Fragment>
              ))
            ) : (
              <div className="col text-center">
                <h1 className="text-muted mt-5">No items found.</h1>
              </div>
            )}
          </div>
        )}
      </section>
      <Footer/>
    </>
  );
};

export default Home;
