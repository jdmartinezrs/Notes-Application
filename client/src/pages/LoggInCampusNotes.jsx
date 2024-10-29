import React, { useState } from 'react';

const LoggInCampusNotes = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-start">
        <div className="flex">
          <img src="/img/brand.png" alt="Search Icon" className="w-[800px] h-[280px]" />
        </div>

        <div className="flex flex-col items-start space-y-4">
          
          <input type="text" className="bg-input-1 text-white p-3 rounded-[20px] h-[55px] w-[270px]" placeholder="Enter username" />

          <input type="password" className="bg-input-1 text-white p-3 rounded-[20px] h-[55px] w-[270px]" placeholder="Enter password" />

          <div className="flex justify-end w-[270px] mt-4">
            <button
              className={`bg-card-4 text-black p-3 rounded-[20px] h-[55px] w-[135px] ${isHovered ? 'bg-card-6' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Log-in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoggInCampusNotes;
