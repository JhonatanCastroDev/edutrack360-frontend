'use client'

/**
 * Formulario de registro y gestión de usuarios. Rol Administrativo.
 *
 * Implementa la historia de usuario HU-05 y el caso de uso CU-04: el
 * administrador crea usuarios asignándoles un rol, que es lo que determina a
 * qué funcionalidades tendrá acceso cada persona.
 *
 * Los campos reproducen las columnas de la tabla `usuario` del esquema
 * edutrack360: tipo y número de documento, primer y segundo nombre, primer y
 * segundo apellido, correo, teléfono, dirección, rol y notas.
 *
 * Conceptos de React: componentes controlados. Cada campo guarda su valor en
 * el estado con `useState` y lo devuelve por la propiedad `value`, de modo que
 * el estado es siempre la única fuente de verdad de lo que ve el usuario.
 */
import Link from 'next/link';
import React, { useState } from 'react';
import { Plus, Edit, List, ChevronLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Sidebar from '@/components/sidebar';

export default function UsersPage() {
  // Datos de demostración. Al integrar el backend Java, estos arreglos se
  // reemplazan por las respuestas de la API; la estructura de cada objeto ya
  // corresponde a las columnas de las tablas del esquema edutrack360.
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
      <Sidebar role="admin" />

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
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/inicio">
                <ChevronLeft className="w-4 h-4" />
                Volver al Inicio
              </Link>
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