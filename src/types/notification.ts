/**
 * Interface for notification services.
 * Implement this interface to integrate different notification libraries.
 */
export interface INotification {
  /**
   * Display an error notification.
   * @param title - The title for the notification.
   * @param message - The error message to display.
   * @param status - The status response from API.
   */
  showError(title: string, message: string, status?: number): void;

  /**
   * Display a success notification.
   * @param title - The title for the notification.
   * @param message - The success message to display.
   * @param status - The status response from API.
   */
  showSuccess(title: string, message: string, status?: number): void;

  // Optionally extend for other notification types
  // showWarning(title: string, message: string): void;
  // showInfo(title: string, message: string): void;
}
