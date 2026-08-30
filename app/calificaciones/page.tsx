'use client'

/**
 * Administración de cursos, asignaturas y períodos académicos.
 * Rol Administrativo.
 *
 * Da soporte a la historia HU-02: antes de que un docente pueda calificar,
 * alguien debe haber creado el curso, la asignatura y el período. Esta
 * pantalla gestiona esos tres catálogos, separados en pestañas para no
 * saturar una sola vista.
 *
 * Conceptos de React: el componente Tabs se maneja de forma controlada, con la
 * pestaña activa guardada en el estado mediante `useState`.
 */
import React, { useState } from 'react';
import { Plus, Edit, BookOpen, GraduationCap, CalendarDays } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Sidebar from '@/components/sidebar';

export default function CalificacionesPage() {
  // Datos de demostración. Al integrar el backend Java, estos arreglos se
  // reemplazan por las respuestas de la API; la estructura de cada objeto ya
  // corresponde a las columnas de las tablas del esquema edutrack360.
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

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />

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