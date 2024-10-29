import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const StartScreen = () => {
  const [isHoveredLogIn, setIsHoveredLogIn] = useState(false);
  const [isHoveredSignIn, setIsHoveredSignIn] = useState(false);
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleLogInClick = () => {
    navigate('/LogIn'); // Navega a la ruta LogIn
  };

  const handleSignInClick = () => {
    navigate('/SingIn'); // Navega a la ruta SingIn
  };

  return (
    <> 
      <div className="w-full h-screen flex flex-col items-center justify-start">
        <div className="flex">
          <img src="/img/brand.png" alt="Search Icon" className="w-[800px] h-[280px]" />
        </div>

        <div className="flex flex-col items-center space-y-4">
          {/* Botón Log-in */}
          <button
            className={`bg-card-3 text-black p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[270px] ${isHoveredLogIn ? 'bg-card-6' : ''}`}
            onMouseEnter={() => setIsHoveredLogIn(true)}
            onMouseLeave={() => setIsHoveredLogIn(false)}
            onClick={handleLogInClick} 
          >
            Log-in
          </button>

          {/* Botón Sign-in */}
          <button
            className={`bg-card-5 text-black p-3 rounded-[20px] flex items-center justify-center h-[55px] w-[270px] ${isHoveredSignIn ? 'bg-card-4' : ''}`}
            onMouseEnter={() => setIsHoveredSignIn(true)}
            onMouseLeave={() => setIsHoveredSignIn(false)}
            onClick={handleSignInClick} 
          >
            Sign-in
          </button>
        </div>
      </div>
    </>
  );
};

export default StartScreen;
