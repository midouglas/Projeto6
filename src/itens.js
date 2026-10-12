// Interfaces abstratas são representadas por classes em JavaScript.
export class Bebida {
  descricao() { throw new Error('Implemente descricao() na bebida.'); }
}

function validarVolume(volume) {
  if (![300, 500, 700].includes(volume)) {
    throw new RangeError('O volume deve ser 300, 500 ou 700 ml.');
  }
}

export class Refrigerante extends Bebida {
  constructor(volume) {
    super();
    validarVolume(volume);
    this.volume = volume;
    Object.freeze(this);
  }
  descricao() { return `Refrigerante ${this.volume} ml`; }
}

export class Suco extends Bebida {
  constructor(volume) {
    super();
    validarVolume(volume);
    this.volume = volume;
    Object.freeze(this);
  }
  descricao() { return `Suco ${this.volume} ml`; }
}

export class BatataFrita {
  constructor(tamanho) {
    if (!['pequena', 'média', 'grande'].includes(tamanho)) {
      throw new RangeError('A batata deve ser pequena, média ou grande.');
    }
    this.tamanho = tamanho;
    Object.freeze(this);
  }
  descricao() { return `Batata frita ${this.tamanho}`; }
}

export class Lanche {
  descricao() { throw new Error('Implemente descricao() no lanche.'); }
}
export class BigMac extends Lanche {
  descricao() { return 'Big Mac'; }
}
export class Quarteirao extends Lanche {
  descricao() { return 'Quarteirão'; }
}
export class McFish extends Lanche {
  descricao() { return 'McFish'; }
}
