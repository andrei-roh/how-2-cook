import { describe, expect, it, vi } from 'vitest';
import { getClassesList } from '../getClassesList';
import { render, screen } from '@testing-library/react';
import { Notification } from 'src/components';
import { showElement } from '../showElement';
import { hideElement } from '../hideElement';

const mainClassMock = 'main-class-test';

vi.mock('src/utils/getUser.ts', async () => {
  const actual = await vi.importActual('src/utils/getUser.ts');

  return {
    ...actual,
    getUser: () => vi.fn().mockReturnValue(true),
  };
});

describe('Testing: utils', () => {
  it.each`
    additionalClass            | errorClass            | expected
    ${undefined}               | ${undefined}          | ${'main-class-test'}
    ${'additional-class-test'} | ${undefined}          | ${'main-class-test additional-class-test'}
    ${undefined}               | ${'error-class-test'} | ${'main-class-test error-class-test'}
    ${'additional-class-test'} | ${'error-class-test'} | ${'main-class-test additional-class-test error-class-test'}
  `(
    'getClassesList should return $expected when additionalClass: $additionalClass and errorClass: $errorClass',
    ({ additionalClass, errorClass, expected }) => {
      const received = getClassesList(
        mainClassMock,
        additionalClass,
        errorClass
      );

      expect(received).toBe(expected);
    }
  );

  it('showElement should show element', () => {
    render(<Notification />);

    const notificationElement = screen.getByTestId('notification-test-id');

    showElement(notificationElement, 'Test Message');

    const style = window.getComputedStyle(notificationElement);

    expect(style.opacity).toBe('1');
    expect(style.zIndex).toBe('100');
  });

  it('hideElement should hide element', () => {
    render(<Notification />);

    const notificationElement = screen.getByTestId('notification-test-id');

    hideElement(notificationElement);

    const style = window.getComputedStyle(notificationElement);

    expect(style.opacity).toBe('');
    expect(style.zIndex).toBe('');
  });
});
