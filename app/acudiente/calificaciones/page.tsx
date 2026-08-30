'use client'

/**
 * Consulta de las calificaciones del estudiante. Rol Acudiente.
 *
 * Parte de la historia HU-06 y del caso de uso CU-03. Muestra las notas por
 * período y asignatura, con el promedio y las observaciones que registró el
 * docente.
 *
 * El color de cada nota comunica el nivel de desempeño de un vistazo, sin
 * obligar al acudiente a interpretar el número, que es lo que pide la
 * observación de la historia sobre orientar la interfaz al usuario no técnico.
 */
import React, { useState } from 'react';
import { FileText, Download, ChevronRight, TrendingUp, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Sidebar from '@/components/sidebar';

export default function AcudienteCalificaciones() {
  // Datos de demostración. Al integrar el backend Java, estos arreglos se
  // reemplazan por las respuestas de la API; la estructura de cada objeto ya
  // corresponde a las columnas de las tablas del esquema edutrack360.
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('Periodo 3');
  const [showDetails, setShowDetails] = useState(false);

  const students = [
    { id: 1, name: 'Carlos Andrés Gómez', course: '10-A' },
    { id: 2, name: 'Laura Sofía Gómez', course: '8-B' },
  ];

  const periods = ['Periodo 1', 'Periodo 2', 'Periodo 3', 'Periodo 4'];

  const grades = [
    {
      subject: 'Matemáticas',
      teacher: 'Prof. María García',
      grade1: 4.5,
      grade2: 4.8,
      grade3: 4.6,
      final: 4.6,
      observations: 'Excelente desempeño'
    },
    {
      subject: 'Español',
      teacher: 'Prof. Laura Martínez',
      grade1: 3.8,
      grade2: 4.0,
      grade3: 3.9,
      final: 3.9,
      observations: 'Buen progreso'
    },
    {
      subject: 'Ciencias',
      teacher: 'Prof. Pedro Gómez',
      grade1: 4.9,
      grade2: 5.0,
      grade3: 4.8,
      final: 4.9,
      observations: 'Sobresaliente'
    },
    {
      subject: 'Inglés',
      teacher: 'Prof. Sandra Torres',
      grade1: 3.5,
      grade2: 3.7,
      grade3: 3.8,
      final: 3.7,
      observations: 'Debe mejorar participación'
    },
    {
      subject: 'Sociales',
      teacher: 'Prof. Roberto Díaz',
      grade1: 4.2,
      grade2: 4.4,
      grade3: 4.3,
      final: 4.3,
      observations: 'Buen nivel académico'
    },
    {
      subject: 'Educación Física',
      teacher: 'Prof. Carlos Ruiz',
      grade1: 4.7,
      grade2: 4.5,
      grade3: 4.6,
      final: 4.6,
      observations: 'Excelente desempeño físico'
    },
  ];

  const periodAverages = {
    period1: 4.2,
    period2: 4.3,
    period3: 4.4,
    final: 4.3
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 4.5) return 'text-green-600 bg-green-50';
    if (grade >= 3.5) return 'text-blue-600 bg-blue-50';
    if (grade >= 3.0) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getGradeColorText = (grade: number) => {
    if (grade >= 4.5) return 'text-green-600';
    if (grade >= 3.5) return 'text-blue-600';
    if (grade >= 3.0) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPerformanceLevel = (grade: number) => {
    if (grade >= 4.5) return 'Excelente';
    if (grade >= 4.0) return 'Sobresaliente';
    if (grade >= 3.5) return 'Aceptable';
    if (grade >= 3.0) return 'Básico';
    return 'Bajo';
  };

  const handleSelectStudent = () => {
    if (selectedStudent) {
      setShowDetails(true);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="acudiente" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Calificaciones</h1>
            <p className="text-gray-500 mt-1">Consulta las calificaciones de tus hijos</p>
          </div>

          {/* Seleccionar Estudiante */}
          {!showDetails ? (
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Estudiante</CardTitle>
                <CardDescription>Elige el estudiante para ver sus calificaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="student">Estudiante</Label>
                    <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar estudiante" />
                      </SelectTrigger>
                      <SelectContent>
                        {students.map((student) => (
                          <SelectItem key={student.id} value={student.name}>
                            {student.name} - {student.course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {students.map((student) => (
                      <Card
                        key={student.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => {
                          setSelectedStudent(student.name);
                          setShowDetails(true);
                        }}
                      >
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <FileText className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">{student.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{student.course}</p>
                            <div className="flex items-center justify-center gap-2 mt-3">
                              <span className="text-sm text-gray-500">Ver calificaciones</span>
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSelectStudent} disabled={!selectedStudent}>
                      Continuar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Filtros */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-end gap-4">
                    <div className="flex-1">
                      <Label>Estudiante Seleccionado</Label>
                      <Input value={selectedStudent} disabled />
                    </div>
                    <div className="flex-1">
                      <Label>Período Académico</Label>
                      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {periods.map((period) => (
                            <SelectItem key={period} value={period}>
                              {period}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline" onClick={() => setShowDetails(false)}>
                      Cambiar Estudiante
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Generar Reporte
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Ver Promedio */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Promedio General</CardTitle>
                  <CardDescription>Rendimiento académico del estudiante</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Periodo 1</p>
                      <p className={`text-3xl font-bold ${getGradeColorText(periodAverages.period1)}`}>
                        {periodAverages.period1.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Periodo 2</p>
                      <p className={`text-3xl font-bold ${getGradeColorText(periodAverages.period2)}`}>
                        {periodAverages.period2.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Periodo 3</p>
                      <p className={`text-3xl font-bold ${getGradeColorText(periodAverages.period3)}`}>
                        {periodAverages.period3.toFixed(1)}
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-100 rounded-lg border-2 border-purple-300">
                      <p className="text-sm text-gray-600 mb-1">Promedio Final</p>
                      <p className={`text-3xl font-bold ${getGradeColorText(periodAverages.final)}`}>
                        {periodAverages.final.toFixed(1)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6 p-6 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Award className={`w-16 h-16 ${getGradeColorText(periodAverages.final)}`} />
                      <div>
                        <p className="text-sm text-gray-600">Nivel de Desempeño</p>
                        <p className={`text-4xl font-bold ${getGradeColorText(periodAverages.final)}`}>
                          {getPerformanceLevel(periodAverages.final)}
                        </p>
                      </div>
                    </div>
                    <div className="h-16 w-px bg-gray-300"></div>
                    <div className="flex items-center gap-4">
                      <TrendingUp className="w-16 h-16 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Tendencia</p>
                        <p className="text-4xl font-bold text-blue-600">↗ Positiva</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ver Notas */}
              <Card>
                <CardHeader>
                  <CardTitle>Notas por Asignatura - {selectedPeriod}</CardTitle>
                  <CardDescription>Detalle de calificaciones por materia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Asignatura</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Docente</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900">Nota 1</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900">Nota 2</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900">Nota 3</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900">Definitiva</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Observaciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grades.map((grade, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <p className="font-medium text-gray-900">{grade.subject}</p>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-600">{grade.teacher}</p>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.grade1)}`}>
                                  {grade.grade1.toFixed(1)}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.grade2)}`}>
                                  {grade.grade2.toFixed(1)}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.grade3)}`}>
                                  {grade.grade3.toFixed(1)}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(grade.final)}`}>
                                  {grade.final.toFixed(1)}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <p className="text-sm text-gray-600 italic">{grade.observations}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Escala de Valoración</h4>
                    <div className="grid grid-cols-5 gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-600 rounded"></div>
                        <span className="text-gray-700">4.5 - 5.0: Excelente</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span className="text-gray-700">4.0 - 4.4: Sobresaliente</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                        <span className="text-gray-700">3.5 - 3.9: Aceptable</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-600 rounded"></div>
                        <span className="text-gray-700">3.0 - 3.4: Básico</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-600 rounded"></div>
                        <span className="text-gray-700">0.0 - 2.9: Bajo</span>
                      </div>
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