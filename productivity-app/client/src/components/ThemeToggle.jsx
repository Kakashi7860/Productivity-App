import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { IconSun, IconMoon } from '@tabler/icons-react';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Toggle Theme"
        >
            {theme === 'dark' ? (
                <IconSun className="text-yellow-500" size={20} />
            ) : (
                <IconMoon className="text-gray-600" size={20} />
            )}
        </button>
    );
};

export default ThemeToggle;
