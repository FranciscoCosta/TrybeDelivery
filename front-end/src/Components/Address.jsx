import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Context } from '../Context/Context';
import './Address.scss'
function Address() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { total } = useContext(Context);
  const [seller, setSeller] = useState(2);
  const [sellers, setSellers] = useState([]);
  const currentUser= JSON.parse(localStorage.getItem('user'));
  
  const [door, setDoor] = useState(currentUser.door || '');
  const [address, setAddress] = useState(currentUser.address || '');
  console.log(currentUser.address, currentUser.door)
  const fetchSellers = async () => {
    const sellersData = await axios.get('http://localhost:3001/users/sellers');
    setSellers(sellersData.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSellers();
  }, [total]);

  const handleSubmit = async () => {
    const userId = JSON.parse(localStorage.getItem('userID'));
    const { token } = JSON.parse(localStorage.getItem('user'));
    const cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    const newSale = {
      sellerId: seller,
      userId,
      totalPrice: total,
      deliveryAddress: address,
      deliveryNumber: door,
      saleDate: moment.utc(new Date()).format(),
      status: 'Pendente',
    };
    const sales = await axios.post(
      'http://localhost:3001/sales',
      {
        ...newSale,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    const idSale = Number(sales.data.sale.id);

    cart.forEach(async (item) => {
      const { productId, quantity } = item;
      await axios.post(
        'http://localhost:3001/products/sales',
        {
          saleId: idSale,
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );
    });

    navigate(`/customer/orders/${idSale}`);
  };
  return (
    <div className="Address">
      {isLoading ? (
        'Carregando'
      ) : (
        <div className="Address__container">
          <form action="sumbmit">
            <div className='Address__left'>
            <label htmlFor="seller">
              Vendedor:
              <select
                name="seller"
                id="seller"
                type="text"
                onChange={ (e) => setSeller(e.target.value) }
                data-testid="customer_checkout__select-seller"
              >
                {sellers.map((sel) => (
                  <option key={ sel.id } value={ sel.id }>
                    {sel.name}
                  </option>
                ))}
              </select>
            </label>
            </div>
            <div className='Address__right'>
            <label htmlFor="door">
              Número
              <input
                data-testid="customer_checkout__input-address-number"
                name="door"
                type="text"
                placeholder="Ex: 123"
                value={ door}
                onChange={ (e) => setDoor(e.target.value) }
              />
            </label>
            <label htmlFor="address">
              Endereço
              <input
                data-testid="customer_checkout__input-address"
                name="address"
                type="text"
                value={ address}
                placeholder="Ex: Rua da noite"
                onChange={ (e) => setAddress(e.target.value) }
              />
            </label>
            </div>
            <button
              type="button"
              className=""
              data-testid="customer_checkout__button-submit-order"
              onClick={ handleSubmit }
            >
              Finalizar pedido
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default Address;
