'use client'

/**
 * Perfil del docente, con sus cursos asignados y su horario semanal.
 *
 * Conceptos de React: un único objeto de estado agrupa todos los campos del
 * perfil, y el modo de solo lectura o edición se controla con el estado
 * `isEditing`, que determina si los campos se muestran habilitados.
 */
import React, { useState } from 'react';
import { LogOut, Mail, Phone, MapPin, BookOpen, Award, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Sidebar from '@/components/sidebar';

export default function DocentePerfil() {
  // Datos de demostración. Al integrar el backend Java, estos arreglos se
  // reemplazan por las respuestas de la API; la estructura de cada objeto ya
  // corresponde a las columnas de las tablas del esquema edutrack360.
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'María',
    secondName: 'Fernanda',
    firstLastName: 'García',
    secondLastName: 'López',
    email: 'maria.garcia@edutrack360.com',
    phone: '301 234 5678',
    address: 'Calle 45 #23-67',
    document: '1234567890',
    specialty: 'Matemáticas',
    degree: 'Licenciada en Matemáticas',
    yearsExperience: '8 años',
  });

  const courses = [
    { name: '10-A', students: 28, subject: 'Matemáticas', hours: '5 horas/semana' },
    { name: '10-B', students: 25, subject: 'Matemáticas', hours: '5 horas/semana' },
    { name: '11-A', students: 30, subject: 'Álgebra', hours: '4 horas/semana' },
  ];

  const schedule = [
    { day: 'Lunes', classes: ['10-A (8:00-9:30)', '11-A (14:00-15:30)'] },
    { day: 'Martes', classes: ['10-B (10:00-11:30)'] },
    { day: 'Miércoles', classes: ['10-A (8:00-9:30)', '11-A (14:00-15:30)'] },
    { day: 'Jueves', classes: ['10-B (10:00-11:30)'] },
    { day: 'Viernes', classes: ['10-A (8:00-9:30)'] },
  ];

  const handleLogout = () => {
    alert('Cerrando sesión...');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="docente" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Perfil Docente</h1>
            <p className="text-gray-500 mt-1">Información personal y profesional</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Perfil Principal */}
            <div className="col-span-2 space-y-6">
              {/* Información Personal */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Información Personal</CardTitle>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                      {isEditing ? 'Cancelar' : 'Editar'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Primer Nombre</Label>
                        <Input
                          value={profile.firstName}
                          disabled={!isEditing}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Segundo Nombre</Label>
                        <Input
                          value={profile.secondName}
                          disabled={!isEditing}
                          onChange={(e) => setProfile({ ...profile, secondName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Primer Apellido</Label>
                        <Input
                          value={profile.firstLastName}
                          disabled={!isEditing}
                          onChange={(e) => setProfile({ ...profile, firstLastName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Segundo Apellido</Label>
                        <Input
                          value={profile.secondLastName}
                          disabled={!isEditing}
                          onChange={(e) => setProfile({ ...profile, secondLastName: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Correo Electrónico</Label>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <Input
                            value={profile.email}
                            disabled={!isEditing}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Teléfono</Label>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <Input
                            value={profile.phone}
                            disabled={!isEditing}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Dirección</Label>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <Input
                            value={profile.address}
                            disabled={!isEditing}
                            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                            className="flex-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>Documento de Identidad</Label>
                        <Input
                          value={profile.document}
                          disabled={!isEditing}
                          onChange={(e) => setProfile({ ...profile, document: e.target.value })}
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancelar
                        </Button>
                        <Button onClick={() => setIsEditing(false)}>
                          Guardar Cambios
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Información Profesional */}
              <Card>
                <CardHeader>
                  <CardTitle>Información Profesional</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Especialidad</p>
                        <p className="font-semibold text-gray-900">{profile.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Título</p>
                        <p className="font-semibold text-gray-900 text-sm">{profile.degree}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Experiencia</p>
                        <p className="font-semibold text-gray-900">{profile.yearsExperience}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Cursos Asignados */}
              <Card>
                <CardHeader>
                  <CardTitle>Cursos Asignados</CardTitle>
                  <CardDescription>Cursos actuales bajo su responsabilidad</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {courses.map((course, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{course.name} - {course.subject}</p>
                            <p className="text-sm text-gray-600">
                              {course.students} estudiantes • {course.hours}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar derecha */}
            <div className="space-y-6">
              {/* Foto de Perfil */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gray-900 rounded-full flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                      MG
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {profile.firstName} {profile.firstLastName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Docente de {profile.specialty}</p>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      Cambiar Foto
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Horario */}
              <Card>
                <CardHeader>
                  <CardTitle>Horario de Clases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {schedule.map((day, index) => (
                      <div key={index}>
                        <p className="font-medium text-gray-900 text-sm mb-1">{day.day}</p>
                        {day.classes.map((classItem, idx) => (
                          <p key={idx} className="text-xs text-gray-600 ml-2 mb-1">
                            • {classItem}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cerrar Sesión */}
              <Card className="border-red-200 bg-red-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <LogOut className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Cerrar Sesión</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      ¿Deseas salir de tu cuenta?
                    </p>
                    <Button
                      onClick={handleLogout}
                      variant="destructive"
                      className="w-full"
                    >
                      Cerrar Sesión
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