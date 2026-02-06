'use client'
import React from 'react';
import { Home, Calendar, FileText, User, LogOut, TrendingUp, Clock, Award, AlertCircle, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AcudienteInicio() {
  const students = [
    {
      id: 1,
      name: 'Carlos Andrés Gómez',
      course: '10-A',
      attendance: 95,
      average: 4.3,
      status: 'good'
    },
    {
      id: 2,
      name: 'Laura Sofía Gómez',
      course: '8-B',
      attendance: 88,
      average: 3.8,
      status: 'warning'
    },
  ];

  const recentActivities = [
    { id: 1, student: 'Carlos Andrés', type: 'asistencia', action: 'Presente', course: '10-A', time: 'Hoy 8:30 AM' },
    { id: 2, student: 'Laura Sofía', type: 'calificacion', action: 'Nueva nota: 4.5', course: '8-B - Matemáticas', time: 'Ayer' },
    { id: 3, student: 'Carlos Andrés', type: 'calificacion', action: 'Nueva nota: 4.2', course: '10-A - Español', time: 'Hace 2 días' },
  ];

  const alerts = [
    { id: 1, student: 'Laura Sofía', message: 'Asistencia por debajo del 90%', severity: 'warning' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'danger':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center shadow-sm">
              <GraduationCap className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <h1 className="text-xl font-bold">
              <span className="text-blue-600">EduTrack</span>
              <span className="text-gray-900">360</span>
            </h1>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
              <Home className="w-5 h-5" />
              Inicio
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
              <Calendar className="w-5 h-5" />
              Asistencia
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
              <FileText className="w-5 h-5" />
              Calificaciones
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5" />
              Perfil Acudiente
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
              RG
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Roberto Gómez</p>
              <p className="text-xs text-gray-500 truncate">Acudiente</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors">
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Bienvenido, Roberto Gómez</h1>
            <p className="text-gray-500 mt-1">Seguimiento académico de tus hijos</p>
          </div>

          {/* Alertas */}
          {alerts.length > 0 && (
            <Card className="mb-6 border-yellow-200 bg-yellow-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-800">
                  <AlertCircle className="w-5 h-5" />
                  Alertas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between p-3 bg-white rounded-md">
                      <div>
                        <p className="font-medium text-gray-900">{alert.student}</p>
                        <p className="text-sm text-gray-600">{alert.message}</p>
                      </div>
                      <Button size="sm" variant="outline">Ver Detalles</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-3 gap-6">
            {/* Estudiantes a Cargo */}
            <div className="col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Hijos</CardTitle>
                  <CardDescription>Resumen del desempeño académico</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {students.map((student) => (
                      <Card key={student.id} className={`border-2 ${getStatusColor(student.status)}`}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold">
                                {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{student.name}</h3>
                                <p className="text-sm text-gray-600">{student.course}</p>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <Clock className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-600">Asistencia</p>
                                <p className="text-lg font-bold text-gray-900">{student.attendance}%</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Award className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-600">Promedio</p>
                                <p className="text-lg font-bold text-gray-900">{student.average.toFixed(1)}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="text-xs text-gray-600">Rendimiento</p>
                                <p className="text-lg font-bold text-gray-900">
                                  {student.status === 'good' ? 'Bueno' : student.status === 'warning' ? 'Regular' : 'Bajo'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm" className="flex-1">Ver Asistencia</Button>
                            <Button variant="outline" size="sm" className="flex-1">Ver Calificaciones</Button>
                          </div>
                        </CardContent>
                      </Card>
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
                  <CardDescription>Últimas actualizaciones</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className={`w-2 h-2 mt-2 rounded-full ${activity.type === 'asistencia' ? 'bg-green-500' : 'bg-purple-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.student}</p>
                          <p className="text-xs text-gray-600">{activity.action}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.course}</p>
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
                    <Button className="w-full justify-start" variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Ver Asistencia
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Ver Calificaciones
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