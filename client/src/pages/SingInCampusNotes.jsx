import React, { useState } from 'react';

const SingInCampusNotes = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-start">
        <div className="flex">
          <img src="/img/brand.png" alt="Search Icon" className="w-[800px] h-[280px]" />
        </div>

        <div className="flex flex-col items-start space-y-4">
          <label className="text-white mb-1 w-[270px]">Create Username</label>
          <input type="text" className="bg-input-1 text-white p-3 rounded-[20px] h-[55px] w-[270px]" placeholder="Enter username" />

          <label className="text-white mt-4 mb-1 w-[270px]">Create password</label>
          <input type="password" className="bg-input-1 text-white p-3 rounded-[20px] h-[55px] w-[270px]" placeholder="Enter password" />

          <div className="flex justify-end w-[270px] mt-4">
            <button
              className={`bg-card-5 text-black p-3 rounded-[20px] h-[55px] w-[135px] ${isHovered ? 'bg-card-3' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingInCampusNotes;
