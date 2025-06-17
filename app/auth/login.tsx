// app/auth/login.tsx
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, remember });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-[#20c997] mb-2">RutaFácil</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-6">Inicio de sesión</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Usuario</label>
            <input
              type="email"
              placeholder="example@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20c997]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#20c997]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="text-gray-700">Recordarme</span>
            </label>
            <a href="/auth/forgot-password" className="text-[#20c997] hover:underline text-sm">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#20c997] hover:bg-[#1aa179] text-white py-2 rounded-lg font-semibold"
          >
            INICIAR SESIÓN
          </button>
        </form>

        <p className="text-center text-gray-700 mt-4">
          ¿No tienes una cuenta?{' '}
          <a href="/auth/register" className="text-[#20c997] font-semibold hover:underline">
            Regístrate
          </a>
        </p>

        <div className="mt-6 text-center text-gray-500">O inicia sesión con:</div>
        <button className="mt-2 w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
          <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
          <span>Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
