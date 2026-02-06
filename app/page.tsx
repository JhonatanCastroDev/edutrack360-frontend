'use client'
import React, { useState } from 'react';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    alert('Redirigiendo al dashboard...');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gray-200 rounded-full opacity-30"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-300 rounded-full opacity-20"></div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 items-center justify-center relative z-10">
        <div className="relative">
          <div className="w-96 h-96 bg-white/50 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-200 shadow-lg">
            <div className="w-80 h-80 bg-white/70 rounded-full flex items-center justify-center backdrop-blur-sm">
              <div className="w-64 h-64 bg-gray-800 rounded-full flex items-center justify-center shadow-xl">
                <GraduationCap className="w-32 h-32 text-white" strokeWidth={1.5} />
              </div>
            </div>
          </div>
          <div className="absolute top-10 right-10 w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200">
            <svg className="w-10 h-10 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute bottom-20 left-10 w-16 h-16 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-200">
            <svg className="w-10 h-10 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
                <GraduationCap className="w-10 h-10 text-white" strokeWidth={2} />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              EduTrack<span className="text-gray-600">360</span>
            </h1>
            <p className="text-gray-500 mt-2 text-sm">Plataforma de gestión educativa</p>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">Iniciar Sesión</h2>
              <p className="text-gray-500 text-sm">Ingresa tus credenciales para acceder a tu cuenta</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="profesor@edutrack360.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm text-gray-900 placeholder-gray-400 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm text-gray-900 placeholder-gray-400 bg-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border-gray-300 rounded cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-700">Recordarme</span>
              </label>
              <button className="text-sm text-gray-900 hover:underline font-medium">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-gray-900 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm"
            >
              Iniciar Sesión
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <button className="text-gray-900 hover:underline font-medium">
                Contacta al administrador
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2024 EduTrack360. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}