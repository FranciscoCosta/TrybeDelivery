import React, { useContext, useEffect } from 'react';
import './Checkout.scss';

import { FaTrash} from 'react-icons/fa';
import Navbar from '../../Components/Navbar';
import Descriptions from '../../Components/Descriptions';
import { Context } from '../../Context/Context';
import Address from '../../Components/Address';

function Checkout() {
  const { total, update, setUpdate, getTotalPriceFromCart } = useContext(Context);
  const cart = JSON.parse(localStorage.getItem('carrinho')) || [];

  useEffect(() => {
    getTotalPriceFromCart()
    console.log(total)
  }, [total,update]);

  const handleRemove = (id) => {
    const cartL = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (cartL !== []) {
      const newCart = cartL.filter((item) => item.productId !== id);
      localStorage.setItem('carrinho', JSON.stringify(newCart));
      getTotalPriceFromCart();
      setUpdate(!update);
    } else {
      console.log('empety');
    }
  };
  return (
    <main className="Checkout">
      <Navbar />
      <section className="Checkout__container">
        <h1>Finalizar Pedido</h1>
        <table>
          <thead>
            <Descriptions />
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  {index + 1}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-name-${index}`
                  }
                >
                  {item.name}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  {item.quantity}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  {item.unitPrice.toFixed(2)}
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  {(item.unitPrice * item.quantity)
                    .toFixed(2)}
                </td>
                <td
                className='Checkout__btn-delete'
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                >
                  <button
                    type="button"
                    value={item.productId}
                    id={ item.productId }
                    onClick={ ()=>handleRemove(item.productId) }
                  >
                    <FaTrash
                    id={ item.productId }
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          data-testid="customer_checkout__element-order-total-price"
          type="button"
        >
          Valor total de R$: {Number(total).toFixed(2)}
        </button>
        <h1>Detalhes e Endereço para Entrega</h1>
        <Address />
      </section>
    </main>
    // teste
  );
}

export default Checkout;
