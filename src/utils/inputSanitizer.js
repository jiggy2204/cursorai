/**
 * Input Sanitization Utility
 * Provides functions to sanitize user inputs and prevent XSS attacks
 */

const DISALLOWED_TAGS = ['script', 'iframe', 'object', 'embed', 'form'];
const DISALLOWED_ATTRIBUTES = ['onerror', 'onload', 'onclick', 'onmouseover', 'javascript:'];

/**
 * Sanitizes HTML string by removing potentially dangerous tags and attributes
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeHTML = (input) => {
  if (typeof input !== 'string') {
    return '';
  }

  let sanitized = input
    // Encode special characters
    .replace(/[&<>"']/g, (match) => {
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;'
      };
      return entities[match];
    })
    // Remove dangerous tags
    .replace(
      new RegExp(`<(${DISALLOWED_TAGS.join('|')})(\\s[^>]*)?>`,'gi'),
      ''
    )
    // Remove closing tags for disallowed tags
    .replace(
      new RegExp(`</(${DISALLOWED_TAGS.join('|')})>`,'gi'),
      ''
    )
    // Remove dangerous attributes
    .replace(
      new RegExp(`(${DISALLOWED_ATTRIBUTES.join('|')})\\s*=\\s*["'][^"']*["']`, 'gi'),
      ''
    );

  return sanitized;
};

/**
 * Sanitizes plain text input by removing special characters and trimming
 * @param {string} input - The input string to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeText = (input) => {
  if (typeof input !== 'string') {
    return '';
  }
  
  return input
    .trim()
    .replace(/[<>]/g, ''); // Remove angle brackets
};

/**
 * Sanitizes URL input to prevent javascript: protocol and other malicious URLs
 * @param {string} url - The URL to sanitize
 * @returns {string} - Sanitized URL or empty string if invalid
 */
export const sanitizeURL = (url) => {
  if (typeof url !== 'string') {
    return '';
  }

  try {
    const urlObj = new URL(url);
    // Only allow http: and https: protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return '';
    }
    return url;
  } catch {
    return '';
  }
};

/**
 * Creates a sanitized React event handler that prevents XSS in input fields
 * @param {Function} handler - The original event handler
 * @returns {Function} - Sanitized event handler
 */
export const createSafeChangeHandler = (handler) => {
  return (event) => {
    const sanitizedValue = sanitizeText(event.target.value);
    event.target.value = sanitizedValue;
    handler(event);
  };
}; 