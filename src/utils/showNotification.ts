import { DEFAULT_NOTIFICATION } from "src/constants";
import { hideElement } from "./hideElement";
import { showElement } from "./showElement";
import { Severity } from "src/types";

export const showNotification = (message: string, debounce: number, severity = Severity.Info) => {
    const notification = document.getElementById('notification');

    if (notification) {
        notification.dataset.severity = severity;
        hideElement(notification, DEFAULT_NOTIFICATION, debounce);
        showElement(notification, message);
      }
}