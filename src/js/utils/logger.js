/**
 * Simple logger utility for the application
 * Provides consistent logging with environment awareness
 */

const isDevelopment = import.meta.env.DEV;

class Logger {
  constructor() {
    this.enabled = isDevelopment;
  }

  /**
   * Log informational messages
   * @param {string} message - The message to log
   * @param {...any} args - Additional arguments to log
   */
  info(message, ...args) {
    if (this.enabled) {
      console.info(`[INFO] ${message}`, ...args);
    }
  }

  /**
   * Log warning messages
   * @param {string} message - The message to log
   * @param {...any} args - Additional arguments to log
   */
  warn(message, ...args) {
    if (this.enabled) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  /**
   * Log error messages (always enabled)
   * @param {string} message - The message to log
   * @param {...any} args - Additional arguments to log
   */
  error(message, ...args) {
    console.error(`[ERROR] ${message}`, ...args);
  }

  /**
   * Log debug messages (only in development)
   * @param {string} message - The message to log
   * @param {...any} args - Additional arguments to log
   */
  debug(message, ...args) {
    if (this.enabled) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Log performance metrics
   * @param {string} label - The label for the metric
   * @param {number} startTime - The start time from performance.now()
   */
  performance(label, startTime) {
    if (this.enabled && typeof window !== 'undefined' && window.performance) {
      const duration = window.performance.now() - startTime;
      console.info(`[PERF] ${label}: ${duration.toFixed(2)}ms`);
    }
  }

  /**
   * Create a grouped log
   * @param {string} label - The group label
   * @param {Function} fn - Function containing grouped logs
   */
  group(label, fn) {
    if (this.enabled) {
      console.group(label);
      fn();
      console.groupEnd();
    }
  }
}

// Export singleton instance
export const logger = new Logger();
export default logger;
