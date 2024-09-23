import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import { useSelector } from "react-redux";
import socket from "../../socket.io/socket";
import moment from "moment";

const OrderList = () => {
  const [orders, setOrders] = useState([]); // State to store user orders
  const { link } = useSelector(state => state.apiLink)
  const { user, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${link}/order/userOrders`,
          {
            headers: { token: `${user}` },
          }
        );
        //console.log(response.data);
        setOrders(response?.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();

  }, []);
  console.log(orders, "checking something");
  useEffect(() => {
    socket.on('updatedOrder', (updatedOrder) => {
      console.log(updatedOrder, "updatedOrder");
      setOrders((prevOrders) => {
        const existingOrderIndex = prevOrders.findIndex(
          (order) => order._id === updatedOrder._id
        );
        if (existingOrderIndex !== -1) {
          const updatedOrders = [...prevOrders];
          updatedOrders[existingOrderIndex] = updatedOrder;
          return updatedOrders;
        } else {
          return [...prevOrders, updatedOrder];
        }
      })
    });
    return () => {
      socket.off('newReview');
    };
  })
  if (!orders) {
    <Loading></Loading>
  }
  console.log(orders);
  if (orders.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>No orders found</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Your Orders</h2>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Time</Table.HeadCell>
          <Table.HeadCell>Items</Table.HeadCell>
          <Table.HeadCell>Total Price</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Order ID</Table.HeadCell>
        </Table.Head>

        <Table.Body>
          {orders?.map((order, index) => (
            <Table.Row key={order._id || index} className="bg-white">
              {console.log(order.intention_detail)}

              <Table.Cell>
                {order.createdAt
                  ? moment(order.createdAt).format("MM DD YYYY")
                  : "N/A"}
              </Table.Cell>
              <Table.Cell>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleTimeString()
                  : "N/A"}
              </Table.Cell>
              <Table.Cell>
                {order?.intention_detail?.items?.length ? (
                  order.intention_detail.items.map((item) => (
                    <div key={item._id || Math.random()}>
                      {item.name.en} - {item.amount / 100} EGP
                    </div>
                  ))
                ) : (
                  <div>No items available</div>
                )}
              </Table.Cell>
              <Table.Cell>{order.intention_detail.amount / 100}</Table.Cell>
              <Table.Cell>{order?.status}</Table.Cell>
              <Table.Cell>{index + 1}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OrderList;
