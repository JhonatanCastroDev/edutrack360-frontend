'use client'

/**
 * Pantalla de inicio de sesión. Es la ruta raíz de la aplicación.
 *
 * Implementa el caso de uso CU-04 en su parte de autenticación: el usuario se
 * identifica y el sistema lo lleva a la interfaz que corresponde a su rol.
 *
 * Advertencia: la validación es simulada. Se compara el usuario contra el
 * objeto CUENTAS y no se verifica contraseña ni se crea sesión. La
 * autenticación real se resolverá cuando el frontend consuma el backend Java.
 *
 * Conceptos de React que se aplican aquí:
 *  - El hook `useState` para manejar el estado de cada campo del formulario,
 *    de modo que el valor mostrado siempre proviene del estado (componentes
 *    controlados).
 *  - Manejo de eventos: `onSubmit` en el formulario, `onChange` en los campos
 *    y `onClick` en los botones de acceso rápido.
 *  - `useRouter` de Next.js para navegar por código tras validar.
 *  - Renderizado condicional del mensaje de error y del icono que alterna
 *    entre mostrar y ocultar la contraseña.
 */
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

// Credenciales de demostración: usuario = contraseña = rol
const CUENTAS: Record<string, { ruta: string; etiqueta: string }> = {
  admin: { ruta: '/inicio', etiqueta: 'Administrativo' },
  docente: { ruta: '/docente/inicio', etiqueta: 'Docente' },
  acudiente: { ruta: '/acudiente/inicio', etiqueta: 'Acudiente' },
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    const cuenta = CUENTAS[usuario.trim().toLowerCase()];
    if (!cuenta) {
      setError('Usa una de las cuentas de demostración: admin, docente o acudiente.');
      return;
    }
    setError('');
    router.push(cuenta.ruta);
  };

  const accesoRapido = (clave: string) => {
    setUsuario(clave);
    setPassword(clave);
    setError('');
    router.push(CUENTAS[clave].ruta);
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

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-1">Iniciar Sesión</h2>
              <p className="text-gray-500 text-sm">Ingresa tus credenciales para acceder a tu cuenta</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Usuario
              </label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="acudiente"
                autoComplete="username"
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
                  autoComplete="current-password"
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

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

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
              <button type="button" className="text-sm text-gray-900 hover:underline font-medium">
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm"
            >
              Iniciar Sesión
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
              Cuentas de demostración
            </p>
            <div className="space-y-2">
              {Object.entries(CUENTAS).map(([clave, cuenta]) => (
                <button
                  key={clave}
                  type="button"
                  onClick={() => accesoRapido(clave)}
                  className="w-full flex items-center justify-between px-3 py-2 border border-gray-200 rounded-md text-sm hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{cuenta.etiqueta}</span>
                  <span className="text-xs text-gray-500 font-mono">{clave} / {clave}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <button type="button" className="text-gray-900 hover:underline font-medium">
                Contacta al administrador
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2026 EduTrack360. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
