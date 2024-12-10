export function wideToTidy(input: any, inputType?: string): any;
export function transformToSeriesFormat(input: any, inputType?: string): {
    series: {
        name: string;
        data: any;
    }[];
    dates: any;
};
/**
 * A utility class for parsing and formatting dates with support for various formats
 */
export class DateParser {
    formatTokens: {
        '%d': string;
        '%m': string;
        '%Y': string;
        '%y': string;
        '%H': string;
        '%M': string;
        '%S': string;
    };
    /**
     * Pads a number with leading zeros
     * @param {number} num - The number to pad
     * @param {number} width - The desired width of the resulting string
     * @returns {string} The padded number as a string
     */
    pad(num: number, width?: number): string;
    /**
   * Validates the date string against the provided format
   * @param {string} dateStr - The date string to validate
   * @param {string} format - The expected format (e.g., "%d/%m/%Y")
   * @returns {boolean} True if the date string matches the format
   */
    validateDateString(dateStr: string, format: string): boolean;
    /**
     * Parses a date string according to the specified format
     * @param {string|number} dateStr - The date string or number to parse
     * @param {string} format - The format of the date string (e.g., "%d/%m/%Y")
     * @returns {Date|null} A JavaScript Date object or null if parsing fails
     */
    parse(dateStr: string | number, format: string): Date | null;
    /**
     * Formats a Date object according to the specified format
     * @param {Date} date - The Date object to format
     * @param {string} format - The desired format (e.g., "%d/%m/%Y")
     * @returns {string|null} The formatted date string or null if formatting fails
     */
    format(date: Date, format: string): string | null;
    /**
     * Parses dates from CSV data
     * @param {string} csvData - The CSV data as a string
     * @param {Object} options - Parsing options
     * @param {string} options.dateFormat - The format of dates in the CSV
     * @param {number} options.dateColumnIndex - The index of the date column (0-based)
     * @param {boolean} options.hasHeader - Whether the CSV has a header row
     * @returns {Array} Array of parsed rows with Date objects
     */
    parseCSVDates(csvData: string, { dateFormat, dateColumnIndex, hasHeader }: {
        dateFormat: string;
        dateColumnIndex: number;
        hasHeader: boolean;
    }): any[];
    /**
     * Parses dates from JSON data
     * @param {Array|Object} jsonData - JSON data containing date fields
     * @param {Object} options - Parsing options
     * @param {string} options.dateFormat - The format of dates in the JSON
     * @param {string|Array<string>} options.dateFields - Field name(s) containing dates
     * @param {boolean} options.clone - Whether to clone the input data (default: true)
     * @returns {Array|Object} Parsed data with Date objects
     */
    parseJSONDates(jsonData: any[] | any, { dateFormat, dateFields, clone }: {
        dateFormat: string;
        dateFields: string | Array<string>;
        clone: boolean;
    }): any[] | any;
    /**
     * Formats dates in JSON data back to strings
     * @param {Array|Object} jsonData - JSON data containing Date objects
     * @param {Object} options - Formatting options
     * @param {string} options.dateFormat - The desired output format
     * @param {string|Array<string>} options.dateFields - Field name(s) containing dates
     * @param {boolean} options.clone - Whether to clone the input data (default: true)
     * @returns {Array|Object} Data with formatted date strings
     */
    formatJSONDates(jsonData: any[] | any, { dateFormat, dateFields, clone }: {
        dateFormat: string;
        dateFields: string | Array<string>;
        clone: boolean;
    }): any[] | any;
}
