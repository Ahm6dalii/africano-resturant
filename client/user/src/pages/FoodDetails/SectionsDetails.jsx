/* eslint-disable react/prop-types */
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import moment from 'moment';
import socket from './../../socket.io/socket';

const CustomerReviews = ({ id, reviews }) => {
    const [newReview, setNewReview] = useState('');
    const [reviewsList, setReviewsList] = useState(reviews);
    const api = useSelector(state => state.apiLink.link);
    const queryClient = useQueryClient();
    const { user } = useSelector((state) => state.auth);


    useEffect(() => {
        if (reviews) {
            setReviewsList(reviews);
        }
    }, [reviews]);
    console.log(reviews, "reviews");
    console.log(newReview, "newReview");

    useEffect(() => {
        socket.on('newReview', (addedReview) => {

            setReviewsList((prevReviews) => [...prevReviews, addedReview]);
        });

        return () => {
            socket.off('newReview');
        };
    }, []);

    const { mutate, error, isSuccess, isLoading } = useMutation('addReview', async (text) => {

        const headers = { token: `${user}`, };
        const response = await axios.post(`${api}/api/foods/review/${id}`, { text }, { headers });
        return response;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('foodDetails');
            setNewReview('');
        }
    });

    const handleSubmit = () => {
        mutate(newReview);
    };

    return (
        <section className="py-12 lg:py-24 relative">
            <div className="container mx-auto px-4">
                <h2 className="font-manrope font-bold text-2xl lg:text-4xl dark:text-white text-black mb-8 lg:mb-12 text-center">
                    Our customer reviews
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Review submission form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-black shadow-md rounded-lg px-6 lg:px-8 py-6 mb-4">
                            <div className="mb-6">
                                <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="review">
                                    Your Review
                                </label>
                                <textarea
                                    className="shadow appearance-none dark:bg-gray-800 border rounded w-full py-2 px-3 dark:text-gray-200 text-gray-800 leading-tight focus:outline-none focus:shadow-outline h-32"
                                    id="review"
                                    placeholder="Write your review here"
                                    name="review"
                                    value={newReview}
                                    onChange={(e) => setNewReview(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    disabled={newReview.length < 5 || isLoading}
                                    onClick={handleSubmit}
                                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    {isLoading ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2">Error submitting review. Please try again.</p>}
                            {isSuccess && <p className="text-green-500 text-sm mt-2">Review submitted successfully!</p>}
                        </div>
                    </div>

                    {/* Reviews list */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                            {reviewsList && reviewsList.map((review, index) => (
                                <div key={index} className="bg-white dark:bg-black shadow-md rounded-lg p-4 lg:p-6">
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {review?.user?.image && <img src={review?.user?.image} alt="John image" className="w-8 h-8 rounded-full object-cover" />}
                                            <h6 className="font-semibold text-lg dark:text-white text-indigo-600">
                                                {review?.user?.name}
                                            </h6>
                                        </div>
                                        <p className="font-normal text-sm text-gray-400 mt-2 lg:mt-0">
                                            {moment(review.createdAt).format("DD MMMM YYYY")}
                                        </p>
                                    </div>
                                    <p className="font-normal text-base dark:text-gray-400 text-gray-900 break-words">
                                        {review.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomerReviews;
