import { useEffect, useRef, useState } from 'react'
import socket from './../../socket.io/socket';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

import logo from '../../assets/logo/logo.li.png'

import './style.css'
import { motion } from 'framer-motion';

const chatVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.02 },
  }),
  exit: { opacity: 0, y: -10 },
};
const Chat = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [chat, setChat] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const api = useSelector(state => state.apiLink.link)
  const [hasNewMessage, setHasNewMessage] = useState(false);
  // const queryClient = useQueryClient()

  const chatRef = useRef(null);
  const chatContainerRef = useRef(null);

  const schema = yup.object().shape({
    message: yup.string().required('messages is reqired').min(3, 'minmum three char')
  });
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const submitTheForm = ({ message }) => {
    socket.emit('sendMessage', { userId: userInfo?.userId, message })
    reset();
  };

  // const { data } = useQuery('userChatMessages', async () => {
  //     if (userInfo?.userId) {
  //         const responsie = await axios(`${api}/notifications/chat/${userInfo.userId}`)
  //         setChat(responsie.data.messages)
  //         return responsie.data
  //     }
  //     return [];
  // }, {
  //     onSuccess: () => {

  //     },
  // })
  // console.log(data, "chat data");

  useEffect(() => {
    socket.emit('register', { adminId: null, userId: userInfo?.userId });
    socket.on('newMessage', (getMessages) => {
      console.log(getMessages, "from socket io chat");
      setChat((prev) => [...prev, getMessages]);
      if (!isOpen) {
        setHasNewMessage(true);
      }
    })
    return () => {
      socket.off('newMessage')
    }
  }, [userInfo, isOpen])
  console.log(chat, "chat");

  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        const response = await fetch(`${api}/notifications/chat/${userInfo.userId}`);
        if (response.ok) {
          const data = await response.json();
          setChat(data.messages);
        } else {
          console.error('Failed to fetch previous messages');
        }
      } catch (error) {
        console.error('Error fetching previous messages:', error);
      }
    };

    fetchPreviousMessages();
  }, [userInfo, isOpen]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    if (isOpen && chatRef.current) {
      chatRef.current.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [isOpen, chat]);

  const handleChatButtonClick = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };
  return (
    <>
      <button
        onClick={handleChatButtonClick}
        className={`fixed bottom-4 right-4 inline-flex items-center justify-center w-16 h-16 bg-red-800 hover:bg-red-900 text-white text-sm font-medium rounded-full p-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-800 transition-all duration-300 ${hasNewMessage ? 'animate-bounce' : ''}`}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
        </svg>
        {hasNewMessage && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></span>
        )}
      </button>


      {isOpen && (
        <motion.div
          variants={chatVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          ref={chatContainerRef} className="fixed bottom-24 right-4 bg-white rounded-lg border border-gray-200 w-96 shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
          <div className="p-4 border-b border-gray-200 flex items-centet justify-between">
            <h2 className="font-semibold text-lg text-gray-800">Customer service Chat service</h2>
            <h1 onClick={() => setIsOpen((prev) => !prev)} className='text-2xl cursor-pointer text-gray-900 hover:text-gray-600'><i className="fa-solid fa-x"></i></h1>
          </div>
          <div ref={chatRef} className="h-96 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {chat.length > 0 ? (
              chat.map((message, index) => (
                <motion.div
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  key={index} className={`flex ${message.senderModel === 'Admin' ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                  <div className={`flex max-w-[80%] ${message.senderModel === 'Admin' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className="flex-shrink-0">
                      <img
                        src={message.senderModel === 'Admin' ? logo : message.sender.image}
                        alt={message.senderModel === 'Admin' ? "Admin" : message.sender.name}
                        className="size-12 object-cover rounded-full mx-2"
                      />
                    </div>
                    <div className={`ml-2 p-3 rounded-lg shadow-md min-w-[120px] ${message.senderModel === 'Admin'
                      ? 'bg-white text-black'
                      : 'bg-blue-600 text-white'
                      }`}>
                      <strong className="block mb-1 font-bold">
                        {message.senderModel === 'Admin' ? message.sender.username : message.sender.name}
                      </strong>
                      <p className="text-sm break-words w-full max-w-[200px]">{message.text}</p>
                      <span className={`text-xs mt-1 block ${message.senderModel === 'Admin' ? 'text-gray-500' : 'text-blue-200'
                        }`}>
                        {moment(message.createdAt).format('hh:mm A')}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500">No messages yet</p>
            )}
          </div>
          <form onSubmit={handleSubmit(submitTheForm)} className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <input
                type="text"
                {...register('message', { required: 'Message is required' })}
                className="flex-grow px-3 py-2 text-sm text-gray-900 bg-gray-100 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Send
              </button>
            </div>
            {errors.message && <span className="text-red-500 text-md mt-1">{errors.message.message}</span>}
          </form>
        </motion.div>
      )
      }
    </>
  )
}

export default Chat