import test from 'node:test';
import assert from 'node:assert/strict';
import { dateToEpochDay, nextDay, nightsBetween, todayLocal } from '../src/lib/dates.ts';

test('accepts leap dates and rejects invalid dates', () => {
  assert.notEqual(dateToEpochDay('2028-02-29'), null);
  for (const invalid of ['2027-02-29', '2026-13-10', '2026-00-10', '2026-11-31', '11/05/2026', '']) {
    assert.equal(dateToEpochDay(invalid), null, invalid);
  }
});
test('counts calendar nights across leap days and DST', () => {
  assert.equal(nightsBetween('2028-02-28', '2028-03-01'), 2);
  assert.equal(nightsBetween('2026-03-28', '2026-03-30'), 2);
  assert.equal(nightsBetween('2026-10-24', '2026-10-26'), 2);
  assert.equal(nightsBetween('2026-11-05', '2026-11-05'), 0);
  assert.equal(nightsBetween('2026-11-06', '2026-11-05'), 0);
});
test('uses local dates and supports year boundaries', () => {
  assert.equal(todayLocal(new Date(2026, 10, 5, 23, 59)), '2026-11-05');
  assert.equal(nextDay('2028-02-28'), '2028-02-29');
  assert.equal(nextDay('2028-12-31'), '2029-01-01');
});
