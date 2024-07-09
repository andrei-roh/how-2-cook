import { describe, it, expect, beforeEach } from 'vitest';
import { setHeightUsingScroll } from '../setHeightUsingScroll';

describe('Testing: setHeightUsingScroll', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  it('should do nothing if element is undefined', () => {
    expect(() => setHeightUsingScroll(undefined)).not.toThrow();
  });

  it('should do nothing if element is null', () => {
    expect(() => setHeightUsingScroll(null)).not.toThrow();
  });

  it('should set the element height to its scrollHeight', () => {
    element.style.height = '100px';
    element.style.overflow = 'auto';
    element.style.display = 'block';

    // Append some content to make sure scrollHeight is greater than 0
    element.innerHTML = '<div style="height: 200px;"></div>';

    setHeightUsingScroll(element);

    expect(element.style.height).toBe(`${element.scrollHeight}px`);
  });

  it('should reset the element height to 0 before setting it to scrollHeight', () => {
    element.style.height = '100px';
    element.style.overflow = 'auto';
    element.style.display = 'block';

    element.innerHTML = '<div style="height: 200px;"></div>';

    setHeightUsingScroll(element);

    expect(element.style.height).not.toBe('100px');
    expect(element.style.height).toBe(`${element.scrollHeight}px`);
  });
});
