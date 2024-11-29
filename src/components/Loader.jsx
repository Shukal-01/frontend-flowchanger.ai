const Loader = ({ size, color }) => {
  return (
    <div className="flex justify-center items-center h-full">
      <div role="status">
        <svg
          aria-hidden="true"
          className={`w-${size ? size : "8"} h-${size ? size : "8"} text-${
            color ? color : "gray-200"
          }-200 animate-spin dark:text-gray-600 fill-blue-600`}
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* SVG paths here */}
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
