import { Bebida } from './itens.js';

// Adapter por composição: traduz a resposta do legado para a interface Bebida.
export class BebidaLegadaAdapter extends Bebida {
  #sistemaLegado;
  #codigo;

  constructor(sistemaLegado, codigo) {
    super();
    this.#sistemaLegado = sistemaLegado;
    this.#codigo = codigo;
    // Valida o código antes de permitir que a bebida seja usada em um combo.
    this.#sistemaLegado.buscarPorCodigo(this.#codigo);
  }

  descricao() {
    const bebida = this.#sistemaLegado.buscarPorCodigo(this.#codigo);
    return `${bebida.produto} ${bebida.mililitros} ml`;
  }
}
