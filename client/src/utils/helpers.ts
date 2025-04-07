
/**
 * Formats a date string to a more readable format
 * @param dateString - The date string to format (e.g., "2023-04-15")
 * @returns Formatted date (e.g., "April 15, 2023")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Truncates text with ellipsis if it exceeds the specified length
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis or original text if shorter
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
}

/**
 * Formats a number as a currency string
 * @param amount - The number to format
 * @returns Formatted currency string (e.g., "$1,000,000")
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Converts minutes to hours and minutes format
 * @param totalMinutes - Total minutes
 * @returns Formatted duration (e.g., "2h 15m")
 */
export function formatRuntime(totalMinutes: number): string {
  if (!totalMinutes) return '';
  
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours}h ${minutes}m`;
}
/**
 * Helper functions for the MovieMatchMaker application
 */

/**
 * Format a date string to a more readable format
 * @param dateString - Date string in ISO format
 * @returns Formatted date string (e.g., "January 1, 2023")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return 'Unknown';
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Convert minutes to hours and minutes format
 * @param minutes - Runtime in minutes
 * @returns Formatted runtime string (e.g., "2h 15m")
 */
export function formatRuntime(minutes: number): string {
  if (!minutes || minutes <= 0) return 'Unknown';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Format currency values
 * @param value - Number to format
 * @returns Formatted currency string (e.g., "$1,000,000")
 */
export function formatCurrency(value: number): string {
  if (!value && value !== 0) return 'Unknown';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Truncate text to a specific length and add ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
}
