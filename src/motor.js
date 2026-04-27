export function buscarIndiceRecurso(arrRecursos, modulo, recurso) {
  for (let i = 0; i < arrRecursos.length; i++) {
    if (
      arrRecursos[i].modulo === modulo &&
      arrRecursos[i].recurso === recurso
    ) {
      return i;
    }
  }
  return -1;
}

export function agregarManual(arrayDestino, elemento, contadorActual) {
  arrayDestino[contadorActual] = elemento;
  return contadorActual + 1;
}

export function procesarMotor(recursos, eventos) {
  let estadoFinal = [];
  let countEstado = 0;

  for (let i = 0; i < recursos.length; i++) {
    estadoFinal[countEstado] = {
      modulo: recursos[i].modulo,
      recurso: recursos[i].recurso,
      cantidad: recursos[i].cantidad,
      umbralCritico: recursos[i].umbralCritico,
    };
    countEstado++;
  }

  let alertasTransferencia = [];
  let countAlertas = 0;
  let modulosEnPeligro = [];
  let countPeligro = 0;

  for (let e = 0; e < eventos.length; e++) {
    let evento = eventos[e];
    let indice = buscarIndiceRecurso(
      estadoFinal,
      evento.modulo,
      evento.recurso,
    );

    if (indice !== -1) {
      let recursoActual = estadoFinal[indice];
      recursoActual.cantidad =
        recursoActual.cantidad - evento.cantidadConsumida;

      if (recursoActual.cantidad < recursoActual.umbralCritico) {
        let yaEsta = false;
        for (let p = 0; p < countPeligro; p++) {
          if (
            modulosEnPeligro[p].modulo === recursoActual.modulo &&
            modulosEnPeligro[p].recurso === recursoActual.recurso
          ) {
            yaEsta = true;
            break;
          }
        }
        if (!yaEsta) {
          countPeligro = agregarManual(
            modulosEnPeligro,
            {
              modulo: recursoActual.modulo,
              recurso: recursoActual.recurso,
              cantidadActual: recursoActual.cantidad,
              deficit: recursoActual.umbralCritico - recursoActual.cantidad,
            },
            countPeligro,
          );
        }
      }

      if (recursoActual.cantidad < 0) {
        countAlertas = agregarManual(
          alertasTransferencia,
          {
            modulo: recursoActual.modulo,
            recurso: recursoActual.recurso,
            deficitAbsoluto: Math.abs(recursoActual.cantidad),
          },
          countAlertas,
        );
      }
    }
  }

  return {
    estadoFinal: estadoFinal,
    largoEstado: countEstado,
    alertas: alertasTransferencia,
    largoAlertas: countAlertas,
    peligro: modulosEnPeligro,
    largoPeligro: countPeligro,
  };
}
