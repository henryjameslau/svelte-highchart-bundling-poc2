import Papa from 'papaparse';

export const wideToTidy = (input, inputType = 'csv') => {
  // Parse input based on type
  let data;
  if (inputType === 'csv') {
    const parseResult = Papa.parse(input, {
      header: true,
      skipEmptyLines: true,
    });
    data = parseResult.data;
  } else if (inputType === 'json') {
    data = Array.isArray(input) ? input : JSON.parse(input);
  } else {
    throw new Error('Invalid input type. Use "csv" or "json"');
  }

  // Get category columns (all columns except 'name')
  const categoryColumns = Object.keys(data[0]).filter((col) => col !== 'name');

  // Transform to tidy format
  const tidyData = data.reduce((acc, row) => {
    categoryColumns.forEach((category) => {
      // Clean category name by removing asterisks
      const cleanCategory = category.replace(/^\*/, '');

      acc.push({
        name: row.name,
        category: cleanCategory,
        value: parseFloat(row[category]) || 0,
      });
    });
    return acc;
  }, []);

  return tidyData;
};

export const transformToSeriesFormat = (input, inputType = 'csv') => {
  // Parse input based on type
  let data;
  if (inputType === 'csv') {
    const parseResult = Papa.parse(input, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });
    data = parseResult.data;
  } else if (inputType === 'json') {
    data = Array.isArray(input) ? input : JSON.parse(input);
  } else {
    throw new Error('Invalid input type. Use "csv" or "json"');
  }

  // Get categories (excluding date)
  const categories = Object.keys(data[0])
    .filter((col) => col !== 'date')
    .map((cat) => cat.replace(/^['"]|['"]$/g, '')); // Remove quotes if present

  // Transform to series format
  const series = categories.map((category) => {
    return {
      name: category,
      data: data.map((row) => {
        const value = row[category];
        return typeof value === 'number'
          ? value
          : typeof value === 'string' && value.startsWith('*')
          ? parseFloat(value.substring(1))
          : parseFloat(value) || 0;
      }),
    };
  });

  // Extract dates for x-axis if needed
  const dates = data.map((row) => row.date);

  return {
    series,
    dates,
  };
};

/**
 * A utility class for parsing and formatting dates with support for various formats
 */
export class DateParser {
  constructor() {
    this.formatTokens = {
      '%d': 'day', // Day of the month as zero-padded number (01-31)
      '%m': 'month', // Month as zero-padded number (01-12)
      '%Y': 'fullYear', // Year with century as a decimal number
      '%y': 'shortYear', // Year without century (00-99)
      '%H': 'hours', // Hour (24-hour clock) as zero-padded number (00-23)
      '%M': 'minutes', // Minute as zero-padded number (00-59)
      '%S': 'seconds', // Second as zero-padded number (00-59)
    };
  }

  /**
   * Pads a number with leading zeros
   * @param {number} num - The number to pad
   * @param {number} width - The desired width of the resulting string
   * @returns {string} The padded number as a string
   */
  pad(num, width = 2) {
    return String(num).padStart(width, '0');
  }

    /**
   * Validates the date string against the provided format
   * @param {string} dateStr - The date string to validate
   * @param {string} format - The expected format (e.g., "%d/%m/%Y")
   * @returns {boolean} True if the date string matches the format
   */
  validateDateString(dateStr, format) {
    if (!dateStr || !format) return false;

    // Create regex pattern from format string
    let pattern = format
      .replace(/%d/g, '([0-3][0-9])')
      .replace(/%m/g, '([0-1][0-9])')
      .replace(/%Y/g, '([0-9]{4})')
      .replace(/%y/g, '([0-9]{2})')
      .replace(/%H/g, '([0-2][0-9])')
      .replace(/%M/g, '([0-5][0-9])')
      .replace(/%S/g, '([0-5][0-9])');

    pattern = `^${pattern}$`;
    const regex = new RegExp(pattern);
    return regex.test(String(dateStr));  // Convert to string to handle number inputs
  }

  /**
   * Parses a date string according to the specified format
   * @param {string|number} dateStr - The date string or number to parse
   * @param {string} format - The format of the date string (e.g., "%d/%m/%Y")
   * @returns {Date|null} A JavaScript Date object or null if parsing fails
   */
  parse(dateStr, format) {
    try {
      // Validate inputs
      if (dateStr === undefined || dateStr === null || !format) {
        throw new Error('Date string/number and format are required');
      }

      // Convert number to padded string
      const dateString =
        typeof dateStr === 'number'
          ? this.pad(dateStr, format.includes('%Y') ? 4 : 2)
          : String(dateStr);

      if (!this.validateDateString(dateString, format)) {
        throw new Error(
          `Date string "${dateString}" doesn't match format "${format}"`
        );
      }

      // Split the format into parts
      const separators = format.replace(/%[a-zA-Z]/g, '|').split('|');
      const formatParts = format.match(/%[a-zA-Z]/g) || [];

      // Split the date string using the same separators
      let dateStrParts = dateString;
      separators.forEach((sep) => {
        if (sep) {
          dateStrParts = dateStrParts.split(sep).join('|');
        }
      });
      dateStrParts = dateStrParts.split('|');

      if (formatParts.length !== dateStrParts.length) {
        throw new Error('Format parts do not match date string parts');
      }

      // Create a date object with default values
      const date = new Date(0);
      date.setUTCFullYear(1970);
      date.setUTCMonth(0);
      date.setUTCDate(1);
      date.setUTCHours(0);
      date.setUTCMinutes(0);
      date.setUTCSeconds(0);
      date.setUTCMilliseconds(0);

      // Parse each part according to the format
      formatParts.forEach((format, i) => {
        const value = parseInt(dateStrParts[i], 10);

        switch (this.formatTokens[format]) {
          case 'day':
            date.setUTCDate(value);
            break;
          case 'month':
            date.setUTCMonth(value - 1); // Months are 0-based
            break;
          case 'fullYear':
            date.setUTCFullYear(value);
            break;
          case 'shortYear':
            const year = value + (value >= 70 ? 1900 : 2000);
            date.setUTCFullYear(year);
            break;
          case 'hours':
            date.setUTCHours(value);
            break;
          case 'minutes':
            date.setUTCMinutes(value);
            break;
          case 'seconds':
            date.setUTCSeconds(value);
            break;
        }
      });

      return date;
    } catch (error) {
      console.error('Error parsing date:', error);
      return null;
    }
  }

  /**
   * Formats a Date object according to the specified format
   * @param {Date} date - The Date object to format
   * @param {string} format - The desired format (e.g., "%d/%m/%Y")
   * @returns {string|null} The formatted date string or null if formatting fails
   */
  format(date, format) {
    try {
      if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('Invalid Date object');
      }

      return format.replace(/%([a-zA-Z])/g, (_, token) => {
        switch (`%${token}`) {
          case '%d':
            return this.pad(date.getUTCDate());
          case '%m':
            return this.pad(date.getUTCMonth() + 1);
          case '%Y':
            return this.pad(date.getUTCFullYear(), 4);
          case '%y':
            return this.pad(date.getUTCFullYear() % 100);
          case '%H':
            return this.pad(date.getUTCHours());
          case '%M':
            return this.pad(date.getUTCMinutes());
          case '%S':
            return this.pad(date.getUTCSeconds());
          default:
            return '';
        }
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  }

  /**
   * Parses dates from CSV data
   * @param {string} csvData - The CSV data as a string
   * @param {Object} options - Parsing options
   * @param {string} options.dateFormat - The format of dates in the CSV
   * @param {number} options.dateColumnIndex - The index of the date column (0-based)
   * @param {boolean} options.hasHeader - Whether the CSV has a header row
   * @returns {Array} Array of parsed rows with Date objects
   */
  parseCSVDates(
    csvData,
    { dateFormat, dateColumnIndex = 0, hasHeader = true }
  ) {
    try {
      const lines = csvData.trim().split('\n');
      const startIndex = hasHeader ? 1 : 0;
      const results = [];

      // Keep header if present
      if (hasHeader) {
        results.push(lines[0].split(','));
      }

      // Parse each data row
      for (let i = startIndex; i < lines.length; i++) {
        const row = lines[i].split(',');
        const dateStr = row[dateColumnIndex];
        const parsedDate = this.parse(dateStr, dateFormat);

        if (parsedDate) {
          row[dateColumnIndex] = parsedDate;
          results.push(row);
        } else {
          console.warn(`Failed to parse date in row ${i + 1}`);
        }
      }

      return results;
    } catch (error) {
      console.error('Error parsing CSV dates:', error);
      return [];
    }
  }

  /**
   * Parses dates from JSON data
   * @param {Array|Object} jsonData - JSON data containing date fields
   * @param {Object} options - Parsing options
   * @param {string} options.dateFormat - The format of dates in the JSON
   * @param {string|Array<string>} options.dateFields - Field name(s) containing dates
   * @param {boolean} options.clone - Whether to clone the input data (default: true)
   * @returns {Array|Object} Parsed data with Date objects
   */
  parseJSONDates(
    jsonData,
    { dateFormat, dateFields = ['date'], clone = true }
  ) {
    try {
      // Validate inputs
      if (!jsonData) {
        throw new Error('JSON data is required');
      }

      if (!dateFormat) {
        throw new Error('Date format is required');
      }

      // Convert single field to array
      const dateFieldsArray = Array.isArray(dateFields)
        ? dateFields
        : [dateFields];

      // Helper function to process a single object
      const processObject = (obj) => {
        const newObj = clone ? { ...obj } : obj;
        dateFieldsArray.forEach((field) => {
          if (
            field in newObj &&
            (typeof newObj[field] === 'string' ||
              typeof newObj[field] === 'number')
          ) {
            const parsedDate = this.parse(newObj[field], dateFormat);
            if (parsedDate) {
              newObj[field] = parsedDate;
            }
          }
        });
        return newObj;
      };

      // Handle both array and single object inputs
      if (Array.isArray(jsonData)) {
        return jsonData.map((item) => processObject(item));
      } else {
        return processObject(jsonData);
      }
    } catch (error) {
      console.error('Error parsing JSON dates:', error);
      return clone ? (Array.isArray(jsonData) ? [] : {}) : jsonData;
    }
  }

  /**
   * Formats dates in JSON data back to strings
   * @param {Array|Object} jsonData - JSON data containing Date objects
   * @param {Object} options - Formatting options
   * @param {string} options.dateFormat - The desired output format
   * @param {string|Array<string>} options.dateFields - Field name(s) containing dates
   * @param {boolean} options.clone - Whether to clone the input data (default: true)
   * @returns {Array|Object} Data with formatted date strings
   */
  formatJSONDates(
    jsonData,
    { dateFormat, dateFields = ['date'], clone = true }
  ) {
    try {
      // Validate inputs
      if (!jsonData) {
        throw new Error('JSON data is required');
      }

      if (!dateFormat) {
        throw new Error('Date format is required');
      }

      // Convert single field to array
      const dateFieldsArray = Array.isArray(dateFields)
        ? dateFields
        : [dateFields];

      // Helper function to process a single object
      const processObject = (obj) => {
        const newObj = clone ? { ...obj } : obj;
        dateFieldsArray.forEach((field) => {
          if (field in newObj && newObj[field] instanceof Date) {
            const formattedDate = this.format(newObj[field], dateFormat);
            if (formattedDate) {
              newObj[field] = formattedDate;
            }
          }
        });
        return newObj;
      };

      // Handle both array and single object inputs
      if (Array.isArray(jsonData)) {
        return jsonData.map((item) => processObject(item));
      } else {
        return processObject(jsonData);
      }
    } catch (error) {
      console.error('Error formatting JSON dates:', error);
      return clone ? (Array.isArray(jsonData) ? [] : {}) : jsonData;
    }
  }
}
