import React from 'react';
import { useAPI } from './Context/apiContext';
import FilterToggle from './FilterToggle';
import Toggle from './Theme/themeToggle';

const Header = () => {
    const { salesByDate, isLoading } = useAPI();
    console.log('context', salesByDate);
    console.log(isLoading);
    return (
        // <nav className="sticky top-0 z-30 flex justify-center items-center w-full px-4 py-4 my-0 mb-8 backdrop-filter backdrop-blur-lg bg-opacity-10 firefox:bg-opacity-90 border-b border-primary">
        <nav className="sticky top-0 z-30 flex justify-between items-center w-full shadow-md p-4 backdrop-filter backdrop-blur-lg bg-opacity-10 firefox:bg-opacity-90">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 md:mb-0 ml-0 md:ml-4 ">
                Superstore Dashboard
            </h3>
            <div className="flex">
                <FilterToggle />
                <Toggle />
                <div className="transition duration-500 ease-in-out rounded-full p-2">
                    {/* <InformationCircleIcon
                        onClick={() => window.open('https://dsfaisal.com', '_blank')}
                        className="h-5 w-5 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
                    /> */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        onClick={() => window.open('https://dsfaisal.com', '_blank')}
                    >
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                            clipRule="evenodd"
                        />
                        <title className="bg-gray-700">Developed by Faisal Akbar</title>
                    </svg>
                </div>
            </div>
        </nav>
        // </nav>
    );
};

export default Header;
