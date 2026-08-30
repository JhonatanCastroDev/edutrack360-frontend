'use client'

/**
 * Registro y edición de calificaciones por período. Rol Docente.
 *
 * Implementa la historia HU-02 y el caso de uso CU-02. El criterio de
 * aceptación de esa historia exige que la interfaz permita las operaciones
 * sobre las calificaciones, y la observación pide permitir corregir registros
 * equivocados, que es la función del modo de edición.
 *
 * Las notas usan la escala colombiana de 0.0 a 5.0, la misma que la
 * restricción `ck_calificacion_nota` impone en la base de datos.
 *
 * Conceptos de React: estado derivado. El promedio de cada estudiante no se
 * guarda en el estado, se calcula a partir de las notas en cada renderizado,
 * de modo que nunca puede quedar desactualizado respecto de ellas.
 */
import React, { useState } from 'react';
import { Download, Edit2, Save, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Sidebar from '@/components/sidebar';

export default function DocenteCalificaciones() {
  // Datos de demostración. Al integrar el backend Java, estos arreglos se
  // reemplazan por las respuestas de la API; la estructura de cada objeto ya
  // corresponde a las columnas de las tablas del esquema edutrack360.
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const courses = [
    { id: 1, name: '10-A', students: 28, subject: 'Matemáticas' },
    { id: 2, name: '10-B', students: 25, subject: 'Matemáticas' },
    { id: 3, name: '11-A', students: 30, subject: 'Álgebra' },
  ];

  const periods = [
    { id: 1, name: 'Periodo 1', startDate: '2024-01-15', endDate: '2024-03-30' },
    { id: 2, name: 'Periodo 2', startDate: '2024-04-01', endDate: '2024-06-15' },
    { id: 3, name: 'Periodo 3', startDate: '2024-07-01', endDate: '2024-09-20' },
    { id: 4, name: 'Periodo 4', startDate: '2024-09-25', endDate: '2024-11-30' },
  ];

  const students = [
    { id: 1, name: 'Ana María Rodríguez', grade1: 4.5, grade2: 4.8, grade3: 4.6 },
    { id: 2, name: 'Carlos Andrés Gómez', grade1: 3.8, grade2: 4.0, grade3: 3.9 },
    { id: 3, name: 'Diana Patricia López', grade1: 4.9, grade2: 5.0, grade3: 4.8 },
    { id: 4, name: 'Eduardo Silva Martínez', grade1: 3.5, grade2: 3.7, grade3: 3.8 },
    { id: 5, name: 'Fernanda Castro Ruiz', grade1: 4.2, grade2: 4.4, grade3: 4.3 },
    { id: 6, name: 'Gabriel Hernández Pérez', grade1: 4.7, grade2: 4.5, grade3: 4.6 },
    { id: 7, name: 'Isabella Torres Vega', grade1: 3.9, grade2: 4.1, grade3: 4.0 },
    { id: 8, name: 'Juan Pablo Morales', grade1: 3.2, grade2: 3.4, grade3: 3.3 },
  ];

  const [grades, setGrades] = useState(
    students.reduce<Record<number, { grade1: number; grade2: number; grade3: number; final: string }>>((acc, student) => ({
      ...acc,
      [student.id]: {
        grade1: student.grade1,
        grade2: student.grade2,
        grade3: student.grade3,
        final: ((student.grade1 + student.grade2 + student.grade3) / 3).toFixed(1)
      }
    }), {})
  );

  const getGradeColor = (grade: number) => {
    if (grade >= 4.5) return 'text-green-600 bg-green-50';
    if (grade >= 3.5) return 'text-blue-600 bg-blue-50';
    if (grade >= 3.0) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleGradeChange = (studentId: number, gradeType: 'grade1' | 'grade2' | 'grade3', value: string) => {
    const numValue = parseFloat(value) || 0;
    const newGrades = { ...grades };
    newGrades[studentId][gradeType] = numValue;

    // Recalcular promedio
    const avg = ((newGrades[studentId].grade1 + newGrades[studentId].grade2 + newGrades[studentId].grade3) / 3).toFixed(1);
    newGrades[studentId].final = avg;

    setGrades(newGrades);
  };

  const handleSelectCourse = () => {
    if (selectedCourse && selectedPeriod) {
      setShowRegister(true);
    }
  };

  const selectedCourseData = courses.find(c => c.name === selectedCourse);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="docente" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Calificaciones</h1>
            <p className="text-gray-500 mt-1">Seleccionar curso, registrar y modificar calificaciones</p>
          </div>

          {/* Seleccionar Curso */}
          {!showRegister ? (
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Curso</CardTitle>
                <CardDescription>Elige el curso y período para registrar o modificar las calificaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
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
                              {course.name} - {course.subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="period">Período Académico</Label>
                      <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar período" />
                        </SelectTrigger>
                        <SelectContent>
                          {periods.map((period) => (
                            <SelectItem key={period.id} value={period.name}>
                              {period.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {courses.map((course) => (
                      <Card
                        key={course.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedCourse(course.name)}
                      >
                        <CardContent className="pt-6">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <BookOpen className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900 text-lg">{course.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{course.subject}</p>
                            <p className="text-xs text-gray-500 mt-1">{course.students} estudiantes</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={handleSelectCourse} disabled={!selectedCourse || !selectedPeriod}>
                      Continuar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Info del curso seleccionado */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {selectedCourse} - {selectedCourseData?.subject}
                        </h3>
                        <p className="text-sm text-gray-600">{selectedPeriod}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
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
                  </div>
                </CardContent>
              </Card>

              {/* Tabla de calificaciones */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Registrar / Modificar Calificaciones</CardTitle>
                      <CardDescription>{selectedCourseData?.students} estudiantes</CardDescription>
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
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-900">Estudiante</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900">Nota 1 (30%)</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900">Nota 2 (30%)</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900">Nota 3 (40%)</th>
                          <th className="text-center py-3 px-4 font-medium text-gray-900">Definitiva</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">
                                  {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <span className="font-medium text-gray-900">{student.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {isEditing ? (
                                <Input
                                  type="number"
                                  min="0"
                                  max="5"
                                  step="0.1"
                                  value={grades[student.id]?.grade1 || ''}
                                  onChange={(e) => handleGradeChange(student.id, 'grade1', e.target.value)}
                                  className="w-20 mx-auto text-center"
                                />
                              ) : (
                                <div className="flex justify-center">
                                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grades[student.id]?.grade1)}`}>
                                    {grades[student.id]?.grade1?.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {isEditing ? (
                                <Input
                                  type="number"
                                  min="0"
                                  max="5"
                                  step="0.1"
                                  value={grades[student.id]?.grade2 || ''}
                                  onChange={(e) => handleGradeChange(student.id, 'grade2', e.target.value)}
                                  className="w-20 mx-auto text-center"
                                />
                              ) : (
                                <div className="flex justify-center">
                                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grades[student.id]?.grade2)}`}>
                                    {grades[student.id]?.grade2?.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {isEditing ? (
                                <Input
                                  type="number"
                                  min="0"
                                  max="5"
                                  step="0.1"
                                  value={grades[student.id]?.grade3 || ''}
                                  onChange={(e) => handleGradeChange(student.id, 'grade3', e.target.value)}
                                  className="w-20 mx-auto text-center"
                                />
                              ) : (
                                <div className="flex justify-center">
                                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grades[student.id]?.grade3)}`}>
                                    {grades[student.id]?.grade3?.toFixed(1)}
                                  </span>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getGradeColor(parseFloat(grades[student.id]?.final))}`}>
                                  {grades[student.id]?.final}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-between items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                    <Button variant="outline" onClick={() => setShowRegister(false)}>
                      Cambiar Curso
                    </Button>
                    <div className="flex gap-3">
                      <Button variant="outline">Cancelar</Button>
                      <Button className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Guardar Calificaciones
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