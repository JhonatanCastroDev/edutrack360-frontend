'use client'

/**
 * Panel de control del rol Docente.
 *
 * Presenta al docente sus cursos asignados, sus indicadores y su actividad
 * reciente, con accesos directos a las dos tareas que realiza a diario:
 * registrar asistencia y registrar calificaciones.
 */
import Link from 'next/link';
import React from 'react';
import { Calendar, FileText, BookOpen, Users, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Sidebar from '@/components/sidebar';

export default function DocenteInicio() {
  // Datos de demostración. Al integrar el backend Java, estos arreglos se
  // reemplazan por las respuestas de la API; la estructura de cada objeto ya
  // corresponde a las columnas de las tablas del esquema edutrack360.
  const courses = [
    { id: 1, name: '10-A', students: 28, subject: 'Matemáticas', schedule: 'Lun-Mie-Vie 8:00-9:30' },
    { id: 2, name: '10-B', students: 25, subject: 'Matemáticas', schedule: 'Mar-Jue 10:00-11:30' },
    { id: 3, name: '11-A', students: 30, subject: 'Álgebra', schedule: 'Lun-Mie 14:00-15:30' },
  ];

  const recentActivities = [
    { id: 1, type: 'asistencia', course: '10-A', action: 'Registrada asistencia', time: 'Hace 2 horas' },
    { id: 2, type: 'calificacion', course: '10-B', action: 'Calificaciones actualizadas', time: 'Hace 5 horas' },
    { id: 3, type: 'asistencia', course: '11-A', action: 'Registrada asistencia', time: 'Ayer' },
  ];

  const stats = [
    { title: 'Cursos Asignados', value: '3', icon: BookOpen, color: 'bg-blue-100 text-blue-600' },
    { title: 'Total Estudiantes', value: '83', icon: Users, color: 'bg-green-100 text-green-600' },
    { title: 'Asistencia Promedio', value: '94%', icon: TrendingUp, color: 'bg-purple-100 text-purple-600' },
    { title: 'Clases Hoy', value: '4', icon: Clock, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="docente" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Bienvenida, María García</h1>
            <p className="text-gray-500 mt-1">Panel de control del docente</p>
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
            {/* Cursos Asignados */}
            <div className="col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Cursos</CardTitle>
                  <CardDescription>Cursos asignados para el período actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courses.map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">{course.name}</h3>
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {course.students} estudiantes
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{course.subject}</p>
                            <p className="text-xs text-gray-500 mt-1">{course.schedule}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="sm">
                            <Link href="/docente/calificaciones">Ver Detalles</Link>
                          </Button>
                        </div>
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
                  <CardDescription>Últimas acciones realizadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className={`w-2 h-2 mt-2 rounded-full ${activity.type === 'asistencia' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.course}</p>
                          <p className="text-xs text-gray-600">{activity.action}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Acciones Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button asChild className="w-full justify-start" variant="outline">
                      <Link href="/docente/asistencias">
                        <Calendar className="w-4 h-4 mr-2" />
                        Registrar Asistencia
                      </Link>
                    </Button>
                    <Button asChild className="w-full justify-start" variant="outline">
                      <Link href="/docente/calificaciones">
                        <FileText className="w-4 h-4 mr-2" />
                        Registrar Calificaciones
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