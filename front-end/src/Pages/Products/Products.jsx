import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Card from '../../Components/Card';
import Navbar from '../../Components/Navbar';
import ShoppingCart from '../../Components/ShoppingCart';
import './Products.scss';
import Loading from '../../Components/Loading/Loading';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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
  const fetchProducts = async () => {
    try {
      const getProducts = await axios.get('http://localhost:3001/products');
      setProducts(getProducts.data);
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
      const bestSellers = getMostSold.data
      const items = bestSellers.map(async(product) => {
        try{
          const getProducts = await axios.get(`http://localhost:3001/products/${product.product_id}`);
          const productInfo = {...getProducts.data, quantity: product.TotalQuantity}
          return productInfo
        } catch (error) {
          console.log(error);
        }
      })
      const products = await Promise.all(items)
      setMostSold(products)

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalPriceFromCart();
    fetchMostSold();
    fetchProducts();
  }, []);

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
              ssr={true}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={2000}
              arrows={false}
              showDots={true}
              keyBoardControl={true}
              customTransition="all 1.5s ease-in-out"
              transitionDuration={1500}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile"]}
            responsive={responsive} className="Products__mostSold">
              {mostSold.map((item) => (
                <div className="Carrousel__card" key={item.id}>
                  <h3>{item.name}</h3>
                  <img src={item.urlImage} alt="item-img" />
                  <p>R$: {item.price}</p>
                </div>
              ))}
            </Carousel>

          </div>
          <h1>Os nossos Produtos: </h1>
          <div className='Products__container-total'>
          {products.map((product) => (
            <Card card={ product } key={ product.item }  className="card"/>
          ))}
          <ShoppingCart />
          </div>
        </div>
      )}
    <Footer/>
    </div>
  );
}

export default Products;
