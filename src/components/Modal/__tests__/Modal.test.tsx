import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Modal } from '../Modal';

const cancelButtonMessageMock = 'Test Cancel';
const submitButtonMessageMock = 'Test Submit';
const handleCloseMock = vi.fn();
const handleSubmitMock = vi.fn();
const messageMock = 'Test Message';
const submitClassNameMock = 'submitTestClass';
const cancelClassNameMock = 'cancelTestClass';

describe('Testing: Modal', () => {
  it('should render', () => {
    const { container } = render(
      <Modal
        cancelButtonMessage={cancelButtonMessageMock}
        submitButtonMessage={submitButtonMessageMock}
        isLoading={false}
        handleClose={handleCloseMock}
        handleSubmit={handleSubmitMock}
        message={messageMock}
        submitClassName={submitClassNameMock}
        cancelClassName={cancelClassNameMock}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('should call provided function after click submit', () => {
    render(
      <Modal
      cancelButtonMessage={cancelButtonMessageMock}
      submitButtonMessage={submitButtonMessageMock}
      isLoading={false}
      handleClose={handleCloseMock}
      handleSubmit={handleSubmitMock}
      message={messageMock}
      submitClassName={submitClassNameMock}
      cancelClassName={cancelClassNameMock}
    />
    );

    const renderedButton = screen.getByText(submitButtonMessageMock);

    fireEvent.click(renderedButton);

    expect(handleSubmitMock).toHaveBeenCalled();
  });

  it('should call provided function after click cancel', () => {
    render(
      <Modal
      cancelButtonMessage={cancelButtonMessageMock}
      submitButtonMessage={submitButtonMessageMock}
      isLoading={false}
      handleClose={handleCloseMock}
      handleSubmit={handleSubmitMock}
      message={messageMock}
      submitClassName={submitClassNameMock}
      cancelClassName={cancelClassNameMock}
    />
    );

    const renderedButton = screen.getByText(cancelButtonMessageMock);

    fireEvent.click(renderedButton);

    expect(handleCloseMock).toHaveBeenCalled();
  });
});
