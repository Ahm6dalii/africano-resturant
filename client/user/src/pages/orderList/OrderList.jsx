import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import axios from "axios";
import Loading from "../../components/loading/Loading";

const OrderList = () => {
  const [orders, setOrders] = useState([]); // State to store user orders
  const {link } = useSelector(state => state.apiLink)
  const { user,userInfo } = useSelector((state) => state.auth);

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
        setOrders(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  if(!orders){
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
          <Table.HeadCell>Order ID</Table.HeadCell>
        </Table.Head>

        <Table.Body>
          {orders?.data?.map((order, index) => (
            <Table.Row key={order._id || index} className="bg-white">
              {console.log(order.intention_detail)}

              <Table.Cell>
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleDateString()
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
                      {item.name} - {item.amount / 100} EGP
                    </div>
                  ))
                ) : (
                  <div>No items available</div>
                )}
              </Table.Cell>
              <Table.Cell>{order.intention_detail.amount /100}</Table.Cell>
              <Table.Cell>{index + 1}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default OrderList;