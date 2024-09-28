import React from 'react'
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function NotFound() {
  const { translation } = useSelector(state => state.lang)

  return (
    <div className=" bg-gradient-to-r from-slate-200 to-gray-200 dark:from-gray-800 dark:to-gray-900 text-black dark:text-white">
      <Helmet>
        <title>404</title>
        <meta name="description" content="About Page" />
      </Helmet>
      <div className="flex items-center justify-center min-h-screen px-2">
        <div className="text-center">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-2xl font-medium mt-4">{translation.pageNotFound}</p>
          <p className="mt-4 mb-8">{translation.notFound}</p>
          <Link to="/"
            className="px-6 k py-3  bg-white font-semibold rounded-full hover:bg-purple-100 transition duration-300 ease-in-out dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            {translation.goBack}
          </Link>
        </div>
      </div>
    </div>
  )
}
