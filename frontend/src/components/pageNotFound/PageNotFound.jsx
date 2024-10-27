
import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg mb-4">Sorry, the page you're looking for doesn't exist.</p>
            <Link to="/" className="text-blue-500 underline">Go back to Home</Link>
        </div>
    );
};

export default PageNotFound;
