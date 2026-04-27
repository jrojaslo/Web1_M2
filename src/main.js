import { recursosEstacion, eventosConsumo } from "./datos.js";
import { procesarMotor } from "./motor.js";

const reporte = procesarMotor(recursosEstacion, eventosConsumo);

console.log("*** DIAGNÓSTICO ESTACIÓN NEXUS ***");

console.log("1. Estado final de recursos:");
console.table(reporte.estadoFinal);

console.log("2. Módulos en peligro (Bajo umbral crítico):");
if (reporte.largoPeligro === 0) {
  console.log("Ninguno. Estabilidad nominal.");
} else {
  console.table(reporte.peligro);
}

console.log("3. Alertas de transferencia requerida:");
if (reporte.largoAlertas === 0) {
  console.log("Ninguna. Capacidad local suficiente.");
} else {
  console.table(reporte.alertas);
}

console.log("*** FIN DEL DIAGNÓSTICO ***");
