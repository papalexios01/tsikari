import test from 'node:test';
import assert from 'node:assert/strict';
import { translate } from '../src/lib/translations.ts';

test('core Greek translations cover navigation, booking and hotel copy', () => {
  assert.equal(translate('Home'), 'Αρχική');
  assert.equal(translate('Rooms'), 'Δωμάτια');
  assert.equal(translate('ENQUIRE'), 'ΑΠΟΣΤΟΛΗ ΑΙΤΗΜΑΤΟΣ');
  assert.equal(translate('Studio'), 'Στούντιο');
  assert.equal(translate('YOUR STAY BEGINS HERE'), 'Η ΔΙΑΜΟΝΗ ΣΑΣ ΞΕΚΙΝΑ ΕΔΩ');
});
test('variable guest and night counts are translated', () => {
  assert.equal(translate('3 photos'), '3 φωτογραφίες');
  assert.equal(translate('2 nights selected'), '2 διανυκτερεύσεις');
  assert.equal(translate('Up to 4 guests'), 'Έως 4 άτομα');
});
test('unknown proper nouns remain unchanged', () => {
  assert.equal(translate('COCO-MAT'), 'COCO-MAT');
});
