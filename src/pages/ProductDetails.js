import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import axios from "axios";
import Header from "../components/Header";

const ProductDetailPage = () => {
  const { carts } = useSelector((state) => state.allCart);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
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

  const handleAddToCart = () => {
    const newProduct = { ...product, qnty: quantity };
    dispatch(addToCart(newProduct));
    setCartItem(newProduct);
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <Row className="justify-content-center">
          {loading ? (
            <div className="d-flex justify-content-center align-items-center vh-75">
              <Spinner
                animation="border"
                role="status"
                style={{ width: "3rem", height: "3rem" }}
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
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
                      <Button variant="primary" disabled>
                        Item Added to Cart
                      </Button>
                    ) : (
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          >
                            -
                          </Button>
                          <span className="mx-2">{quantity}</span>
                          <Button
                            variant="outline-secondary"
                            onClick={() => setQuantity(quantity + 1)}
                          >
                            +
                          </Button>
                        </div>
                        <Button variant="primary" onClick={handleAddToCart}>
                          Add to Cart
                        </Button>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
      </div>
    </>
  );
};

export default ProductDetailPage;




// import React, { useEffect, useState } from "react";
// import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
// } from "../redux/features/cartSlice";
// import axios from "axios";
// import Header from "../components/Header";

// const ProductDetailPage = () => {
//   const { carts } = useSelector((state) => state.allCart);
//   const { id } = useParams();
//   const [product, setProduct] = useState({});
//   const [quantity,setQuantity]=useState(1);
//   const [cartItem, setCartItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     axios
//       .get(`https://food-app-backend-ko1k.onrender.com/items/${id}`)
//       .then((res) => {
//         setProduct(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });

//     const cartItem = carts.find((item) => item.id === Number(id));
//     setCartItem(cartItem);
//   }, [id, carts]);

//   const handleAddToCart = (product) => {
//     const newP = {...product, qnty:quantity };
//     dispatch(addToCart(product));
//   };
//   // const handleIncrement = (cartItem) => {
//   //   dispatch(increaseQuantity(cartItem));
//   // };
//   // const handleDecrement = (cartItem) => {
//   //   dispatch(decreaseQuantity(cartItem));
//   // };
//   // const handleDeleteItem = (id) => {
//   //   dispatch(removeFromCart(id));
//   // };

//   return (
//     <>
//       <Header />
//       <div className="container mt-5">
//         <Row className="justify-content-center">
//           {loading ? (
//             <div className="d-flex justify-content-center align-items-center vh-75">
//               <Spinner animation="border" role="status" style={{ width: "3rem", height: "3rem" }}>
//                 <span className="visually-hidden">Loading...</span>
//               </Spinner>
//             </div>
//           ) : (
//             <>
//               <Col md={6}>
//                 <Card className="shadow">
//                   <Card.Img variant="top" src={product.imgdata} />
//                 </Card>
//               </Col>
//               <Col md={6}>
//                 <Card className="shadow">
//                   <Card.Body>
//                     <Card.Title>{product.dish}</Card.Title>
//                     <Card.Text>{product.address}</Card.Text>
//                     <Card.Text>{product.somedata}</Card.Text>
//                     <Card.Text>Price: ₹{product.price}</Card.Text>
//                     <Card.Text>Rating: {product.rating}</Card.Text>
//                     {cartItem ? (
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                           <Button
//                             variant="outline-secondary"
//                             onClick={
//                               cartItem.qnty <= 1
//                                 ? () => handleDeleteItem(cartItem.id)
//                                 : () => handleDecrement(cartItem)
//                             }
//                           >
//                             -
//                           </Button>
//                           <span className="mx-2">{cartItem.qnty}</span>
//                           <Button
//                             variant="outline-secondary"
//                             onClick={() => handleIncrement(cartItem)}
//                           >
//                             +
//                           </Button>
//                         </div>
//                         <Button
//                           variant="primary"
//                           onClick={() => handleAddToCart(product)}
//                         >
//                           Add to Cart
//                         </Button>
//                       </div>
//                     ) : (
//                       <Button
//                         variant="primary"
//                         onClick={() => handleAddToCart(product)}
//                       >
//                         Add to Cart
//                       </Button>
//                     )}
//                   </Card.Body>
//                 </Card>
//               </Col>
//             </>
//           )}
//         </Row>
//       </div>
//     </>
//   );
// };

// export default ProductDetailPage;
