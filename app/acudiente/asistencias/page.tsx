'use client'

/**
 * Consulta de la asistencia del estudiante. Rol Acudiente.
 *
 * Parte de la historia HU-06 y del caso de uso CU-03. Permite revisar la
 * asistencia por fecha, por mes y por asignatura, con el resumen acumulado
 * del período.
 *
 * Conceptos de React: renderizado condicional. El detalle solo aparece cuando
 * hay un estudiante seleccionado, evitando mostrar una tabla vacía sin
 * contexto.
 */
import React, { useState } from 'react';
import { Calendar, Download, ChevronRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Sidebar from '@/components/sidebar';

export default function AcudienteAsistencia() {
  // Datos de demostración. Al integrar el backend Java, estos arreglos se
  // reemplazan por las respuestas de la API; la estructura de cada objeto ya
  // corresponde a las columnas de las tablas del esquema edutrack360.
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedDate, setSelectedDate] = useState('2024-10-30');
  const [selectedMonth, setSelectedMonth] = useState('10');
  const [showDetails, setShowDetails] = useState(false);

  const students = [
    { id: 1, name: 'Carlos Andrés Gómez', course: '10-A' },
    { id: 2, name: 'Laura Sofía Gómez', course: '8-B' },
  ];

  const attendanceByDate = [
    { date: '2024-10-30', status: 'Presente', subject: 'Matemáticas', time: '8:00 AM' },
    { date: '2024-10-30', status: 'Presente', subject: 'Español', time: '10:00 AM' },
    { date: '2024-10-30', status: 'Presente', subject: 'Ciencias', time: '2:00 PM' },
    { date: '2024-10-29', status: 'Presente', subject: 'Matemáticas', time: '8:00 AM' },
    { date: '2024-10-29', status: 'Tarde', subject: 'Inglés', time: '10:00 AM' },
    { date: '2024-10-28', status: 'Presente', subject: 'Matemáticas', time: '8:00 AM' },
    { date: '2024-10-28', status: 'Ausente', subject: 'Educación Física', time: '2:00 PM' },
  ];

  const monthlyStats = {
    present: 85,
    late: 5,
    absent: 3,
    total: 93,
    percentage: 91.4
  };

  const subjectStats = [
    { subject: 'Matemáticas', present: 18, late: 1, absent: 1, percentage: 90 },
    { subject: 'Español', present: 17, late: 2, absent: 1, percentage: 85 },
    { subject: 'Ciencias', present: 19, late: 0, absent: 1, percentage: 95 },
    { subject: 'Inglés', present: 16, late: 2, absent: 2, percentage: 80 },
    { subject: 'Sociales', present: 15, late: 0, absent: 0, percentage: 100 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Presente':
        return 'bg-green-100 text-green-700';
      case 'Ausente':
        return 'bg-red-100 text-red-700';
      case 'Tarde':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-yellow-600';
    return 'text-red-600';
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
            <h1 className="text-3xl font-bold text-gray-900">Asistencia</h1>
            <p className="text-gray-500 mt-1">Consulta la asistencia de tus hijos</p>
          </div>

          {/* Seleccionar Estudiante */}
          {!showDetails ? (
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Estudiante</CardTitle>
                <CardDescription>Elige el estudiante para ver su asistencia</CardDescription>
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
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Calendar className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-900">{student.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{student.course}</p>
                            <div className="flex items-center justify-center gap-2 mt-3">
                              <span className="text-sm text-gray-500">Ver asistencia</span>
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
                      <Label>Mes</Label>
                      <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">Octubre 2024</SelectItem>
                          <SelectItem value="09">Septiembre 2024</SelectItem>
                          <SelectItem value="08">Agosto 2024</SelectItem>
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

              {/* Ver Porcentaje General */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Porcentaje General de Asistencia</CardTitle>
                  <CardDescription>Resumen del mes de {selectedMonth === '10' ? 'Octubre' : 'Septiembre'} 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Presente</p>
                      <p className="text-3xl font-bold text-green-600">{monthlyStats.present}</p>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Tarde</p>
                      <p className="text-3xl font-bold text-yellow-600">{monthlyStats.late}</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Ausente</p>
                      <p className="text-3xl font-bold text-red-600">{monthlyStats.absent}</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Clases</p>
                      <p className="text-3xl font-bold text-blue-600">{monthlyStats.total}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 p-6 bg-gray-50 rounded-lg">
                    <TrendingUp className={`w-12 h-12 ${getPercentageColor(monthlyStats.percentage)}`} />
                    <div>
                      <p className="text-sm text-gray-600">Porcentaje de Asistencia</p>
                      <p className={`text-5xl font-bold ${getPercentageColor(monthlyStats.percentage)}`}>
                        {monthlyStats.percentage}%
                      </p>
                    </div>
                  </div>

                  {/* Estadísticas por Asignatura */}
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Asistencia por Asignatura</h3>
                    <div className="space-y-3">
                      {subjectStats.map((stat, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{stat.subject}</p>
                            <div className="flex gap-4 mt-1 text-sm">
                              <span className="text-green-600">✓ {stat.present}</span>
                              <span className="text-yellow-600">⏱ {stat.late}</span>
                              <span className="text-red-600">✗ {stat.absent}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-2xl font-bold ${getPercentageColor(stat.percentage)}`}>
                              {stat.percentage}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Ver Asistencia por Fecha */}
              <Card>
                <CardHeader>
                  <CardTitle>Asistencia por Fecha</CardTitle>
                  <CardDescription>Historial detallado de asistencia</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Label htmlFor="date">Seleccionar Fecha</Label>
                    <Input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="max-w-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    {attendanceByDate
                      .filter(item => item.date === selectedDate || !selectedDate)
                      .map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex items-center gap-4">
                            <Calendar className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{item.subject}</p>
                              <p className="text-sm text-gray-500">
                                {new Date(item.date).toLocaleDateString('es-ES', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })} - {item.time}
                              </p>
                            </div>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                      ))}
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