export const setHeightUsingScroll = (element?: HTMLElement | null) => {
  if (!element) return;

  element.style.height = '0';
  element.style.height = `${element.scrollHeight}px`;
};
