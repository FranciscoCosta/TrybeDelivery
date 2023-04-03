import React,{useState, useEffect} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.scss';
import Logo from '../assets/Logo.png'
import { FaBeer, FaUser } from 'react-icons/fa';
import { HiHome, HiShoppingCart } from 'react-icons/hi';




function Navbar() {
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location.pathname === "/customer/products")

  const [navbarActive, setnavbarActive] = useState(false);
  const handleLougout = () => {
    localStorage.removeItem('user');
    navigate('/login');
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


  const currentUser = JSON.parse(localStorage.getItem('user'));
  return (
    <nav className={!navbarActive ? "Navbar" : "Navbar active"}>
      <div className="Navbar__container" >
        <div className="Navbar__left">
          <img src={Logo} alt="TrybeDeliveryLogo" />
        </div>
        <div className="Navbar__right">
        {currentUser.role === 'customer' && (
          <button
            type="button"
            onClick={ () => navigate('/customer/products') }
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </button>
        )}
        {currentUser.role === 'customer' ? (
          <button
            type="button"
            onClick={ () => navigate('/customer/orders') }
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </button>
        ) : (
          <button
            type="button"
            onClick={ () => navigate('/seller/orders') }
            data-testid="customer_products__element-navbar-link-orders"
          >
            Meus Pedidos
          </button>
        )}
        <h4 data-testid="customer_products__element-navbar-user-full-name">
          {currentUser ? currentUser.name : 'Nome do Usuário'}
        </h4>
        <button
          type="button"
          onClick={ handleLougout }
          data-testid="customer_products__element-navbar-link-logout"
        >
          Sair
        </button>
      </div>
      </div>
      <div className='Navbar__mobile'>
          <FaBeer 
          onClick={()=> navigate('/customer/products')}
          />
          <HiHome onClick={()=> navigate('/login')}/>
          <HiShoppingCart />
          <FaUser/>
      </div>
    </nav>
  );
}

export default Navbar;
