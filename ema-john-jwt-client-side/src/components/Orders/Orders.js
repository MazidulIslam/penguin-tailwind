import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import useAuth from "./../../hooks/useAuth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user, logOut } = useAuth();
  const history = useHistory();
  useEffect(() => {
    fetch(
      `https://afternoon-tor-87910.herokuapp.com/orders?email=${user.uid}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          // history.push("/login");
          alert("Your session expired");
          logOut();
        }
      })
      .then((data) => setOrders(data));
  }, []);
  return (
    <div>
      <h2> You have placed {orders.length} Orders </h2>
      <h2> You have placed {user.uid} Orders </h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.name} : {order.email}
          </li>
          // here order.email is uid
        ))}
      </ul>
    </div>
  );
};

export default Orders;
