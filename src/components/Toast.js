import React from 'react';

const Toast = ({ message, type }) => {
  // Change toast message background color based on type variable
  const typeStyles = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`fixed top-16 left-1/2 transform -translate-x-1/2 ${typeStyles} text-white p-2 rounded shadow-lg w-[90%] md:w-fit`}>
      {message}
    </div>
  );
};

export default Toast;
