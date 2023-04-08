import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import Loading from "../../Components/Loading/Loading";
import "./SellerOrders.scss";

function SellerOrders() {
  const navigate = useNavigate();
  const sellerId = JSON.parse(localStorage.getItem("userID"));
  const [orders, setOrders] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const fetchSales = async () => {
    const response = await axios.post("http://localhost:3001/salesGetSeller", {
      sellerId,
    });
    console.log(response);
    setOrders(response.data.salesSeller);
    setisLoading(false);
  };
  function formatDate(param) {
    const date = new Date(param);
    return date.toLocaleDateString("pt-br");
  }
  useEffect(() => {
    fetchSales();
  }, []);

  return (
    <div className="SellerOrders">
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="SellerOrders__container">
          {/* <h1>Seus pedidos</h1> */}
          {orders.map === []
            ? "Você não tem pedidos"
            : orders.map((order) => (
                <div
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      console.log("Enter key pressed!");
                    }
                  }}
                  role="button"
                  tabIndex="0"
                  data
                  onClick={() => navigate(`/seller/orders/${order.id}`)}
                  className="SellerOrders__container__order"
                  key={`order-${order.id}`}
                >
                  <div className="Order__info-lr">
                    <div className="Order_left">
                      <p
                        data-testid={`seller_orders__element-order-id-${order.id}`}
                      >
                        {order.id}
                      </p>
                    </div>
                    <div className="Order_right">
                      <p
                        data-testid={`seller_orders__element-order-date-${order.id}`}
                      >
                        {formatDate(order.saleDate)}
                      </p>
                      <p
                        data-testid={`seller_orders__element-card-price-${order.id}`}
                      >
                        R$: {order.totalPrice.replace(/\./g, ",")}
                      </p>
                    </div>
                    <div className="Order_center">
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
                        data-testid={`seller_orders__element-delivery-status-${order.id}`}
                      >
                        {order.status}
                      </p>
                    </div>
                  </div>
                  <p
                  className="Order__address-client"
                    data-testid={`seller_orders__element-card-address-${order.id}`}
                  >
                    {`${order.deliveryAddress} , ${order.deliveryNumber}`}
                  </p>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}

export default SellerOrders;
