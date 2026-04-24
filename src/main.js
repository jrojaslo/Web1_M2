// Punto de entrada y ejecución
// src/main.js
import { recursosEstacion, eventosConsumo } from './datos.js';
import { procesarMotor } from './motor.js';

// 1. Ejecutar motor
const reporte = procesarMotor(recursosEstacion, eventosConsumo);

// 2. Imprimir en consola (única forma de output permitida)
console.log("=== DIAGNÓSTICO ESTACIÓN NEXUS ===");

console.log("1. ESTADO FINAL DE RECURSOS:");
console.table(reporte.estadoFinal);

console.log("2. MÓDULOS EN PELIGRO (BAJO UMBRAL CRÍTICO):");
if (reporte.largoPeligro === 0) {
  console.log("Ninguno. Estabilidad nominal.");
} else {
  console.table(reporte.peligro);
}

console.log("3. ALERTAS DE TRANSFERENCIA REQUERIDA:");
if (reporte.largoAlertas === 0) {
  console.log("Ninguna. Capacidad local suficiente.");
} else {
  console.table(reporte.alertas);
}

console.log("=== FIN DEL DIAGNÓSTICO ===");