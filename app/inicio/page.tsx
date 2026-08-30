'use client'

/**
 * Panel de control del rol Administrativo.
 *
 * Es la pantalla a la que llega el administrativo tras iniciar sesión. Reúne
 * los indicadores generales de la institución y los accesos a los tres módulos
 * que administra: usuarios, asistencias y calificaciones.
 *
 * Los indicadores se muestran hoy con valores fijos; provendrán de consultas
 * al backend cuando se realice la integración.
 *
 * Conceptos de React: composición de componentes reutilizables (Card, Button),
 * renderizado de listas con `map` y navegación declarativa con `Link`.
 */
import React from 'react';
import Link from 'next/link';
import { Users, Calendar, FileText, BookOpen, TrendingUp, GraduationCap, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/sidebar';

export default function AdminInicio() {
  // Datos de demostración. Al integrar el backend Java, estos arreglos se
  // reemplazan por las respuestas de la API; la estructura de cada objeto ya
  // corresponde a las columnas de las tablas del esquema edutrack360.
  const stats = [
    { title: 'Usuarios Registrados', value: '412', icon: Users, color: 'bg-blue-100 text-blue-600' },
    { title: 'Cursos Activos', value: '12', icon: BookOpen, color: 'bg-green-100 text-green-600' },
    { title: 'Asistencia Promedio', value: '93%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
    { title: 'Período Actual', value: 'P4', icon: CalendarDays, color: 'bg-orange-100 text-orange-600' },
  ];

  const modules = [
    {
      href: '/usuarios',
      title: 'Usuarios',
      description: 'Registrar y gestionar administrativos, docentes y acudientes',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      href: '/asistencias',
      title: 'Asistencias',
      description: 'Consultar y exportar el registro diario de asistencia por curso',
      icon: Calendar,
      color: 'bg-green-100 text-green-600',
    },
    {
      href: '/calificaciones',
      title: 'Calificaciones',
      description: 'Administrar cursos, asignaturas, períodos y notas',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const recentActivities = [
    { id: 1, action: 'Nuevo usuario registrado', detail: 'Sandra Rodríguez - Acudiente', time: 'Hace 1 hora' },
    { id: 2, action: 'Asistencia registrada', detail: '10-A - Matemáticas', time: 'Hace 3 horas' },
    { id: 3, action: 'Calificaciones cerradas', detail: '11-A - Período 3', time: 'Ayer' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Bienvenido, Jhonatan Castro</h1>
            <p className="text-gray-500 mt-1">Panel de control administrativo</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Módulos */}
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Módulos del sistema</CardTitle>
                  <CardDescription>Accede a la gestión de EduTrack360</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {modules.map((module) => (
                      <div
                        key={module.href}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${module.color}`}>
                            <module.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{module.title}</h3>
                            <p className="text-sm text-gray-600">{module.description}</p>
                          </div>
                        </div>
                        <Button asChild variant="outline" size="sm">
                          <Link href={module.href}>Ingresar</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Actividad Reciente */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Actividad Reciente</CardTitle>
                  <CardDescription>Últimos movimientos del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.detail}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Accesos rápidos */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Portales por rol</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button asChild className="w-full justify-start" variant="outline">
                      <Link href="/docente/inicio">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Portal del Docente
                      </Link>
                    </Button>
                    <Button asChild className="w-full justify-start" variant="outline">
                      <Link href="/acudiente/inicio">
                        <Users className="w-4 h-4 mr-2" />
                        Portal del Acudiente
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
