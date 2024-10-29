import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingInCampusNotes = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar el loading
  const navigate = useNavigate(); // Hook para navegar

  // Función para manejar el registro
  const handleRegister = async () => {
    const userData = {
      nombre_usuario: username,
      email: email,
      contrasena_hash: password,
    };

    setLoading(true); // Inicia el loading

    try {
      const response = await fetch('http://localhost:3000/user/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Error en el registro'); // Si no es un éxito, lanzar un error
      }

      const data = await response.json();
      console.log('Registro exitoso:', data);

      // Limpiar el formulario
      setUsername('');
      setEmail('');
      setPassword('');

      // Redirigir al usuario a la ruta de LogIn solo si el registro es exitoso
      navigate('/LogIn');

    } catch (error) {
      console.error('Error al registrar:', error);
      // Mantener en la misma vista sin mensajes de error
    } finally {
      setLoading(false); // Finaliza el loading
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col items-center justify-start">
        <div className="flex">
          <img src="/img/brand.png" alt="Search Icon" className="w-[650px] h-[250px]" />
        </div>

        <div className="flex flex-col items-start space-y-4">
          {/* Campo de Nombre de Usuario */}
          <label className="text-white mb-1 w-[270px]">Create Username</label>
          <input
            type="text"
            className="bg-input-1 text-white p-3 rounded-[20px] h-[55px] w-[270px]"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Campo de Correo Electrónico */}
          <label className="text-white mt-4 mb-1 w-[270px]">Email</label>
          <input
            type="email"
            className="bg-input-1 text-white p-3 rounded-[20px] h-[55px] w-[270px]"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Campo de Contraseña */}
          <label className="text-white mt-4 mb-1 w-[270px]">Create Password</label>
          <input
            type="password"
            className="bg-input-1 text-white p-3 rounded-[20px] h-[55px] w-[270px]"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Botón de Registro */}
          <div className="flex justify-end w-[270px] mt-4">
            <button
              className={`bg-card-5 text-black p-3 rounded-[20px] h-[55px] w-[135px] ${isHovered ? 'bg-card-3' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={handleRegister} // Llamar a la función al hacer clic
              disabled={loading} // Deshabilitar el botón durante el loading
            >
              {loading ? 'Registering...' : 'Register'} {/* Cambiar texto del botón mientras carga */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingInCampusNotes;
