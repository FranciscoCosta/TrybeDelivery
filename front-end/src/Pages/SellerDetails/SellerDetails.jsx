import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import { Context } from "../../Context/Context";
import "./SellerDetails.scss";

function SellerDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const [sellerName] = useState("");
  const [totalProducts, settotalProducts] = useState([]);
  const { update, setUpdate } = useContext(Context);

  function formatDate() {
    const date = new Date();
    return date.toLocaleDateString("pt-br");
  }

  const getOrder = async () => {
    const orderId = id;
    const sale = await axios.get(`http://localhost:3001/orders/${orderId}`);
    setOrder(sale.data);
    const saleProduct = sale.data.id;
    const sales = await axios.post("http://localhost:3001/saleproducts", {
      saleProduct,
    });
    const totalProductsList = sales.data;
    const totaltotal = totalProductsList.map(async (product) => {
      const productItem = await axios.get(
        `http://localhost:3001/products/${product.productId}`
      );
      productItem.data.quntity = product.quantity;
      return productItem.data;
    });
    const TotalPPP = await Promise.all(totaltotal);
    settotalProducts(TotalPPP);
  };

  useEffect(() => {
    getOrder();
  }, [update]);

  const handleChangeStatus = async (status) => {
    await axios.put(`http://localhost:3001/sales/${id}`, { status });
    setUpdate(!update);
  };
  const status =
    "seller_order_details__element-order-details-label-delivery-status";
  return (
    <main className="SellerDetails">
      <Navbar />
      <section className="SellerDetails__container">
        <h3>Detalhe do Pedido</h3>
        <div className="SellerDetails__status">
          <label
            htmlFor="id_order"
            data-testid="seller_order_details__element-order-details-label-order-id"
          >
            <h5>{order.id}</h5>
          </label>
          <label
            htmlFor="id_seller"
            data-testid="seller_order_details__element-order-details-label-seller-name"
          >
            <h5>{sellerName}</h5>
          </label>
          <label
            htmlFor="sale_date"
            data-testid="seller_order_details__element-order-details-label-order-date"
          >
            <h5>{formatDate()}</h5>
          </label>
          <p
            style={{
              backgroundColor:
                order.status === "Pendente"
                  ? "#ff4779"
                  : order.status === "Preparando"
                  ? "#0a97b7"
                  : order.status === "Em Trânsito"
                  ? "#FFD523"
                  : order.status === "Entregue"
                  ? "#4ae54a"
                  : "white",
            }}
            data-testid={status}
            type="button"
          >
            {order.status}
          </p>
          <button
            data-testid="seller_order_details__button-preparing-check"
            type="button"
            disabled={order.status !== "Pendente"}
            onClick={() => handleChangeStatus("Preparando")}
          >
            Preparar pedido
          </button>
          <button
            data-testid="seller_order_details__button-dispatch-check"
            type="button"
            disabled={order.status !== "Preparando"}
            onClick={() => handleChangeStatus("Em Trânsito")}
          >
            Saiu para Entregar
          </button>

          <button
            data-testid="seller_order_details__button-delivery-check"
            type="button"
            disabled={order.status !== "Em Trânsito"}
          >
            MARCAR COMO ENTREGUE
          </button>
        </div>
        <table>
          <thead>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Subtotal</th>
          </thead>
          <tbody>
            {totalProducts.map((item, index) => (
              <tr key={index}>
                <td
                  data-testid={`seller_order_details__element-order-table-item-number-${index}`}
                >
                  {index + 1}
                </td>
                <td
                  data-testid={`seller_order_details__element-order-table-name-${index}`}
                >
                  {item.name}
                </td>
                <td
                  data-testid={`seller_order_details__element-order-table-quantity-${index}`}
                >
                  {item.quntity}
                </td>
                <td
                  data-testid={`seller_order_details__element-order-table-unit-price-${index}`}
                >
                  {item.price}
                </td>
                <td
                  data-testid={`seller_order_details__element-order-table-sub-total-${index}`}
                >
                  {(item.price * item.quntity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          data-testid="seller_order_details__element-order-total-price"
          type="button"
        >
          {totalProducts
            .reduce((acc, item) => {
              const { quntity, price } = item;
              return acc + quntity * price;
            }, 0)
            .toFixed(2)
            .toString()
            .replace(/\./g, ",")}
        </button>
      </section>
    </main>
  );
}

export default SellerDetails;
