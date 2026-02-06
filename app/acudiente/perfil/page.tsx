'use client'
import React, { useState } from 'react';
import { Home, Calendar, FileText, User, LogOut, Mail, Phone, MapPin, Users as UsersIcon, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function AcudientePerfil() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: 'Roberto',
    secondName: 'Carlos',
    firstLastName: 'Gómez',
    secondLastName: 'Martínez',
    email: 'roberto.gomez@email.com',
    phone: '301 987 6543',
    address: 'Carrera 50 #12-34',
    document: '9876543210',
    relationship: 'Padre',
  });

  const students = [
    {
      name: 'Carlos Andrés Gómez',
      course: '10-A',
      attendance: 95,
      average: 4.3,
      teacher: 'Prof. María García'
    },
    {
      name: 'Laura Sofía Gómez',
      course: '8-B',
      attendance: 88,
      average: 3.8,
      teacher: 'Prof. Ana López'
    },
  ];

  const emergencyContact = {
    name: 'María Elena Martínez',
    relationship: 'Madre',
    phone: '302 456 7890',
    email: 'maria.martinez@email.com'
  };

  const handleLogout = () => {
    alert('Cerrando sesión...');
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
              Asistencia
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
              <FileText className="w-5 h-5" />
              Calificaciones
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-md">
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
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
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
            <h1 className="text-3xl font-bold text-gray-900">Perfil Acudiente</h1>
            <p className="text-gray-500 mt-1">Información personal y de contacto</p>
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

                    <div>
                      <Label>Parentesco</Label>
                      <Input
                        value={profile.relationship}
                        disabled={!isEditing}
                        onChange={(e) => setProfile({ ...profile, relationship: e.target.value })}
                      />
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

              {/* Contacto de Emergencia */}
              <Card>
                <CardHeader>
                  <CardTitle>Contacto de Emergencia</CardTitle>
                  <CardDescription>Información de contacto alternativo</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label>Nombre Completo</Label>
                      <Input value={emergencyContact.name} disabled />
                    </div>
                    <div>
                      <Label>Parentesco</Label>
                      <Input value={emergencyContact.relationship} disabled />
                    </div>
                    <div>
                      <Label>Teléfono</Label>
                      <Input value={emergencyContact.phone} disabled />
                    </div>
                    <div className="col-span-2">
                      <Label>Correo Electrónico</Label>
                      <Input value={emergencyContact.email} disabled />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4" size="sm">
                    Actualizar Contacto de Emergencia
                  </Button>
                </CardContent>
              </Card>

              {/* Estudiantes a Cargo */}
              <Card>
                <CardHeader>
                  <CardTitle>Estudiantes a Cargo</CardTitle>
                  <CardDescription>Hijos registrados en la institución</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {students.map((student, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <UsersIcon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-600">{student.course} • {student.teacher}</p>
                            <div className="flex gap-3 mt-1">
                              <span className="text-xs text-gray-500">
                                Asistencia: <span className="font-semibold text-green-600">{student.attendance}%</span>
                              </span>
                              <span className="text-xs text-gray-500">
                                Promedio: <span className="font-semibold text-blue-600">{student.average}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Ver Detalles</Button>
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
                      RG
                    </div>
                    <h3 className="font-semibold text-gray-900 text-lg">
                      {profile.firstName} {profile.firstLastName}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Acudiente</p>
                    <p className="text-sm text-gray-500 mt-1">{profile.relationship}</p>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      Cambiar Foto
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Resumen */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Estudiantes</p>
                        <p className="text-2xl font-bold text-blue-600">{students.length}</p>
                      </div>
                      <UsersIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Asistencia Promedio</p>
                        <p className="text-2xl font-bold text-green-600">
                          {(students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(0)}%
                        </p>
                      </div>
                      <Calendar className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Promedio General</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {(students.reduce((sum, s) => sum + s.average, 0) / students.length).toFixed(1)}
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-purple-600" />
                    </div>
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