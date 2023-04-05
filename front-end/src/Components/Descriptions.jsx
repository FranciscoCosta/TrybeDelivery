import React from 'react';
import './Description.scss'


function Descriptions() {
  return (
    <tr className='Descripton'>
      <th>Item</th>
      <th>Descrição</th>
      <th>Quantidade</th>
      <th>Valor Unitário</th>
      <th>Subtotal</th>
    </tr>
  );
}

export default Descriptions;
