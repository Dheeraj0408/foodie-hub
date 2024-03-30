import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/features/cartSlice";
import Header from "../components/Header";

const ProductDetailPage = () => {
  const { items } = useSelector((state) => state.productData);
  const { carts } = useSelector((state) => state.allCart);
  console.log(carts)
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cartItem, setCartItem] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const product = items.find((item) => item.id === Number(id));
    setProduct(product);
    console.log(product)
    const cartItem = carts.find((item) => item.id === Number(id));
    setCartItem(cartItem);
    console.log(cartItem)
  }, [id, items, carts]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleIncrement = (cartItem) => {
    dispatch(increaseQuantity(cartItem));
  };
  const handleDecrement = (cartItem) => {
    dispatch(decreaseQuantity(cartItem));
  };
  const handleDeleteItem=(id)=>{
    dispatch(removeFromCart(id))
  }
  return (
    <>
      <Header />
      <div className="container mt-5">
        <Row>
          <Col md={6}>
            <Card className="shadow">
              <Card.Img variant="top" src={product.imgdata} />
            </Card>
          </Col>
          <Col md={6}>
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
                        onClick={cartItem.qnty<=1?()=>handleDeleteItem(cartItem.id):() => handleDecrement(cartItem)}
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
                  <Button variant="primary" onClick={()=>handleAddToCart(product)}>Add to Cart</Button>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductDetailPage;
