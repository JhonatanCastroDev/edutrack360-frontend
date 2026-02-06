'use client'
import React, { useState } from 'react';
import { Home, Calendar, FileText, Users, Settings, LogOut, Plus, Edit, List, ChevronLeft, ChevronDown, GraduationCap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function UsersPage() {
  const [firstName, setFirstName] = useState('Jhonatan');
  const [secondName, setSecondName] = useState('Felipe');
  const [firstLastName, setFirstLastName] = useState('Castro');
  const [secondLastName, setSecondLastName] = useState('Alvarez');
  const [email, setEmail] = useState('usuario@edutrack.com.co');
  const [phone, setPhone] = useState('301 123 4567');
  const [address, setAddress] = useState('Carrera 12 #34 - 56');
  const [documentNumber, setDocumentNumber] = useState('1234567890');
  const [role, setRole] = useState('Acudiente');
  const [notes, setNotes] = useState('');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
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

        {/* Navigation */}
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
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
              <FileText className="w-5 h-5" />
              Calificaciones
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md">
              <Users className="w-5 h-5" />
              Usuarios
            </button>
          </div>
        </nav>

        {/* User Profile */}
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
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <span>Usuarios</span>
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span className="text-gray-900 font-medium">Nuevo usuario</span>
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Usuarios</h1>
              <p className="text-gray-500 mt-1">Gestionar</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" />
              Volver al Inicio
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo usuario
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="w-4 h-4" />
              Editar usuario
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Listado por rol
            </Button>
          </div>

          {/* Form Card */}
          <Card>
            <CardHeader>
              <CardTitle>Datos del usuario</CardTitle>
              <CardDescription>Completa el formulario para registrar un nuevo usuario</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Primera fila */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">
                      Primer nombre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Jhonatan"
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondName">Segundo nombre</Label>
                    <Input
                      id="secondName"
                      value={secondName}
                      onChange={(e) => setSecondName(e.target.value)}
                      placeholder="Felipe"
                    />
                  </div>
                </div>

                {/* Segunda fila */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstLastName">
                      Primer apellido <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="firstLastName"
                      value={firstLastName}
                      onChange={(e) => setFirstLastName(e.target.value)}
                      placeholder="Castro"
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondLastName">Segundo apellido</Label>
                    <Input
                      id="secondLastName"
                      value={secondLastName}
                      onChange={(e) => setSecondLastName(e.target.value)}
                      placeholder="Alvarez"
                    />
                  </div>
                </div>

                {/* Tercera fila */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar fecha" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="date1">01/01/1990</SelectItem>
                        <SelectItem value="date2">15/06/1985</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="email">
                      Correo <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="usuario@edutrack.com.co"
                    />
                  </div>
                </div>

                {/* Cuarta fila */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">
                      Teléfono <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex gap-2">
                      <Input value="+57" className="w-20" disabled />
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="301 123 4567"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Input
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Carrera 12 #34 - 56"
                    />
                  </div>
                </div>

                {/* Quinta fila */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="documentType">
                      Tipo de documento <span className="text-red-500">*</span>
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cc">Cédula de Ciudadanía</SelectItem>
                        <SelectItem value="ti">Tarjeta de Identidad</SelectItem>
                        <SelectItem value="ce">Cédula de Extranjería</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="documentNumber">
                      Número <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="documentNumber"
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      placeholder="1234567890"
                    />
                  </div>
                </div>

                {/* Asignar rol */}
                <div>
                  <Label htmlFor="role">
                    Asignar rol <span className="text-red-500">*</span>
                  </Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Acudiente">Acudiente</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                      <SelectItem value="Docente">Docente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notas */}
                <div>
                  <Label htmlFor="notes">Notas</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Información adicional sobre el usuario"
                    rows={4}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Crear Usuario</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}