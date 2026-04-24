// Mock data y constantes

// src/datos.js
export const recursosEstacion = [
  { modulo: "Habitacional", recurso: "Oxígeno", cantidad: 1500, umbralCritico: 500 },
  { modulo: "Habitacional", recurso: "Agua", cantidad: 800, umbralCritico: 200 },
  { modulo: "Laboratorio", recurso: "Oxígeno", cantidad: 600, umbralCritico: 300 },
  { modulo: "Laboratorio", recurso: "Energía", cantidad: 1200, umbralCritico: 800 },
  { modulo: "Bahia Medica", recurso: "Agua", cantidad: 250, umbralCritico: 300 },
  { modulo: "Bahia Medica", recurso: "Oxígeno", cantidad: 400, umbralCritico: 400 },
  { modulo: "Sala Maquinas", recurso: "Energía", cantidad: 5000, umbralCritico: 1000 }
];

export const eventosConsumo = [
  { modulo: "Laboratorio", recurso: "Energía", cantidadConsumida: 500 },
  { modulo: "Bahia Medica", recurso: "Oxígeno", cantidadConsumida: 150 },
  { modulo: "Habitacional", recurso: "Agua", cantidadConsumida: 100 },
  { modulo: "Laboratorio", recurso: "Oxígeno", cantidadConsumida: 350 },
  { modulo: "Bahia Medica", recurso: "Agua", cantidadConsumida: 100 }
];
