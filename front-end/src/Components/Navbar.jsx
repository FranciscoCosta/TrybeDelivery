import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.scss";
import Logo from "../assets/Logo.png";
import { FaBeer, FaUser, FaReceipt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import beer_light from "../assets/beer_light.png";
import beer_dark from "../assets/beer_dark.png";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location.pathname === "/customer/products")
  const [isOn, setisOn] = useState(false);

  const toogleTheme=()=>{
    setisOn(!isOn)
    if(isOn){
      document.querySelector("html").classList.remove('dark-mode')
    }
    else{ 
      document.querySelector("html").classList.add('dark-mode')
    }
  }

  const [navbarActive, setnavbarActive] = useState(false);
  const handleLougout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isScrolled = () => {
    window.scrollY > 0 ? setnavbarActive(true) : setnavbarActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isScrolled);
    return () => {
      window.addEventListener("scroll", isScrolled);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  return (
    <nav className={!navbarActive ? "Navbar" : "Navbar active"}>
      <div className="Navbar__container">
        <div className="Navbar__left">
          <img src={Logo} alt="TrybeDeliveryLogo" />
          {/* <motion.div
        className="Navbar__theme"
        onClick={() => toogleTheme()}
        transition={{ duration: 0.5 }}
        style={{
          background: isOn
            ? "linear-gradient(50deg, rgba(237,242,248,1) 15%, rgba(107,118,136,1) 86%)"
            : "linear-gradient(310deg, rgba(237,242,248,1) 15%, rgba(107,118,136,1) 86%)",
        }}
      >
        <motion.img
          src={isOn ? beer_light : beer_dark}
          key={isOn ? "beer" : "drink"}
          animate={{ x: isOn ? 0 : 55, opacity: 1 }}
          transition={{ duration: 0.2 }}
        ></motion.img>
      </motion.div> */}
        </div>
        <div className="Navbar__right">
          {currentUser.role === "customer" && (
            <button
              type="button"
              onClick={() => navigate("/customer/products")}
              data-testid="customer_products__element-navbar-link-products"
            >
              Produtos
            </button>
          )}
          {currentUser.role === "customer" ? (
            <button
              type="button"
              onClick={() => navigate("/customer/orders")}
              data-testid="customer_products__element-navbar-link-orders"
            >
              Meus Pedidos
            </button>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/seller/orders")}
              data-testid="customer_products__element-navbar-link-orders"
            >
              Meus Pedidos
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            data-testid="customer_products__element-navbar-user-full-name"
          >
            {currentUser ? currentUser.name : "Nome do Usuário"}
          </button>
          <button
            type="button"
            onClick={handleLougout}
            data-testid="customer_products__element-navbar-link-logout"
          >
            Sair
          </button>
        </div>
      </div>
      <div className="Navbar__mobile">
        {currentUser.role === "customer" && (
          <FaBeer onClick={() => navigate("/customer/products")} />
        )}
        <HiHome onClick={() => navigate("/login")} />
        {currentUser.role === "customer" ? (
          <FaReceipt onClick={() => navigate("/customer/orders")}/>
        ) : (
          <FaReceipt onClick={() => navigate("/seller/orders")} />
        )}
        <FaUser onClick={() => navigate("/profile")} />
      </div>
    </nav>
  );
}

export default Navbar;
