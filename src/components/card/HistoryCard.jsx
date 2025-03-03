import React, { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        // console.log(res);
        setOrders(res.data.orders);
      })
      .catch((err) => console.log(err));
  };

  const getStatusColor = (status) => {
    switch(status){
      case "Not Process":
        return 'bg-gray-200'
      case "Processing":
        return 'bg-blue-200'
      case "Completed":
        return "bg-green-200"
      case "Cancelled":
        return 'bg-red-200'
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">History</h1>
      {/*  */}
      <div className="space-y-4">
        {/* Card loop order */}
        {orders?.map((item, i) => {
        //   console.log(item);
          return (
            <div key={i} className="bg-gray-100 p-4 rounded-md shadow-md">
              {/* Header */}
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm">Order Date</p>
                  <p className="font-bold">{dateFormat(item.updatedAt)}</p>
                </div>
                <div>
                  <span className={`${getStatusColor(item.orderStatus)} px-2 py-1 rounded-full`}>
                    {item.orderStatus}
                  </span>
                </div>
              </div>
              {/* table loop product */}
              <div>
                <table className="border w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>Product</th>
                            <th>Price</th>
                            <th>Amount</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                  <tbody>
                    {item.products?.map((product, index) => {
                    //   console.log(product);
                      return (
                        <tr key={index}>
                          <td>{product.product.title}</td>
                          <td>{numberFormat(product.product.price)}</td>
                          <td>{product.count}</td>
                          <td>{numberFormat(product.count * product.product.price)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {/* total */}
              <div>
                <div className="text-right">
                  <p>ราคาสุทธิ</p>
                  <p>{numberFormat(item.cartTotal)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryCard;
