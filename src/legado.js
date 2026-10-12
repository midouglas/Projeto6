// Adaptee: simulação da implementação original do sistema legado.
// O Adapter consome esta API; nenhuma conversão é adicionada ao legado.
export class SistemaLegadoBebidas {
  buscarPorCodigo(codigo) {
    const catalogo = {
      101: { produto: 'Refrigerante', mililitros: 300 },
      102: { produto: 'Refrigerante', mililitros: 500 },
      103: { produto: 'Refrigerante', mililitros: 700 },
      201: { produto: 'Suco', mililitros: 300 },
      202: { produto: 'Suco', mililitros: 500 },
      203: { produto: 'Suco', mililitros: 700 }
    };
    if (!Number.isInteger(codigo) || !Object.hasOwn(catalogo, codigo)) {
      throw new RangeError(`Código de bebida inválido: ${codigo}`);
    }
    return { ...catalogo[codigo] };
  }
}
