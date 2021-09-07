const Background = ({ children }) => (
    // Remove transition-all to disable the background color transition.
    <body className="bg-white dark:bg-gray-900 transition-all min-h-screen">{children}</body>
);
export default Background;
