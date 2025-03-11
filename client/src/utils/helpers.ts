
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
