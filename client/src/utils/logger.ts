
/**
 * Simple logger utility for the application
 */

enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

// Configure the minimum log level (can be overridden from environment)
const MIN_LOG_LEVEL = process.env.NODE_ENV === 'production' ? LogLevel.INFO : LogLevel.DEBUG;

class Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  /**
   * Format the log message with timestamp and context
   */
  private formatMessage(level: string, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }

  /**
   * Log a debug message
   */
  debug(message: string, ...args: any[]): void {
    if (MIN_LOG_LEVEL <= LogLevel.DEBUG) {
      console.debug(this.formatMessage('DEBUG', message), ...args);
    }
  }

  /**
   * Log an info message
   */
  info(message: string, ...args: any[]): void {
    if (MIN_LOG_LEVEL <= LogLevel.INFO) {
      console.info(this.formatMessage('INFO', message), ...args);
    }
  }

  /**
   * Log a warning message
   */
  warn(message: string, ...args: any[]): void {
    if (MIN_LOG_LEVEL <= LogLevel.WARN) {
      console.warn(this.formatMessage('WARN', message), ...args);
    }
  }

  /**
   * Log an error message
   */
  error(message: string, ...args: any[]): void {
    if (MIN_LOG_LEVEL <= LogLevel.ERROR) {
      console.error(this.formatMessage('ERROR', message), ...args);
    }
  }
}

/**
 * Create a logger for a specific context
 */
export function createLogger(context: string): Logger {
  return new Logger(context);
}

// Default logger
export default createLogger('App');
/**
 * Simple logger utility for the application
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

// Enable/disable debug logs based on environment
const DEBUG_ENABLED = process.env.NODE_ENV !== 'production';

/**
 * Log a message with the specified level
 * @param level - Log level
 * @param message - Message to log
 * @param data - Optional data to include
 */
function log(level: LogLevel, message: string, data?: any): void {
  // Skip debug logs in production
  if (level === 'debug' && !DEBUG_ENABLED) {
    return;
  }
  
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${level.toUpperCase()}] [${timestamp}] ${message}`;
  
  switch (level) {
    case 'info':
      console.info(formattedMessage, data || '');
      break;
    case 'warn':
      console.warn(formattedMessage, data || '');
      break;
    case 'error':
      console.error(formattedMessage, data || '');
      break;
    case 'debug':
      console.debug(formattedMessage, data || '');
      break;
    default:
      console.log(formattedMessage, data || '');
  }
}

const logger = {
  info: (message: string, data?: any) => log('info', message, data),
  warn: (message: string, data?: any) => log('warn', message, data),
  error: (message: string, data?: any) => log('error', message, data),
  debug: (message: string, data?: any) => log('debug', message, data)
};

export default logger;
