'use client'

/**
 * Barra de navegación lateral compartida por toda la aplicación.
 *
 * Es el componente reutilizable más importante del proyecto: una sola
 * implementación sirve a los tres roles del sistema. En vez de escribir un menú
 * por rol, el componente recibe la propiedad `role` y con ella decide qué
 * opciones mostrar y qué datos de perfil presentar al pie.
 *
 * Da respuesta al caso de uso CU-04, que exige que el sistema redirija a cada
 * usuario a la interfaz que le corresponde según su rol.
 *
 * Conceptos de React que se aplican aquí:
 *  - Componente de función que recibe propiedades (props).
 *  - Renderizado de listas con `map`, asignando una `key` estable a cada
 *    elemento para que React pueda identificarlo entre renderizados.
 *  - El hook `usePathname` de Next.js, para resaltar la opción activa.
 *  - Renderizado condicional, que muestra el enlace de configuración solo al
 *    rol administrativo.
 */
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, FileText, User, Users, Settings, LogOut, GraduationCap, LucideIcon } from 'lucide-react';

export type Role = 'admin' | 'docente' | 'acudiente';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  activeClass: string;
};

const navByRole: Record<Role, NavItem[]> = {
  admin: [
    { href: '/inicio', label: 'Inicio', icon: Home, activeClass: 'text-blue-600 bg-blue-50' },
    { href: '/asistencias', label: 'Asistencias', icon: Calendar, activeClass: 'text-green-600 bg-green-50' },
    { href: '/calificaciones', label: 'Calificaciones', icon: FileText, activeClass: 'text-purple-600 bg-purple-50' },
    { href: '/usuarios', label: 'Usuarios', icon: Users, activeClass: 'text-blue-600 bg-blue-50' },
  ],
  docente: [
    { href: '/docente/inicio', label: 'Inicio', icon: Home, activeClass: 'text-blue-600 bg-blue-50' },
    { href: '/docente/asistencias', label: 'Asistencia', icon: Calendar, activeClass: 'text-green-600 bg-green-50' },
    { href: '/docente/calificaciones', label: 'Calificaciones', icon: FileText, activeClass: 'text-purple-600 bg-purple-50' },
    { href: '/docente/perfil', label: 'Perfil Docente', icon: User, activeClass: 'text-orange-600 bg-orange-50' },
  ],
  acudiente: [
    { href: '/acudiente/inicio', label: 'Inicio', icon: Home, activeClass: 'text-blue-600 bg-blue-50' },
    { href: '/acudiente/asistencias', label: 'Asistencia', icon: Calendar, activeClass: 'text-green-600 bg-green-50' },
    { href: '/acudiente/calificaciones', label: 'Calificaciones', icon: FileText, activeClass: 'text-purple-600 bg-purple-50' },
    { href: '/acudiente/perfil', label: 'Perfil Acudiente', icon: User, activeClass: 'text-orange-600 bg-orange-50' },
  ],
};

const profileByRole: Record<Role, { initials: string; name: string; detail: string; settings: boolean }> = {
  admin: { initials: 'JC', name: 'Jhonatan Castro', detail: 'Administrativo', settings: true },
  docente: { initials: 'MG', name: 'María García', detail: 'Docente - Matemáticas', settings: false },
  acudiente: { initials: 'RG', name: 'Roberto Gómez', detail: 'Acudiente', settings: false },
};

export default function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const items = navByRole[role];
  const profile = profileByRole[role];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href={`/${role === 'admin' ? 'inicio' : role + '/inicio'}`} className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
            <GraduationCap className="w-6 h-6 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-xl font-bold">
            <span className="text-blue-600">EduTrack</span>
            <span className="text-gray-900">360</span>
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive ? item.activeClass : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
            {profile.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{profile.name}</p>
            <p className="text-xs text-gray-500 truncate">{profile.detail}</p>
          </div>
        </div>
        {profile.settings && (
          <Link
            href="/usuarios"
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors mb-1"
          >
            <Settings className="w-4 h-4" />
            Configuración
          </Link>
        )}
        <Link
          href="/"
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </Link>
      </div>
    </div>
  );
}
