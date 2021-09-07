import { MoonIcon, SunIcon } from '@heroicons/react/solid';
import React, { useContext } from 'react';
import { ThemeContext } from './themeContext';

const Toggle = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <div className="transition duration-500 ease-in-out rounded-full p-2">
            {theme === 'dark' ? (
                <SunIcon
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
                />
            ) : (
                <MoonIcon
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="h-5 w-5 text-gray-500 dark:text-gray-400 text-2xl cursor-pointer"
                />
            )}
        </div>
    );
};
export default Toggle;
