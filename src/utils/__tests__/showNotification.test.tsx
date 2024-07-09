import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Severity } from 'src/types';
import { showNotification } from '../showNotification';
import { hideElement } from '../hideElement';
import { showElement } from '../showElement';
import { DEFAULT_NOTIFICATION } from 'src/constants';

vi.mock('src/utils/hideElement', () => ({
  hideElement: vi.fn(),
}));

vi.mock('src/utils/showElement', () => ({
  showElement: vi.fn(),
}));

describe('Testing: showNotification', () => {
  let notification: HTMLElement;

  beforeEach(() => {
    notification = document.createElement('div');
    notification.id = 'notification';
    document.body.appendChild(notification);

    vi.clearAllMocks();
  });

  it('should set the notification severity and show the notification with the message', () => {
    const message = 'Test message';
    const debounce = 500;
    const severity = Severity.Warning;

    showNotification(message, debounce, severity);

    expect(notification.dataset.severity).toBe(severity);
    expect(hideElement).toHaveBeenCalledWith(
      notification,
      DEFAULT_NOTIFICATION,
      debounce
    );
    expect(showElement).toHaveBeenCalledWith(notification, message);
  });

  it('should default severity to Info if not provided', () => {
    const message = 'Test message';
    const debounce = 500;
    const severity = Severity.Info;

    showNotification(message, debounce);

    notification.dataset.severity = severity;

    expect(hideElement).toHaveBeenCalledWith(
      notification,
      DEFAULT_NOTIFICATION,
      debounce
    );
    expect(showElement).toHaveBeenCalledWith(notification, message);
  });

  it('should do nothing if notification element is not found', () => {
    document.body.innerHTML = '';

    const message = 'Test message';
    const debounce = 500;
    showNotification(message, debounce);

    expect(hideElement).not.toHaveBeenCalled();
    expect(showElement).not.toHaveBeenCalled();
  });
});
