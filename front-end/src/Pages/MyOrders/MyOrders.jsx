import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Loading from '../../Components/Loading/Loading';
import './MyOrders.scss';

function MyOrders() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('userID'));
  const [orders, setOrders] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchSales = async () => {
    const response = await axios.post(
      'http://localhost:3001/salesGet',
      { userId },
    );
    console.log(response);
    setOrders(response.data.sales);
    setisLoading(false);
  };
  function formatDate(param) {
    const date = new Date(param);
    return date.toLocaleDateString('pt-br');
  }
  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="MyOrders">
      <Navbar />
      {isLoading ? 
        <Loading />
       : (
        <div className="MyOrders__container">
          <h1>Seus pedidos</h1>
          {orders.map === []
            ? 'Você não tem pedidos'
            : 
            
            <div className='Orders__container-cards'>
            {orders.map((order) => (
              <div
                onKeyDown={ (e) => {
                  if (e.key === 'Enter') {
                    console.log('Enter key pressed!');
                  }
                } }
                role="button"
                tabIndex="0"
                onClick={ () => navigate(`/customer/orders/${order.id}`) }
                className="MyOrders__container__order"
                key={ `order-${order.id}` }
              >
                <div className="Order_left">
                  <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
                    {order.id}
                  </p>
                </div>
                                <div className="Order_right">
                  <p
                    data-testid={ `customer_orders__element-order-date-${order.id}` }
                  >
                    {formatDate(order.saleDate)}
                  </p>
                  <span
                    data-testid={ `customer_orders__element-card-price-${order.id}` }
                  >
                    R$: {order.totalPrice.replace(/\./g, ',')}

                  </span>
                </div>
                <div className="Order_center">
                  <p
                  style={{
                  backgroundColor:
                    order.status === 'Pendente'
                      ? '#ff4779'
                      : order.status === 'Preparando'
                      ? '#0a97b7'
                      : order.status === 'Em Trânsito'
                      ? '#FFD523'
                      : order.status === 'Entregue'
                      ? '#4ae54a'
                      : 'white',
                }}
                    data-testid={ `customer_orders__element-delivery-status-${order.id}` }
                  >
                    {order.status}
                  </p>
                </div>
              </div>
            )
        )}
        </div>
        }
        </div>
      )}
    </div>
  );
}

export default MyOrders;
