import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "flowbite-react";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import { useSelector } from "react-redux";
import socket from "../../socket.io/socket";
import moment from "moment";
import Paginations from "../../components/pagination/Pagination";
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const { link } = useSelector((state) => state.apiLink);
  const { user } = useSelector((state) => state.auth);
  const { translation } = useSelector((state) => state.lang);

  const [dataPagination, setDataPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = async () => {
    console.log("dssa");
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${link}/order/userOrders?limit=${limit}&page=${page}`,
        { headers: { token: `${user}` } }
      );
      console.log(response, "dssa");
      setOrders(response?.data?.data);
      setDataPagination(response?.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit]);

  useEffect(() => {
    socket.on("updatedOrder", (updatedOrder) => {
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
      });
    });
    return () => {
      socket.off("newReview");
    };
  }, []);

  const handleShowItems = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  if (!orders) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center mt-10">
        <p>{translation.noOrder}</p>
        <Link to='/menu' className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
          {translation.browsMenu}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 style={{ fontFamily: "Marhey" }}
            className="text-5xl font-bold mb-4  text-center">
        {translation.yourOrderList}
      </h2>
      <div className="overflow-x-auto">
        <Table hoverable={false}>
          <Table.Head>
            <Table.HeadCell className="dark:text-white">
              {translation.num}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white">
              {translation.orderData}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white">
              {translation.orderTime}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white">
              {translation.orderItems}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white">
              {translation.orderTotal}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white">
              {translation.orderStatus}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white">
              {translation.orderMethod}
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="dark:bg-slate-200">
            {orders?.map((order, index) => (
              <Table.Row key={order._id || index} className="bg-white">
                <Table.Cell className="dark:bg-slate-900 dark:bg-opacity-90 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="dark:bg-slate-900 dark:bg-opacity-90 dark:text-white">
                  {order.createdAt
                    ? moment(order.createdAt).format("MM DD YYYY")
                    : "N/A"}
                </Table.Cell>
                <Table.Cell className="dark:bg-slate-900 dark:bg-opacity-90 dark:text-white">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleTimeString()
                    : "N/A"}
                </Table.Cell>
                <Table.Cell className="dark:bg-slate-900 dark:bg-opacity-90 dark:text-white">
                  <Button
                    color="blue"
                    size="sm"
                    onClick={() => handleShowItems(order)}
                  >
                    View
                  </Button>
                </Table.Cell>
                <Table.Cell className="dark:bg-slate-900 dark:bg-opacity-90 dark:text-white">
                {order?.payment_method === "cash" 
                 ? <>{order.intention_detail.total} <span className="text-green-500">EGP</span></>
                :<>{order.intention_detail.total / 100} <span className="text-green-500">EGP</span></> }

                </Table.Cell>
                <Table.Cell
                  className={`dark:bg-slate-900 dark:bg-opacity-90  ${
                    order?.status == "preparing"
                      ? "dark:text-green-500 "
                      : "text-yellow-600"
                  }`}
                >
                  <span className="px-5 py-2 rounded dark:bg-slate-100">
                    {" "}
                    {order?.status}
                  </span>
                </Table.Cell>
                <Table.Cell
                  className={`dark:bg-slate-900 dark:bg-opacity-90 text-green-700  ${
                    order.payment_method == "online"
                      ? "dark:text-green-500 "
                      : "text-yellow-600"
                  }`}
                >
                  <span className="px-5 py-2 rounded dark:bg-slate-100">
                    {order.payment_method}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {dataPagination?.totalPages !== 1 && (
        <Paginations
          getNext={setPage}
          currentPage={dataPagination?.page}
          totalPages={dataPagination?.totalPages}
        />
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Order Items</Modal.Header>
        <Modal.Body>
          {selectedOrder?.intention_detail?.items?.length ? (
            <div className="space-y-4">
              {selectedOrder.intention_detail.items.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
                >
                  <span className="font-semibold">
                    {item.name?.en ? item.name.en : item.name}
                  </span>
                  {selectedOrder?.payment_method=="cash"?<span className="text-blue-600">
                    {item.amount } EGP
                  </span>:<span className="text-blue-600">
                    {item.amount_cents / 100} EGP
                  </span>}
                 
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              {translation.noItems}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderList;
