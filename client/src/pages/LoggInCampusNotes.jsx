import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoggInCampusNotes = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const navigate = useNavigate(); // Hook para navegar

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    const userData = {
      nombre_usuario: username,
      contrasena_hash: password,
    };

    setLoading(true); // Inicia el loading

    try {
      const response = await fetch('http://localhost:3000/user/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error en el inicio de sesión'); // Si no es un éxito, lanzar un error
      }

      const data = await response.json();
      console.log('Inicio de sesión exitoso:', data);

      // Limpiar el formulario
      setUsername('');
      setPassword('');

      // Redirigir al usuario a la ruta StartScreen solo si el inicio de sesión es exitoso
      navigate('/CreateFirstNote');

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
    } finally {
      setLoading(false); // Finaliza el loading
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-start">
        <div className="flex">
          <img src="/img/brand.png" alt="Search Icon" className="w-[800px] h-[280px]" />
        </div>

        <div className="flex flex-col items-start space-y-4">
          <input
            type="text"
            className="bg-input-1 text-white p-3 rounded-[20px] h-[55px] w-[270px]"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="bg-input-1 text-white p-3 rounded-[20px] h-[55px] w-[270px]"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end w-[270px] mt-4">
            <button
              className={`bg-card-4 text-black p-3 rounded-[20px] h-[55px] w-[135px] ${isHovered ? 'bg-card-6' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleLogin} // Llamar a la función al hacer clic
              disabled={loading} // Deshabilitar el botón durante el loading
            >
              {loading ? 'Logging in...' : 'Log-in'} {/* Cambiar texto del botón mientras carga */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoggInCampusNotes;
