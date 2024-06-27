export const showElement = (element: HTMLElement, message?: string) => {
  if (message) {
    const notificationMessage = document.querySelector('MuiAlert-message');

    notificationMessage && element.contains(notificationMessage)
      ? (notificationMessage as HTMLElement).innerText = message
      : element.innerText = message
  }

  element.style.opacity = '1';
  element.style.zIndex = '100';
  element.style.pointerEvents = 'all';
};
