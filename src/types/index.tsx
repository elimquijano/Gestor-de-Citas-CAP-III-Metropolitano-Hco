// types.ts
export interface Patient {
    id: string;
    numero_documento: string;
    nombres: string;
    apellido_paterno: string;
    apellido_materno: string;
    telefono: string;
    sexo: string;
    password: string;
    estado_civil: {
      id: string;
      nombre: string;
    };
    direccion: string;
    fecha_nacimiento: string;
    imagen: string;
    grupo_sangre: {
      id: string;
      nombre: string;
    };
    correo: string;
    activo: string;
    confirm_password: string;
  }