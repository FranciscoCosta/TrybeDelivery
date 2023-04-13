/* eslint-disable no-unused-vars */
/* eslint-disable react-func/max-lines-per-function */
/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { BsPersonFillUp } from 'react-icons/bs';
import { MdOutlinePointOfSale } from 'react-icons/md';
import { TbBottle } from 'react-icons/tb';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import PieChart from '../../Components/PieChart/PieChart';
import BarChart from '../../Components/BarChart/BarChart';

import Navbar from '../../Components/Navbar';
import './Dashboard.scss';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalSellers, setTotalSellers] = useState(null);
  const [totalSales, setTotalSales] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [mostSold, setMostSold] = useState([]);
  const [ChartData, setChartData] = useState([]);
  const [ChartDataR, setChartDataR] = useState([]);
  const [ChartDataSeller, setChartDataSeller] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDasboard = async () => {
    const users = await axios.get('http://localhost:3001/admin/users');
    setTotalUsers(users.data);
    const sellers = await axios.get('http://localhost:3001/admin/sellers');
    setTotalSellers(sellers.data);
    const sales = await axios.get('http://localhost:3001/admin/sales');
    setTotalSales(sales.data);
    const products = await axios.get('http://localhost:3001/admin/products');
    setTotalProducts(products.data);
  };

  const fetchMostSold = async () => {
    try {
      const getMostSold = await axios.get('http://localhost:3001/mostsold');
      const bestSellers = getMostSold.data;
      const items = bestSellers.map(async (product) => {
        try {
          const getProducts = await axios.get(
            `http://localhost:3001/products/${product.product_id}`,
          );
          const productInfo = {
            ...getProducts.data,
            quantity: product.TotalQuantity,
          };
          return productInfo;
        } catch (error) {
          console.log(error);
        }
      });
      const bestSellersItem = await Promise.all(items);
      setMostSold(bestSellersItem);

      const labelsMostSoldT = bestSellersItem.map((product) => {
        const { name } = product;
        return name;
      });
      const dataMostSoldT = bestSellersItem.map((product) => {
        const { quantity } = product;
        return Number(quantity);
      });

      const dataMostR = bestSellersItem.map((product) => {
        const { price, quantity } = product;
        return [Number(price) * Number(quantity), product.name];
      });

      const chartDataR = {
        labels: dataMostR.map((product) => product[1]),
        datasets: [
          {
            label: 'Top 10 produtos mais rantaveis (R$)',
            data: dataMostR.map((product) => product[0]),
            backgroundColor: [
              'rgb(255, 99, 132)', // a bright pink-red color
              'rgb(54, 162, 235)', // a deep blue color
              'rgb(255, 205, 86)', // a bright yellow color
              'rgb(75, 192, 192)', // a teal green color
              'rgb(153, 102, 255)', // a purple color
              'rgb(255, 159, 64)', // an orange color
              'rgb(255, 0, 0)', // a bright red color
              'rgb(0, 255, 0)', // a bright green color
              'rgb(0, 0, 255)', // a deep blue color
              'rgb(128, 128, 128)', // a medium gray color
            ],
            hoverOffset: 4,
          },
        ],
      };
      const chartData = {
        labels: labelsMostSoldT,
        datasets: [
          {
            label: 'Top 10 produtos mais vendidos (unidades)',
            data: dataMostSoldT,
            backgroundColor: [
              'rgb(255, 99, 132)', // a bright pink-red color
              'rgb(54, 162, 235)', // a deep blue color
              'rgb(255, 205, 86)', // a bright yellow color
              'rgb(75, 192, 192)', // a teal green color
              'rgb(153, 102, 255)', // a purple color
              'rgb(255, 159, 64)', // an orange color
              'rgb(255, 0, 0)', // a bright red color
              'rgb(0, 255, 0)', // a bright green color
              'rgb(0, 0, 255)', // a deep blue color
              'rgb(128, 128, 128)', // a medium gray color
            ],
            hoverOffset: 4,
          },
        ],
      };
      setChartDataR(chartDataR);
      setChartData(chartData);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBestSellers = async () => {
    try {
      const getBestSellers = await axios.get('http://localhost:3001/admin/sellers/price');
      const bestSellers = getBestSellers.data;
      const Sellers = await bestSellers.map(async (seller) => {
        const { name, total } = seller;
        return { name, total };
      });
      const bestSellersItem = await Promise.all(Sellers);
      const chartDataSeller = {
        labels: bestSellersItem.map((seller) => seller.name),
        datasets: [
          {
            label: 'Top 5 vendedores mais rentaveis (R$)',
            data: bestSellersItem.map((seller) => seller.total),
            backgroundColor: [
              'rgb(255, 99, 132)', // a bright pink-red color
              'rgb(54, 162, 235)', // a deep blue color
              'rgb(255, 205, 86)', // a bright yellow color
              'rgb(75, 192, 192)', // a teal green color
              'rgb(153, 102, 255)', // a purple color
              'rgb(255, 159, 64)', // an orange color
              'rgb(255, 0, 0)', // a bright red color
              'rgb(0, 255, 0)', // a bright green color
              'rgb(0, 0, 255)', // a deep blue color
              'rgb(128, 128, 128)', // a medium gray color
            ],
            hoverOffset: 4,
          },
        ],
      };
      setChartDataSeller(chartDataSeller);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDasboard();
    fetchMostSold();
    fetchBestSellers();
  }, []);

  return (
    <main className="Dashboard">
      <Navbar />
      {isLoading ? (
        '...'
      ) : (
        <section className="Dashboard__container">
          <h3>Painel de administrador</h3>
          <div className="Dashboard__stats">
            <div className="Stats__container">
              <h4>
                <BsPersonFillUp size={ 40 } />
                Total de clientes
              </h4>
              <p>
                <span>{totalUsers}</span>
                {' '}
                usuários.
              </p>
            </div>
            <div className="Stats__container">
              <h4>
                <BsPersonFillUp size={ 40 } />
                Total de vendedores
              </h4>
              <p>
                <span>{totalSellers}</span>
                {' '}
                vendedores.
              </p>
            </div>
            <div className="Stats__container">
              <h4>
                <MdOutlinePointOfSale size={ 40 } />
                Total de vendas
              </h4>
              <p>
                <span>{totalSales}</span>
                {' '}
                vendas.
              </p>
            </div>
            <div className="Stats__container">
              <h4>
                <TbBottle size={ 40 } />
                Total de produtos
              </h4>
              <p>
                <span>{totalProducts}</span>
                {' '}
                produtos.
              </p>
            </div>
          </div>

          <h3>Gráfico de vendas produtos:</h3>
          <div className="Dashboard__chart">
            <div className="Dashboard__chart-container">
              <h1>Top 10 Produtos mais vendidos:</h1>
              <PieChart chartData={ ChartData } />
            </div>
            <div className="Dashboard__chart-container">
              <h1>Top 10 Produtos mais rentaveis :</h1>
              <PieChart chartData={ ChartDataR } />
            </div>
          </div>
          <h3>Grafico de vendedores:</h3>
          <div className="Dashboard__chart">
            <div className="Dashboard__chart-container">
              <div className="Dashboard__chart-container-seller">
                <h1>Top 5 vendedores:</h1>
                <BarChart chartData={ ChartDataSeller } />
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default Dashboard;
