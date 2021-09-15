import { FilterIcon, XIcon } from '@heroicons/react/solid';
import React from 'react';
import { useAPI } from './Context/apiContext';

const FilterToggle = () => {
    const { isFilter, setIsFilter } = useAPI();
    return (
        <div className="transition duration-500 ease-in-out rounded-full p-2">
            {!isFilter ? (
                <FilterIcon
                    onClick={() => setIsFilter(true)}
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
                />
            ) : (
                <XIcon
                    onClick={() => setIsFilter(false)}
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
                />
            )}
        </div>
    );
};
export default FilterToggle;
