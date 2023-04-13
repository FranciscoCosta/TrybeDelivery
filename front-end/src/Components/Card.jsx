import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../Context/Context";
import "./Card.scss";
import { GrFormClose } from "react-icons/gr";
import { motion } from "framer-motion";

function Card({ card }) {
  const [quantity, setquantity] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { setUpdate, update, getTotalPriceFromCart } = useContext(Context);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("carrinho")) || [];
    const index = cart.findIndex((item) => +item.productId === card.id);
    if (index >= 0) {
      setquantity(cart[index].quantity);
    } else {
      setquantity(0);
    }
  });
  const handleInput = ({ target: { id, value, name } }) => {
    if (+value < 0) {
      setquantity(0);
    } else {
      setquantity(+value);
    }
    const cart = JSON.parse(localStorage.getItem("carrinho"));
    const index = cart.findIndex((item) => item.productId === id);
    if (index < 0) {
      const newItem = {
        productId: id,
        name,
        quantity: +value,
        unitPrice: +card.price,
      };
      cart.push(newItem);
    } else {
      cart[index].quantity = +value;
    }
    localStorage.setItem("carrinho", JSON.stringify(cart));
    setquantity();
    setUpdate(!update);
    getTotalPriceFromCart();
  };

  const handleAddProduct = ({ target: { id, name } }) => {
    const cart = JSON.parse(localStorage.getItem("carrinho"));
    const index = cart.findIndex((item) => item.productId === id);
    if (index < 0) {
      const newItem = {
        productId: id,
        name,
        quantity: 1,
        unitPrice: +card.price,
      };
      cart.push(newItem);
    } else {
      cart[index].quantity = Number(cart[index].quantity) + Number(1);
    }
    localStorage.setItem("carrinho", JSON.stringify(cart));
    setquantity();
    setUpdate(!update);
    getTotalPriceFromCart();
  };

  const handleRemoveProduct = ({ target: { id } }) => {
    const cart = JSON.parse(localStorage.getItem("carrinho"));
    const index = cart.findIndex((item) => item.productId === id);
    if (index >= 0 && cart[index].quantity > 0) {
      cart[index].quantity -= Number(1);
    }
    localStorage.setItem("carrinho", JSON.stringify(cart));
    setquantity();
    setUpdate(!update);
    getTotalPriceFromCart();
  };

  return (
    <motion.div
    className="Card"
    whileInView={{ scale: [0, 1] }}
    transition={{ duration: 0.25 }}
    >
      <div
        className="Card__modal"
        style={{ display: showModal ? "flex" : "none" }}
      >
        <div className="Card__modal__container">
          <button
            className="Card__modal__container__close"
            onClick={() => setShowModal(!showModal)}
          >
            <GrFormClose />
          </button>
          <div className="Card__modal__container__top">
            <h1>{card.name}</h1>
          </div>
          <div className="Card__modal__container__down">
            <div className="Card__down-left">
              <img src={card.urlImage} alt={card.name} />
              <div className="Card__info">
              <h2>Quantidade:</h2>
              <p>{card.volume}</p>
              <h2>Teor de álcool:</h2>
              <p>{card.alcoholContent}</p>
              <h2>Temperatura Ideal:</h2>
              <p>{card.idealTemperature}</p>
              <h2>Preço:</h2>
              <p>R${card.price}</p>
              </div>
            </div>
            <div className="Card__down-right">
              <h2>Descrição:</h2>
              <p>{card.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="Card__container">
        <div className="Card__container__top">
          <p data-testid={`customer_products__element-card-price-${card.id}`}>
            R${card.price.replace(/\./g, ",")}
          </p>
          <img
            data-testid={`customer_products__img-card-bg-image-${card.id}`}
            src={card.urlImage}
            alt={card.name}
            onClick={() => setShowModal(!showModal)}
            style={{ width: "100px" }}
          />
        </div>
        <div className="Card__container__down">
          <h2
            data-testid={`customer_products__element-card-title-${card.id}`}
            className="Card__title"
          >
            {card.name}
          </h2>
          <div className="Card__container-buttons">
            <button
              name={card.name}
              type="button"
              className="Card__button-minus"
              data-testid={`customer_products__button-card-rm-item-${card.id}`}
              id={card.id}
              onClick={handleRemoveProduct}
            >
              -
            </button>
            <input
              className="Card__quantity-input"
              data-testid={`customer_products__input-card-quantity-${card.id}`}
              type="number"
              min={0}
              id={card.id}
              name={card.name}
              value={+quantity}
              onChange={handleInput}
              placeholder="0"
            />
            <button
              className="Card__button-plus"
              type="button"
              data-testid={`customer_products__button-card-add-item-${card.id}`}
              id={card.id}
              onClick={handleAddProduct}
              price={card.price}
              name={card.name}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
}.isRequired;

export default Card;
