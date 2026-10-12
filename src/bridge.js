import { Bebida, BatataFrita, Lanche } from './itens.js';

// Bridge — Implementor: contrato de implementação dos acompanhamentos.
export class Acompanhamentos {
  descricao() { throw new Error('Implemente descricao().'); }
  alterarBebida() { throw new Error('Implemente alterarBebida().'); }
  alterarBatata() { throw new Error('Implemente alterarBatata().'); }
}

// Bridge — ConcreteImplementor: compõe uma bebida e uma batata.
export class AcompanhamentosPersonalizaveis extends Acompanhamentos {
  #bebida;
  #batata;

  constructor(bebida, batata) {
    super();
    this.alterarBebida(bebida);
    this.alterarBatata(batata);
  }

  alterarBebida(bebida) {
    if (!(bebida instanceof Bebida) || bebida.constructor === Bebida) {
      throw new TypeError('É obrigatório informar uma bebida concreta.');
    }
    this.#bebida = bebida;
  }

  alterarBatata(batata) {
    if (!(batata instanceof BatataFrita)) {
      throw new TypeError('É obrigatório informar uma batata frita.');
    }
    this.#batata = batata;
  }

  descricao() {
    return `${this.#bebida.descricao()} | ${this.#batata.descricao()}`;
  }
}

// Bridge — Abstraction: delega à implementação pela referência composta.
export class Combo {
  #lanche;
  #acompanhamentos;

  constructor(lanche, acompanhamentos) {
    if (!(lanche instanceof Lanche) || lanche.constructor === Lanche) {
      throw new TypeError('É obrigatório informar um lanche concreto.');
    }
    if (!(acompanhamentos instanceof Acompanhamentos) ||
        acompanhamentos.constructor === Acompanhamentos) {
      throw new TypeError('É obrigatório informar acompanhamentos concretos.');
    }
    this.#lanche = lanche;
    this.#acompanhamentos = acompanhamentos;
  }

  descricao() {
    return `${this.#lanche.descricao()} | ${this.#acompanhamentos.descricao()}`;
  }
  alterarBebida(bebida) { this.#acompanhamentos.alterarBebida(bebida); }
  alterarBatata(batata) { this.#acompanhamentos.alterarBatata(batata); }
}

// Bridge — RefinedAbstraction: acrescenta identificação à apresentação.
export class ComboPersonalizado extends Combo {
  constructor(numero, lanche, acompanhamentos) {
    super(lanche, acompanhamentos);
    this.numero = numero;
  }
  descricao() { return `Combo ${this.numero}: ${super.descricao()}`; }
}
