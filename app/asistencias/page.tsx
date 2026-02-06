'use client'
import React, { useState } from 'react';
import { Home, Calendar, FileText, Users, Settings, LogOut, Download, Search, Filter, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AsistenciaPage() {
  const [selectedCourse, setSelectedCourse] = useState('10-A');
  const [selectedDate, setSelectedDate] = useState('2024-10-30');
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 1, name: 'Ana María Rodríguez', status: 'Presente' },
    { id: 2, name: 'Carlos Andrés Gómez', status: 'Presente' },
    { id: 3, name: 'Diana Patricia López', status: 'Ausente' },
    { id: 4, name: 'Eduardo Silva Martínez', status: 'Presente' },
    { id: 5, name: 'Fernanda Castro Ruiz', status: 'Tarde' },
    { id: 6, name: 'Gabriel Hernández Pérez', status: 'Presente' },
    { id: 7, name: 'Isabella Torres Vega', status: 'Presente' },
    { id: 8, name: 'Juan Pablo Morales', status: 'Ausente' },
    { id: 9, name: 'Laura Sofía Ramírez', status: 'Presente' },
    { id: 10, name: 'Miguel Ángel Díaz', status: 'Presente' },
  ];

  const [attendance, setAttendance] = useState(
    students.reduce((acc, student) => ({
      ...acc,
      [student.id]: student.status
    }), {})
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Presente':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Ausente':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Tarde':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusCount = () => {
    const counts = { Presente: 0, Ausente: 0, Tarde: 0 };
    Object.values(attendance).forEach(status => {
      counts[status]++;
    });
    return counts;
  };

  const statusCounts = getStatusCount();

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
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md">
              <Calendar className="w-5 h-5" />
              Asistencias
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
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
            <h1 className="text-3xl font-bold text-gray-900">Asistencia</h1>
            <p className="text-gray-500 mt-1">Registrar y gestionar asistencia de estudiantes</p>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="course">Curso</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10-A">10-A</SelectItem>
                      <SelectItem value="10-B">10-B</SelectItem>
                      <SelectItem value="11-A">11-A</SelectItem>
                      <SelectItem value="11-B">11-B</SelectItem>
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
                <div>
                  <Label htmlFor="search">Buscar estudiante</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Nombre del estudiante"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button className="w-full flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Generar Reporte
                  </Button>
                </div>
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
              <CardTitle>Lista de Asistencia - {selectedCourse}</CardTitle>
              <CardDescription>{new Date(selectedDate).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
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
                          className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${attendance[student.id] === 'Presente'
                            ? 'bg-green-50 text-green-700 border-green-200'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          Presente
                        </button>
                        <button
                          onClick={() => setAttendance({ ...attendance, [student.id]: 'Tarde' })}
                          className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${attendance[student.id] === 'Tarde'
                            ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          Tarde
                        </button>
                        <button
                          onClick={() => setAttendance({ ...attendance, [student.id]: 'Ausente' })}
                          className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${attendance[student.id] === 'Ausente'
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                          Ausente
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline">Cancelar</Button>
                <Button>Guardar Asistencia</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}