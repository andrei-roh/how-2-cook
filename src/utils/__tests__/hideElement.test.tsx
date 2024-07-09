import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { hideElement } from '../hideElement';

describe('Testing: hideElement', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runAllTimers();
    vi.useRealTimers();
  });

  it('should set the element\'s styles after the debounce period', () => {
    const debounce = 500;
    hideElement(element, undefined, debounce);

    expect(element.style.opacity).not.toBe('0');
    expect(element.style.zIndex).not.toBe('-1');
    expect(element.style.pointerEvents).not.toBe('none');

    vi.advanceTimersByTime(debounce);

    expect(element.style.opacity).toBe('0');
    expect(element.style.zIndex).toBe('-1');
    expect(element.style.pointerEvents).toBe('none');
  });

  it('should set the element\'s styles immediately if no debounce is provided', () => {
    hideElement(element);

    expect(element.style.opacity).not.toBe('0');
    expect(element.style.zIndex).not.toBe('-1');
    expect(element.style.pointerEvents).not.toBe('none');

    vi.advanceTimersByTime(0);

    expect(element.style.opacity).toBe('0');
    expect(element.style.zIndex).toBe('-1');
    expect(element.style.pointerEvents).toBe('none');
  });

  it('should set the element\'s innerText to the provided message after the debounce period', () => {
    const message = 'Hidden Message';
    const debounce = 500;
    hideElement(element, message, debounce);

    expect(element.innerText).not.toBe(message);

    vi.advanceTimersByTime(debounce);

    expect(element.innerText).toBe(message);
  });

  it('should not set the element\'s innerText if no message is provided', () => {
    hideElement(element);

    vi.advanceTimersByTime(0);

    expect(element.innerText).not.toBeDefined();
  });
});
