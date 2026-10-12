import test from 'node:test';
import assert from 'node:assert/strict';
import { BigMac, Quarteirao, McFish, Refrigerante, Suco, BatataFrita } from '../src/itens.js';
import { ComboPersonalizado, AcompanhamentosPersonalizaveis } from '../src/bridge.js';
import { BebidaLegadaAdapter } from '../src/adapter.js';
import { SistemaLegadoBebidas } from '../src/legado.js';

test('Bridge permite todas as 54 combinações válidas', () => {
  const descricoes = new Set();
  for (const Lanche of [BigMac, Quarteirao, McFish]) {
    for (const Tipo of [Refrigerante, Suco]) {
      for (const volume of [300, 500, 700]) {
        for (const tamanho of ['pequena', 'média', 'grande']) {
          const combo = new ComboPersonalizado(1, new Lanche(),
            new AcompanhamentosPersonalizaveis(new Tipo(volume), new BatataFrita(tamanho)));
          descricoes.add(combo.descricao());
        }
      }
    }
  }
  assert.equal(descricoes.size, 54);
});

test('Adapter traduz os seis códigos e funciona no Bridge', () => {
  const legado = new SistemaLegadoBebidas();
  const esperados = ['Refrigerante 300 ml', 'Refrigerante 500 ml',
    'Refrigerante 700 ml', 'Suco 300 ml', 'Suco 500 ml', 'Suco 700 ml'];
  [101, 102, 103, 201, 202, 203].forEach((codigo, indice) => {
    const bebida = new BebidaLegadaAdapter(legado, codigo);
    const combo = new ComboPersonalizado(1, new BigMac(),
      new AcompanhamentosPersonalizaveis(bebida, new BatataFrita('média')));
    assert.equal(combo.descricao(), `Combo 1: Big Mac | ${esperados[indice]} | Batata frita média`);
  });
});

test('Personalização modifica o mesmo combo e mantém outros independentes', () => {
  const montar = () => new ComboPersonalizado(1, new BigMac(),
    new AcompanhamentosPersonalizaveis(new Refrigerante(300), new BatataFrita('pequena')));
  const primeiro = montar();
  const segundo = montar();
  primeiro.alterarBebida(new Suco(700));
  primeiro.alterarBatata(new BatataFrita('grande'));
  assert.equal(primeiro.descricao(), 'Combo 1: Big Mac | Suco 700 ml | Batata frita grande');
  assert.equal(segundo.descricao(), 'Combo 1: Big Mac | Refrigerante 300 ml | Batata frita pequena');
  assert.throws(() => primeiro.alterarBebida(null), TypeError);
  assert.throws(() => primeiro.alterarBatata(null), TypeError);
  assert.equal(primeiro.descricao(), 'Combo 1: Big Mac | Suco 700 ml | Batata frita grande');
});

test('Rejeita itens ausentes, tamanhos e códigos inválidos', () => {
  assert.throws(() => new Refrigerante(400), RangeError);
  assert.throws(() => new Suco(0), RangeError);
  assert.throws(() => new BatataFrita('gigante'), RangeError);
  assert.throws(() => new AcompanhamentosPersonalizaveis(null, new BatataFrita('média')), TypeError);
  assert.throws(() => new AcompanhamentosPersonalizaveis(new Suco(300), null), TypeError);
  assert.throws(() => new ComboPersonalizado(1, null, null), TypeError);
  assert.throws(() => new BebidaLegadaAdapter(new SistemaLegadoBebidas(), 999), RangeError);
});
