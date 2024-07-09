import { describe, it, expect, beforeEach } from 'vitest';
import { showElement } from '../showElement';

describe('Testing: showElement', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
  });

  it('should set the element\'s opacity, zIndex, and pointerEvents styles', () => {
    showElement(element);

    expect(element.style.opacity).toBe('1');
    expect(element.style.zIndex).toBe('100');
    expect(element.style.pointerEvents).toBe('all');
  });

  it('should set the element\'s innerText to the message if no notificationMessage element exists', () => {
    const message = 'Hello, World!';
    showElement(element, message);

    expect(element.innerText).toBe(message);
  });

  it('should update the notificationMessage\'s innerText if it exists within the element', () => {
    const message = 'Notification Message';
    const notificationMessage = document.createElement('div');
    notificationMessage.classList.add('MuiAlert-message');
    element.appendChild(notificationMessage);

    showElement(element, message);

    expect(notificationMessage.innerText).toBe(message);
    expect(element.innerText).not.toBe(message);
  });

  it('should set the element\'s innerText to the message if notificationMessage element does not exist within the element', () => {
    const message = 'Hello, World!';
    const notificationMessage = document.createElement('div');
    notificationMessage.classList.add('MuiAlert-message');
    document.body.appendChild(notificationMessage);

    showElement(element, message);

    expect(element.innerText).toBe(message);
  });

  it('should not set any message if no message is provided', () => {
    showElement(element);

    expect(element.innerText).not.toBeDefined();
  });
});
