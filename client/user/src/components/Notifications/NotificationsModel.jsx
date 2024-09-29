import { useEffect, useState } from 'react';
import socket from '../../socket.io/socket';
import moment from 'moment'; // Import moment.js to format the date
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import logo from "../../assets/logo/logo.li.png"

const NotificationsModel = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifi, setNotifi] = useState([]);
    const { userInfo } = useSelector((state) => state.auth);
    const api = useSelector(state => state.apiLink.link)
    const queryClient = useQueryClient()
    const { data } = useQuery('notifications', async () => {
        if (userInfo?.userId) {
            const response = await axios(`${api}/notifications/${userInfo.userId}`)
            setNotifi(response?.data.filter((noti) => noti.read === false));
            return response?.data?.filter((noti) => noti.read === false);
        }
        return [];
    }, {
        onSuccess: (data) => {
            setNotifi(data);
        },
        enabled: !!userInfo?.userId
    })

    const { mutate: markAsRead } = useMutation('markAsRead', async () => {
        const response = await axios.patch(`${api}/notifications/update/${userInfo.userId}`);
        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('notifications');
            setNotifi([]);
        },
    });

    // 

    useEffect(() => {
        const handleUserNotification = (notification) => {
            // 
            if (!notification.read) {
                setNotifi((prevNotifications) => [notification, ...prevNotifications]);
            }
        };
        const handleNotification = (notifications) => {
            // 

            setNotifi((prevNotifications) => [notifications, ...prevNotifications]);

        };
        if (userInfo?.userId) {
            socket.on('userNotification', handleUserNotification);
            socket.on('notifications', handleNotification);
        }

        return () => {
            socket.off('userNotification', handleUserNotification);
            socket.off('notifications', handleNotification);
        };
    }, [userInfo?.userId]);


    return (
        <>
            <div className="flex justify-center pe-1 sm:pe-3">
                <div>
                    {/* Toggle Button */}
                    <button
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="relative  z-10 block rounded-md  focus:outline-none"
                    >
                        <svg
                            className="h-5 w-5 text-grey-800"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        {notifi.length > 0 && <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>}
                    </button>

                    {dropdownOpen && (
                        <div
                            onClick={() => setDropdownOpen(false)}
                            className="fixed inset-0 h-full  z-10"
                        ></div>
                    )}

                    {dropdownOpen && (
                        <div

                            className="absolute right-5 w-[90%] sm:w-[50%] md:w-[50%] xl:w-[30%] mt-2 bg-zinc-200 dark:bg-slate-800   rounded-md shadow-lg overflow-hidden z-20 max-h-80 overflow-y-auto"

                        >
                            <div className="py-2">
                                {notifi.length > 0 ? (
                                    notifi.map((notification, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center px-4 py-3 border-b  dark:hover:bg-gray-900 hover:bg-slate-600 hover:text-white -mx-2"
                                        >
                                            <img
                                                className="size-12 rounded-full object-cover mx-1"
                                                src={logo}
                                                alt="avatar"
                                            />
                                            <div className="ml-2">
                                                <p className=" text-sm">
                                                    <span className="font-bold">Notification</span>: {notification?.message}
                                                </p>
                                                <p className="text-gray-200 dark:text-gray-500  text-xs">
                                                    {moment(notification?.createdAt).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-600 text-sm px-4 py-3">No notifications available</p>
                                )}
                            </div>
                            {notifi.length > 0 && <span onClick={() => markAsRead()} className="block cursor-pointer bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-900 hover:bg-zinc-500 text-white text-center font-bold py-2">Mark all as Read</span>}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default NotificationsModel;
