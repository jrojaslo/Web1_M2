// Lógica de procesamiento (funciones puras)
// src/motor.js

/**
 * Busca un recurso en el arreglo principal usando solo índices.
 * Retorna el índice o -1 si no existe.
 */
export function buscarIndiceRecurso(arrRecursos, modulo, recurso) {
  for (let i = 0; i < arrRecursos.length; i++) {
    if (arrRecursos[i].modulo === modulo && arrRecursos[i].recurso === recurso) {
      return i;
    }
  }
  return -1;
}

/**
 * 
 * Agrega un elemento a un array SIN usar push()
 */
export function agregarManual(arrayDestino, elemento, contadorActual) {
  arrayDestino[contadorActual] = elemento;
  // Retorna el nuevo tamaño para que el llamador lo guarde
  return contadorActual + 1;
}

/**
 * Procesa los eventos y retorna los 3 reportes requeridos.
 */
export function procesarMotor(recursos, eventos) {
  // Copia superficial manual para no mutar el original directamente (buena práctica)
  let estadoFinal = [];
  let countEstado = 0;

  // Inicializar estado final
  for (let i = 0; i < recursos.length; i++) {
    estadoFinal[countEstado] = {
      modulo: recursos[i].modulo,
      recurso: recursos[i].recurso,
      cantidad: recursos[i].cantidad,
      umbralCritico: recursos[i].umbralCritico
    };
    countEstado++;
  }

  let alertasTransferencia = [];
  let countAlertas = 0;
  let modulosEnPeligro = [];
  let countPeligro = 0;

  // Procesar cada evento
  for (let e = 0; e < eventos.length; e++) {
    let evento = eventos[e];
    let indice = buscarIndiceRecurso(estadoFinal, evento.modulo, evento.recurso);

    if (indice !== -1) {
      let recursoActual = estadoFinal[indice];
      recursoActual.cantidad = recursoActual.cantidad - evento.cantidadConsumida;

      // Verificar si quedó en peligro
      if (recursoActual.cantidad < recursoActual.umbralCritico) {
        // Verificar duplicados manualmente antes de agregar a peligro
        let yaEsta = false;
        for (let p = 0; p < countPeligro; p++) {
          if (modulosEnPeligro[p].modulo === recursoActual.modulo && 
              modulosEnPeligro[p].recurso === recursoActual.recurso) {
            yaEsta = true;
            break;
          }
        }
        if (!yaEsta) {
          countPeligro = agregarManual(modulosEnPeligro, {
            modulo: recursoActual.modulo,
            recurso: recursoActual.recurso,
            cantidadActual: recursoActual.cantidad,
            deficit: recursoActual.umbralCritico - recursoActual.cantidad
          }, countPeligro);
        }
      }

      // Si la cantidad es negativa, hay déficit de transferencia
      if (recursoActual.cantidad < 0) {
        countAlertas = agregarManual(alertasTransferencia, {
          modulo: recursoActual.modulo,
          recurso: recursoActual.recurso,
          deficitAbsoluto: Math.abs(recursoActual.cantidad)
        }, countAlertas);
      }
    }
  }

  return {
    estadoFinal: estadoFinal,
    largoEstado: countEstado,
    alertas: alertasTransferencia,
    largoAlertas: countAlertas,
    peligro: modulosEnPeligro,
    largoPeligro: countPeligro
  };
}