import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { assets, dummyOrders } from "../../assets/assets.js";

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/seller");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll bg-[var(--color-background)]">
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium text-[var(--color-primary)]">
          Orders List
        </h2>
        {orders.map((order, index) => (
          <div
            key={index}
            className="flex flex-col  md:items-center md:flex-row  gap-5 justify-between rounded-md border border-gray-300 p-5 max-w-4xl"
          >
            <div className="flex gap-5 max-w-80">
              <img
                className="w-12 h-12 object-cover"
                src={assets.box_icon}
                alt="boxIcon"
              />
              <div>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col ">
                    <p className="font-medium text-black">
                      {item.product.name}{" "}
                      <span className="text-[var(--color-primary)]">
                        x {item.quantity}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm md:text-base text-black">
              <p className="text-gray-300">
                {order.address?.firstName} {order.address?.lastName}
              </p>
              <p>
                {order.address?.street}, {order.address?.city}
              </p>
              <p>
                {order.address?.state}, {order.address?.zipcode},{" "}
                {order.address?.country}
              </p>
              <p></p>
              <p>{order.address?.phone}</p>
            </div>

            <p className="font-medium text-lg my-auto text-red-500">
              {currency}
              {order.amount}
            </p>

            <div className="flex flex-col text-sm md:text-base text-black">
              <p>Method: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Date: {order.orderDate}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;

