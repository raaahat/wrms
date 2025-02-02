'use client';
import React, { useRef } from 'react';

const UpdatePage = async () => {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission

      const nextInput = inputRefs.current[index + 1];
      if (nextInput) {
        nextInput.focus();
      }
    }
  };
  return (
    <div className='flex flex-col gap-2'>
      {[...Array(5)].map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type='text'
          placeholder={`Input ${index + 1}`}
          className='border p-2'
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default UpdatePage;
