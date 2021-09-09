import React from 'react';
import { useAPI } from './Context/apiContext';
import Toggle from './Theme/themeToggle';

const Header = () => {
    const { salesByDate, isLoading } = useAPI();
    console.log('context', salesByDate);
    console.log(isLoading);
    return (
        <header className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 shadow-md p-4 backdrop-filter backdrop-blur-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-0 ml-0 md:ml-4 ">
                Simple Superstore Dashboard
            </h3>
            <div>
                <Toggle />
            </div>
        </header>
    );
};

export default Header;
