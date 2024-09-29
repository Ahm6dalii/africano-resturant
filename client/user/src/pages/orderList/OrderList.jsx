import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "flowbite-react";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import { useSelector } from "react-redux";
import socket from "../../socket.io/socket";
import moment from "moment";
import Paginations from "../../components/pagination/Pagination";
import { Link } from 'react-router-dom';
import Recipt from "../../components/ReactI-cons/reciept/Recipt";
import { Helmet } from "react-helmet-async";

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
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${link}/order/userOrders?limit=${limit}&page=${page}`,
        { headers: { token: `${user}` } }
      );
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
      <div className="text-center mt-10 px-4" >
        <p>{translation.noOrder}</p>
        <Link to='/menu' className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg inline-block">
          {translation.browsMenu}
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6">
      <Helmet>
        <title>user Order List</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <h2 style={{ fontFamily: "" }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 capitalize text-center flex items-center gap-2 justify-center">
        <Recipt />
        {translation.yourOrderList}
      </h2>
      <div className="overflow-x-auto" dir="ltr">
        <Table hoverable={false} className="w-full">
          <Table.Head>
            <Table.HeadCell className="dark:text-white px-2 py-2 sm:px-4 sm:py-3">
              {translation.num}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white px-2 py-2 sm:px-4 sm:py-3">
              {translation.orderData}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white px-2 py-2 sm:px-4 sm:py-3 sm:table-cell">
              {translation.orderTime}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white px-2 py-2 sm:px-4 sm:py-3">
              {translation.orderItems}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white px-2 py-2 sm:px-4 sm:py-3">
              {translation.orderTotal}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white px-2 py-2 sm:px-4 sm:py-3">
              {translation.orderStatus}
            </Table.HeadCell>
            <Table.HeadCell className="dark:text-white px-2 py-2 sm:px-4 sm:py-3  sm:table-cell">
              {translation.orderMethod}
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="dark:bg-slate-200">
            {orders?.map((order, index) => (
              <Table.Row key={order._id || index} className="bg-white">
                <Table.Cell className="dark:bg-slate-900 dark:bg-opacity-90 dark:text-white px-2 py-2 sm:px-4 sm:py-3">
                  {index + 1}
                </Table.Cell>
                <Table.Cell className="dark:bg-slate-900 dark:bg-opacity-90 dark:text-white px-2 py-2 sm:px-4 sm:py-3">
                  {order.createdAt
                    ? moment(order.createdAt).format("MM DD YYYY")
                    : "N/A"}
                </Table.Cell>
                <Table.Cell className="dark:bg-slate-900 dark:bg-opacity-90 dark:text-white px-2 py-2 sm:px-4 sm:py-3  sm:table-cell">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleTimeString()
                    : "N/A"}
                </Table.Cell>
                <Table.Cell className="dark:bg-slate-900 dark:bg-opacity-90 dark:text-white px-2 py-2 sm:px-4 sm:py-3">
                  <Button
                    color="blue"
                    size="xs"
                    onClick={() => handleShowItems(order)}
                  >
                    View
                  </Button>
                </Table.Cell>
                <Table.Cell className="dark:bg-slate-900 dark:bg-opacity-90 dark:text-white px-2 py-2 sm:px-4 sm:py-3">
                  {order?.payment_method === "cash"
                    ? <>{order.intention_detail.total} <span className="text-green-500">EGP</span></>
                    : <>{order.intention_detail.total / 100} <span className="text-green-500">EGP</span></>}
                </Table.Cell>
                <Table.Cell
                  className={`dark:bg-slate-900 dark:bg-opacity-90 px-2 py-2 sm:px-4 sm:py-3 ${order?.status == "preparing"
                      ? "dark:text-green-500 "
                      : "text-yellow-600"
                    }`}
                >
                  <span className="px-2 py-1 sm:px-3 sm:py-2 rounded dark:bg-slate-100 text-xs sm:text-sm">
                    {order?.status}
                  </span>
                </Table.Cell>
                <Table.Cell
                  className={`dark:bg-slate-900 dark:bg-opacity-90 text-green-700 px-2 py-2 sm:px-4 sm:py-3  sm:table-cell ${order.payment_method == "online"
                      ? "dark:text-green-500 "
                      : "text-yellow-600"
                    }`}
                >
                  <span className="px-2 py-1 sm:px-3 sm:py-2 rounded dark:bg-slate-100 text-xs sm:text-sm">
                    {order.payment_method}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {dataPagination?.totalPages !== 1 && (
        <div className="mt-4">
          <Paginations
            getNext={setPage}
            currentPage={dataPagination?.page}
            totalPages={dataPagination?.totalPages}
          />
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Order Items</Modal.Header>
        <Modal.Body>
          {selectedOrder?.intention_detail?.items?.length ? (
            <div className="space-y-4">
              {selectedOrder.intention_detail.items.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex justify-between items-center p-2 sm:p-4 bg-gray-100 rounded-lg"
                >
                  <span className="font-semibold text-sm sm:text-base">
                    {item.name?.en ? item.name.en : item.name}
                  </span>
                  <span className="text-blue-600 text-sm sm:text-base">
                    {selectedOrder?.payment_method === "cash"
                      ? `${item.amount} EGP`
                      : `${item.amount_cents / 100} EGP`}
                  </span>
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