import { BigMac, Quarteirao, McFish, Refrigerante, Suco, BatataFrita } from './itens.js';
import { AcompanhamentosPersonalizaveis, ComboPersonalizado } from './bridge.js';
import { SistemaLegadoBebidas } from './legado.js';
import { BebidaLegadaAdapter } from './adapter.js';

function montarCombo(numero, lanche, bebida, tamanhoBatata) {
  return new ComboPersonalizado(numero, lanche,
    new AcompanhamentosPersonalizaveis(bebida, new BatataFrita(tamanhoBatata)));
}

console.log('=== MONTAGEM DE CINCO COMBOS DIFERENTES ===');
const combos = [
  montarCombo(1, new BigMac(), new Refrigerante(300), 'pequena'),
  montarCombo(2, new Quarteirao(), new Suco(500), 'média'),
  montarCombo(3, new McFish(), new Refrigerante(700), 'grande'),
  montarCombo(4, new BigMac(), new Suco(300), 'grande'),
  montarCombo(5, new Quarteirao(), new Refrigerante(500), 'pequena')
];
combos.forEach(combo => console.log(combo.descricao()));

console.log('\n=== PERSONALIZAÇÃO DOS COMBOS EXISTENTES ===');
console.log(`Antes: ${combos[0].descricao()}`);
combos[0].alterarBebida(new Suco(700));
combos[0].alterarBatata(new BatataFrita('grande'));
console.log(`Depois: ${combos[0].descricao()}`);
console.log(`Antes: ${combos[1].descricao()}`);
combos[1].alterarBebida(new Refrigerante(300));
combos[1].alterarBatata(new BatataFrita('pequena'));
console.log(`Depois: ${combos[1].descricao()}`);

console.log('\n=== ADAPTER INTEGRADO AO BRIDGE ===');
const legado = new SistemaLegadoBebidas();
const bebidaAdaptada = new BebidaLegadaAdapter(legado, 202);
const comboLegado = montarCombo(6, new McFish(), bebidaAdaptada, 'média');
console.log('Bebida obtida pelo Adapter com código legado 202.');
console.log(comboLegado.descricao());
console.log('Substituindo a bebida do combo 3 pelo código legado 103:');
combos[2].alterarBebida(new BebidaLegadaAdapter(legado, 103));
console.log(combos[2].descricao());
