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
  const { translation } = useSelector(state => state.lang)

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
        <p>
          { translation.noOrder}</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
         {translation.browsMenu}
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">{translation.yourOrderList}</h2>
      <Table hoverable={false}>
        <Table.Head>

          <Table.HeadCell className="dark:text-white text-sm ">{translation.orderId}</Table.HeadCell>
          <Table.HeadCell className="dark:text-white text-sm  " >{translation.orderData}</Table.HeadCell>
          <Table.HeadCell  className="dark:text-white text-sm ">{translation.orderTime}</Table.HeadCell>
          <Table.HeadCell className="dark:text-white text-sm ">{translation.orderItems}</Table.HeadCell>
          <Table.HeadCell className="dark:text-white text-sm ">{translation.orderTotal}</Table.HeadCell>
          <Table.HeadCell className="dark:text-white text-sm ">{translation.orderStatus}</Table.HeadCell>

          
          
        </Table.Head>
        <Table.Body className=" dark:bg-slate-200">
          {orders?.map((order, index) => (
            
            <Table.Row key={order._id || index} className="bg-white">
              {console.log(order.intention_detail)}
              <Table.Cell className=" dark:bg-slate-900 dark:bg-opacity-90 dark:text-white">{index + 1}</Table.Cell>

              <Table.Cell className=" dark:bg-slate-900  dark:bg-opacity-90 dark:text-white">
                {order.createdAt
                  ? moment(order.createdAt).format("MM DD YYYY")
                  : "N/A"}
              </Table.Cell>
              <Table.Cell className=" dark:bg-slate-900 dark:bg-opacity-90 dark:text-white">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleTimeString()
                  : "N/A"}
              </Table.Cell>
              <Table.Cell className=" dark:bg-slate-900 dark:bg-opacity-90 dark:text-white">
                {order?.intention_detail?.items?.length ? (
                  order.intention_detail.items.map((item) => (
                    <div key={item._id || Math.random()}>

                      {item.name.en} - {item.amount_cents / 100} EGP
                    </div>
                  ))
                ) : (
                  <div>{translation.noItems}</div>
                )}
              </Table.Cell>
              <Table.Cell>{order.intention_detail.amount / 100}</Table.Cell>
              <Table.Cell>{order?.status}</Table.Cell>
              {/* <Table.Cell>{index + 1}</Table.Cell> */}

              <Table.Cell className=" dark:bg-slate-900 dark:bg-opacity-90 dark:text-white">{order.intention_detail.total / 100}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OrderList;
