import { describe, expect, it } from 'vitest';
import { isValueSelected, setMultipleValue } from '../utils';

describe('Testing: Select utils', () => {
  it.each`
    previousValue           | newValue | expected
    ${null}                 | ${'3'}   | ${'3'}
    ${['1', '2']}           | ${'3'}   | ${['1', '2', '3']}
    ${['1', '3']}           | ${'2'}   | ${['1', '2', '3']}
    ${['1', '2', '3', '4']} | ${'3'}   | ${['1', '2', '4']}
  `(
    'setMultipleValue should return $expected when previousValue: $previousValue and newValue: $newValue',
    ({ previousValue, newValue, expected }) => {
      const received = setMultipleValue(previousValue, newValue);

      expect(received).toEqual(expected);
    }
  );

  it.each`
    allValues     | value        | expected
    ${undefined}  | ${'1'}       | ${false}
    ${['1', '2']} | ${undefined} | ${false}
    ${'1'}        | ${'1'}       | ${true}
    ${['1', '2']} | ${'2'}       | ${true}
  `(
    'isValueSelected should return $expected when allValues: $allValues and value: $value',
    ({ allValues, value, expected }) => {
      const received = isValueSelected(allValues, value);

      expect(received).toBe(expected);
    }
  );
});
