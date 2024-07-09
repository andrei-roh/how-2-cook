import { describe, it, expect } from 'vitest';
import { isArraysEqual } from '../isArraysEqual';

describe('Testing: isArraysEqual', () => {
  it('should return true for two identical arrays', () => {
    const arr1 = ['a', 'b', 'c'];
    const arr2 = ['a', 'b', 'c'];
    expect(isArraysEqual(arr1, arr2)).toBe(true);
  });

  it('should return true for two arrays with same elements in different order', () => {
    const arr1 = ['a', 'b', 'c'];
    const arr2 = ['c', 'a', 'b'];
    expect(isArraysEqual(arr1, arr2)).toBe(true);
  });

  it('should return false for two arrays with different elements', () => {
    const arr1 = ['a', 'b', 'c'];
    const arr2 = ['a', 'b', 'd'];
    expect(isArraysEqual(arr1, arr2)).toBe(false);
  });

  it('should return false for two arrays with different lengths', () => {
    const arr1 = ['a', 'b', 'c'];
    const arr2 = ['a', 'b'];
    expect(isArraysEqual(arr1, arr2)).toBe(false);
  });

  it('should return true for two empty arrays', () => {
    const arr1: string[] = [];
    const arr2: string[] = [];
    expect(isArraysEqual(arr1, arr2)).toBe(true);
  });

  it('should return false for one empty array and one non-empty array', () => {
    const arr1: string[] = [];
    const arr2 = ['a'];
    expect(isArraysEqual(arr1, arr2)).toBe(false);
  });

  it('should return true for arrays with duplicate elements in different order', () => {
    const arr1 = ['a', 'b', 'b', 'c'];
    const arr2 = ['c', 'b', 'a', 'b'];
    expect(isArraysEqual(arr1, arr2)).toBe(true);
  });

  it('should return false for arrays with different number of duplicate elements', () => {
    const arr1 = ['a', 'b', 'b', 'c'];
    const arr2 = ['c', 'b', 'a', 'b', 'b'];
    expect(isArraysEqual(arr1, arr2)).toBe(false);
  });
});
