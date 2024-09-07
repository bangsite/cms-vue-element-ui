export default {
  0: "Oops! It looks like there's an issue with your internet connection. Please try again later.",
  400: "There was a problem with the data you entered. Please review and correct it.", // BadRequest
  401: "Your session has expired. Please log in again to continue.", // Unauthorized
  402: "Payment is required to complete this action. Please check your payment details.", // PaymentRequired
  403: "Access Denied: You do not have permission to view this resource.", // Forbidden
  404: "Sorry, the page or resource you are looking for cannot be found.", // NotFound
  409: "There was a conflict with your request. Please try again.", // Conflict
  500: "Something went wrong on our end. Please try again later.", // InternalServerError
  502: "We’re experiencing issues with our server. Please try again later.", // BadGateway

  // Additional status codes
  301: "The page has been moved permanently. Please update your bookmark.", // MovedPermanently
  302: "The page has been temporarily moved. You will be redirected shortly.", // Found
  304: "No new updates are available. Please refresh the page if needed.", // NotModified
  403: "Access Denied: You do not have permission to access this resource.", // Forbidden
  503: "Our service is temporarily unavailable. Please try again later.", // ServiceUnavailable
  504: "The request timed out. Please try again later.", // GatewayTimeout
};
