'use client'
import React, { useState } from 'react';
import { Home, Calendar, FileText, Users, Settings, LogOut, Plus, Edit, Download, BookOpen, GraduationCap, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CalificacionesPage() {
  const [activeTab, setActiveTab] = useState('gestionar');

  // Datos de ejemplo
  const courses = [
    { id: 1, name: '10-A', students: 28, teacher: 'Prof. María García' },
    { id: 2, name: '10-B', students: 25, teacher: 'Prof. Carlos Ruiz' },
    { id: 3, name: '11-A', students: 30, teacher: 'Prof. Ana López' },
  ];

  const subjects = [
    { id: 1, name: 'Matemáticas', hours: 5, teacher: 'Prof. Juan Pérez' },
    { id: 2, name: 'Español', hours: 4, teacher: 'Prof. Laura Martínez' },
    { id: 3, name: 'Ciencias', hours: 4, teacher: 'Prof. Pedro Gómez' },
    { id: 4, name: 'Inglés', hours: 3, teacher: 'Prof. Sandra Torres' },
    { id: 5, name: 'Sociales', hours: 3, teacher: 'Prof. Roberto Díaz' },
  ];

  const periods = [
    { id: 1, name: 'Periodo 1', startDate: '2024-01-15', endDate: '2024-03-30' },
    { id: 2, name: 'Periodo 2', startDate: '2024-04-01', endDate: '2024-06-15' },
    { id: 3, name: 'Periodo 3', startDate: '2024-07-01', endDate: '2024-09-20' },
    { id: 4, name: 'Periodo 4', startDate: '2024-09-25', endDate: '2024-11-30' },
  ];

  const students = [
    { id: 1, name: 'Ana María Rodríguez', grade1: 4.5, grade2: 4.8, grade3: 4.6, final: 4.6 },
    { id: 2, name: 'Carlos Andrés Gómez', grade1: 3.8, grade2: 4.0, grade3: 3.9, final: 3.9 },
    { id: 3, name: 'Diana Patricia López', grade1: 4.9, grade2: 5.0, grade3: 4.8, final: 4.9 },
    { id: 4, name: 'Eduardo Silva Martínez', grade1: 3.5, grade2: 3.7, grade3: 3.8, final: 3.7 },
    { id: 5, name: 'Fernanda Castro Ruiz', grade1: 4.2, grade2: 4.4, grade3: 4.3, final: 4.3 },
  ];

  const getGradeColor = (grade) => {
    if (grade >= 4.5) return 'text-green-600 bg-green-50';
    if (grade >= 3.5) return 'text-blue-600 bg-blue-50';
    if (grade >= 3.0) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
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
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
              <Home className="w-5 h-5" />
              Inicio
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
              <Calendar className="w-5 h-5" />
              Asistencias
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-md">
              <FileText className="w-5 h-5" />
              Calificaciones
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
              <Users className="w-5 h-5" />
              Usuarios
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold">
              JC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Jhonatan Castro</p>
              <p className="text-xs text-gray-500 truncate">jjcastro.pf@teacchapp...</p>
            </div>
          </div>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 transition-colors mb-1">
            <Settings className="w-4 h-4" />
            Configuración
          </button>
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Calificaciones</h1>
            <p className="text-gray-500 mt-1">Gestionar cursos, asignaturas y períodos académicos</p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList>
              <TabsTrigger value="gestionar">Gestionar Curso</TabsTrigger>
              <TabsTrigger value="asignaturas">Asignaturas</TabsTrigger>
              <TabsTrigger value="periodos">Períodos Académicos</TabsTrigger>
            </TabsList>

            {/* Gestionar Curso */}
            <TabsContent value="gestionar" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Cursos Disponibles</h2>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Crear Nuevo Curso
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {courses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{course.name}</CardTitle>
                            <CardDescription>{course.students} estudiantes</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">
                        <span className="font-medium">Docente:</span> {course.teacher}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                        <Button size="sm" className="flex-1">
                          Ver Detalles
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Asignaturas */}
            <TabsContent value="asignaturas" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Asignaturas</h2>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Crear/Asignar Asignatura
                </Button>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {subjects.map((subject) => (
                      <div
                        key={subject.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{subject.name}</p>
                            <p className="text-sm text-gray-500">{subject.teacher} • {subject.hours} horas semanales</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-3 h-3 mr-1" />
                            Editar
                          </Button>
                          <Button size="sm">Ver Más</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Períodos Académicos */}
            <TabsContent value="periodos" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Períodos Académicos</h2>
                <Button className="flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Definir Período Académico
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {periods.map((period) => (
                  <Card key={period.id}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CalendarDays className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle>{period.name}</CardTitle>
                          <CardDescription>
                            {new Date(period.startDate).toLocaleDateString('es-ES')} - {new Date(period.endDate).toLocaleDateString('es-ES')}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          Editar
                        </Button>
                        <Button size="sm" className="flex-1">Ver Detalles</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}