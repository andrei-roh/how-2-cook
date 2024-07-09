import { describe, it, expect } from 'vitest';
import { getSearch } from '../getSearch';

describe('Testing: getSearch', () => {
  type User = { name: string };

  it('should return the original array if values are empty', () => {
    const values: User[] = [];
    expect(getSearch(values)).toEqual(values);
  });

  it('should return the original array if value is not provided', () => {
    const values: User[] = [{ name: 'Alice' }, { name: 'Bob' }];
    expect(getSearch(values)).toEqual(values);
  });

  it('should return filtered array based on case-insensitive match', () => {
    const values: User[] = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'alice' }];
    const value = 'al';
    const expected = [{ name: 'Alice' }, { name: 'alice' }];
    expect(getSearch(values, value)).toEqual(expected);
  });

  it('should return an empty array if no names match the search value', () => {
    const values: User[] = [{ name: 'Alice' }, { name: 'Bob' }];
    const value = 'Charlie';
    expect(getSearch(values, value)).toEqual([]);
  });

  it('should return filtered array when only partial names match', () => {
    const values: User[] = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Alfred' }];
    const value = 'Al';
    const expected = [{ name: 'Alice' }, { name: 'Alfred' }];
    expect(getSearch(values, value)).toEqual(expected);
  });

  it('should handle names with different cases correctly', () => {
    const values: User[] = [{ name: 'Alice' }, { name: 'alice' }, { name: 'ALICE' }];
    const value = 'aLi';
    const expected = [{ name: 'Alice' }, { name: 'alice' }, { name: 'ALICE' }];
    expect(getSearch(values, value)).toEqual(expected);
  });

  it('should return all values if value is an empty string', () => {
    const values: User[] = [{ name: 'Alice' }, { name: 'Bob' }];
    const value = '';
    expect(getSearch(values, value)).toEqual(values);
  });
});
