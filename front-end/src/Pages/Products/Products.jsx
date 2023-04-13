import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Carousel from 'react-multi-carousel';
import { FaFilter, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Card from '../../Components/Card';
import Navbar from '../../Components/Navbar';
import ShoppingCart from '../../Components/ShoppingCart';
import './Products.scss';
import Loading from '../../Components/Loading/Loading';
import 'react-multi-carousel/lib/styles.css';
import Footer from '../../Components/Footer/Footer';
import { Context } from '../../Context/Context';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mostSold, setMostSold] = useState([]);
  const { getTotalPriceFromCart } = useContext(Context);
  const [showfilter, setshowfilter] = useState(false);
  const [productsOriginal, setProductsOriginal] = useState([]);
  const fetchProducts = async () => {
    try {
      const getProducts = await axios.get('http://localhost:3001/products');
      console.log(getProducts.data);
      setProducts(getProducts.data);
      setProductsOriginal(getProducts.data);
      console.log(getProducts.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMostSold = async () => {
    try {
      const getMostSold = await axios.get('http://localhost:3001/mostsold');
      console.log(getMostSold.data);
      const bestSellers = getMostSold.data;
      const items = bestSellers.map(async (product) => {
        try {
          const getProducts = await axios.get(`http://localhost:3001/products/${product.product_id}`);
          const productInfo = { ...getProducts.data, quantity: product.TotalQuantity };
          return productInfo;
        } catch (error) {
          console.log(error);
        }
      });
      const bestSellersItem = await Promise.all(items);
      setMostSold(bestSellersItem);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalPriceFromCart();
    fetchMostSold();
    fetchProducts();
  }, []);

  useEffect(() => {
  }, [products]);

  const handleFilterByPrice = (order) => {
    let sortedProducts = [];
    if (order === 'up') {
      sortedProducts = [...products].sort((a, b) => a.price - b.price);
    } else {
      sortedProducts = [...products].sort((a, b) => b.price - a.price);
    }
    setProducts(sortedProducts);
  };

  const handleFilterByName = (name) => {
    const filteredProducts = productsOriginal.filter(
      (product) => product.name.toLowerCase().includes(name.toLowerCase()),
    );
    setProducts(filteredProducts);
  };

  return (
    <div className="Products">
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="Products__container">

          <div className="Products__slider">
            <h1>Mais Vendidos:</h1>
            <Carousel
              ssr
              infinite
              autoPlay
              autoPlaySpeed={ 2000 }
              arrows={ false }
              showDots
              keyBoardControl
              customTransition="all 1.5s ease-in-out"
              transitionDuration={ 1500 }
              containerClass="carousel-container"
              removeArrowOnDeviceType={ ['tablet', 'mobile'] }
              responsive={ responsive }
              className="Products__mostSold"
            >
              {mostSold.map((item) => (
                <div className="Carrousel__card" key={ item.id }>
                  <h3>{item.name}</h3>
                  <img src={ item.urlImage } alt="item-img" />
                  <p>
                    R$:
                    {' '}
                    {item.price}
                  </p>
                </div>
              ))}
            </Carousel>

          </div>
          <h1>Os nossos Produtos: </h1>

          <div className="Product__filters">
            <button
              onClick={ () => setshowfilter(!showfilter) }
            >
              <FaFilter />

            </button>
            <div
              className="Product__filter-container"
              style={ { display: showfilter ? 'flex' : 'none' } }
            >
              <div className="Filter__name">
                <h4>Nome: </h4>
                <input
                  placeholder="Filtrar por nome"
                  type="text"
                  onChange={ (e) => handleFilterByName(e.target.value) }
                />
              </div>
              <div className="Filter__byPrice">
                <h4>Preço:</h4>
                <div className="Filter__updown">
                  <button
                    onClick={ () => handleFilterByPrice('up') }
                  >
                    <FaArrowUp />

                  </button>
                  <button
                    onClick={ () => handleFilterByPrice('down') }
                  >
                    <FaArrowDown />

                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="Products__container-total">
            {products.map((product) => (
              <Card card={ product } key={ product.item } className="card" />
            ))}
            <ShoppingCart />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Products;
