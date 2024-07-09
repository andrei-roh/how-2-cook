import { describe, it, expect } from 'vitest';
import { getClassesList } from '../getClassesList';

describe('Testing: getClassesList', () => {
  it('should return the main class when no additional or error classes are provided', () => {
    const mainClass = 'main';
    expect(getClassesList(mainClass)).toBe('main');
  });

  it('should return the main class and the additional class when an additional class is provided', () => {
    const mainClass = 'main';
    const additionalClass = 'additional';
    expect(getClassesList(mainClass, additionalClass)).toBe('main additional');
  });

  it('should return the main class and the error class when an error class is provided', () => {
    const mainClass = 'main';
    const errorClass = 'error';
    expect(getClassesList(mainClass, undefined, errorClass)).toBe('main error');
  });

  it('should return the main class, additional class, and error class when all are provided', () => {
    const mainClass = 'main';
    const additionalClass = 'additional';
    const errorClass = 'error';
    expect(getClassesList(mainClass, additionalClass, errorClass)).toBe('main additional error');
  });

  it('should handle empty strings for additional and error classes correctly', () => {
    const mainClass = 'main';
    const additionalClass = '';
    const errorClass = '';
    expect(getClassesList(mainClass, additionalClass, errorClass)).toBe('main');
  });

  it('should handle whitespace in the class names correctly', () => {
    const mainClass = ' main ';
    const additionalClass = ' additional ';
    const errorClass = ' error ';
    expect(getClassesList(mainClass, additionalClass, errorClass)).toBe('main additional error');
  });
});
