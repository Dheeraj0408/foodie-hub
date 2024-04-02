import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/features/cartSlice";
import axios from "axios";
import Header from "../components/Header";

const ProductDetailPage = () => {
  const { carts } = useSelector((state) => state.allCart);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cartItem, setCartItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`https://food-app-backend-ko1k.onrender.com/items/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    const cartItem = carts.find((item) => item.id === Number(id));
    setCartItem(cartItem);
  }, [id, carts]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleIncrement = (cartItem) => {
    dispatch(increaseQuantity(cartItem));
  };
  const handleDecrement = (cartItem) => {
    dispatch(decreaseQuantity(cartItem));
  };
  const handleDeleteItem = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            {loading ? (
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <Card className="shadow">
                <Card.Img variant="top" src={product.imgdata} />
              </Card>
            )}
          </Col>
          <Col md={6}>
            {loading ? null : (
              <Card className="shadow">
                <Card.Body>
                  <Card.Title>{product.dish}</Card.Title>
                  <Card.Text>{product.address}</Card.Text>
                  <Card.Text>{product.somedata}</Card.Text>
                  <Card.Text>Price: ₹{product.price}</Card.Text>
                  <Card.Text>Rating: {product.rating}</Card.Text>
                  {cartItem ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Button
                          variant="outline-secondary"
                          onClick={
                            cartItem.qnty <= 1
                              ? () => handleDeleteItem(cartItem.id)
                              : () => handleDecrement(cartItem)
                          }
                        >
                          -
                        </Button>
                        <span className="mx-2">{cartItem.qnty}</span>
                        <Button
                          variant="outline-secondary"
                          onClick={() => handleIncrement(cartItem)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductDetailPage;
