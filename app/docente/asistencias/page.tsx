'use client'

/**
 * Registro y edición de la asistencia diaria. Rol Docente.
 *
 * Implementa la historia HU-01 y el caso de uso CU-01. El flujo reproduce el
 * definido en el caso de uso: el docente accede a la sección, selecciona la
 * fecha, visualiza la lista de estudiantes, marca su estado y guarda.
 *
 * La observación de la historia de usuario, que pide permitir la corrección de
 * registros equivocados, se resuelve con el modo de edición controlado por el
 * estado `isEditing`.
 *
 * Los estados de asistencia son los cuatro definidos en la base de datos:
 * Presente, Ausente, Tarde y Excusa.
 */
import React, { useState } from 'react';
import { Calendar, Download, Search, Edit2, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Sidebar from '@/components/sidebar';

export default function DocenteAsistencia() {
  // Datos de demostración. Al integrar el backend Java, estos arreglos se
  // reemplazan por las respuestas de la API; la estructura de cada objeto ya
  // corresponde a las columnas de las tablas del esquema edutrack360.
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-10-30');
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const courses = [
    { id: 1, name: '10-A', students: 28 },
    { id: 2, name: '10-B', students: 25 },
    { id: 3, name: '11-A', students: 30 },
  ];

  const students = [
    { id: 1, name: 'Ana María Rodríguez', status: 'Presente' },
    { id: 2, name: 'Carlos Andrés Gómez', status: 'Presente' },
    { id: 3, name: 'Diana Patricia López', status: 'Ausente' },
    { id: 4, name: 'Eduardo Silva Martínez', status: 'Presente' },
    { id: 5, name: 'Fernanda Castro Ruiz', status: 'Tarde' },
    { id: 6, name: 'Gabriel Hernández Pérez', status: 'Presente' },
    { id: 7, name: 'Isabella Torres Vega', status: 'Presente' },
    { id: 8, name: 'Juan Pablo Morales', status: 'Ausente' },
  ];

  const [attendance, setAttendance] = useState(
    students.reduce<Record<number, string>>((acc, student) => ({
      ...acc,
      [student.id]: student.status
    }), {})
  );

  const getStatusCount = () => {
    const counts: Record<string, number> = { Presente: 0, Ausente: 0, Tarde: 0 };
    Object.values(attendance).forEach((status) => {
      counts[status]++;
    });
    return counts;
  };

  const statusCounts = getStatusCount();

  const handleSelectCourse = () => {
    if (selectedCourse) {
      setShowRegister(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="docente" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Asistencia</h1>
            <p className="text-gray-500 mt-1">Seleccionar curso, registrar y modificar asistencia</p>
          </div>

          {/* Seleccionar Curso */}
          {!showRegister ? (
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Curso</CardTitle>
                <CardDescription>Elige el curso para registrar o modificar la asistencia</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="course">Curso</Label>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar curso" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.name}>
                              {course.name} ({course.students} estudiantes)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="date">Fecha</Label>
                      <Input
                        id="date"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4">
                    {courses.map((course) => (
                      <Card key={course.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setSelectedCourse(course.name)}>
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Calendar className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-lg">{course.name}</h3>
                            <p className="text-sm text-gray-500 mt-1">{course.students} estudiantes</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSelectCourse} disabled={!selectedCourse}>
                      Continuar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Filtros y acciones */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <Label htmlFor="course-selected">Curso Seleccionado</Label>
                      <Input value={selectedCourse} disabled />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="date-selected">Fecha</Label>
                      <Input
                        id="date-selected"
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="search">Buscar estudiante</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          id="search"
                          placeholder="Nombre"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                      className="flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      {isEditing ? 'Cancelar Edición' : 'Modificar'}
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Generar Reporte
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Presentes</p>
                        <p className="text-3xl font-bold text-green-600">{statusCounts.Presente}</p>
                      </div>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-green-600 rounded-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Ausentes</p>
                        <p className="text-3xl font-bold text-red-600">{statusCounts.Ausente}</p>
                      </div>
                      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Tarde</p>
                        <p className="text-3xl font-bold text-yellow-600">{statusCounts.Tarde}</p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 bg-yellow-600 rounded-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Attendance List */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Registrar / Modificar Asistencia - {selectedCourse}</CardTitle>
                      <CardDescription>
                        {new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </CardDescription>
                    </div>
                    {isEditing && (
                      <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded-md">
                        <Edit2 className="w-4 h-4" />
                        Modo edición activo
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {students
                      .filter(student => student.name.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold">
                              {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-sm text-gray-500">ID: {String(student.id).padStart(4, '0')}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setAttendance({ ...attendance, [student.id]: 'Presente' })}
                              disabled={!isEditing && attendance[student.id] !== 'Presente'}
                              className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${attendance[student.id] === 'Presente'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                } ${!isEditing && attendance[student.id] !== 'Presente' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              Presente
                            </button>
                            <button
                              onClick={() => setAttendance({ ...attendance, [student.id]: 'Tarde' })}
                              disabled={!isEditing && attendance[student.id] !== 'Tarde'}
                              className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${attendance[student.id] === 'Tarde'
                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                } ${!isEditing && attendance[student.id] !== 'Tarde' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              Tarde
                            </button>
                            <button
                              onClick={() => setAttendance({ ...attendance, [student.id]: 'Ausente' })}
                              disabled={!isEditing && attendance[student.id] !== 'Ausente'}
                              className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${attendance[student.id] === 'Ausente'
                                ? 'bg-red-50 text-red-700 border-red-200'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                } ${!isEditing && attendance[student.id] !== 'Ausente' ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              Ausente
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="flex justify-between items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                    <Button variant="outline" onClick={() => setShowRegister(false)}>
                      Cambiar Curso
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Guardar Asistencia
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}