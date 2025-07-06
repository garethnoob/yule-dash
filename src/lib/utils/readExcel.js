import * as XLSX from 'xlsx';

/**
 * Reads an Excel file and returns its contents as JSON.
 * @param {File} file - The Excel file to read (from file input).
 * @returns {Promise<Array<Object>>} Parsed data from the first worksheet as an array of objects.
 */
export async function readExcel(file) {
  try {
    // Convert the file to an ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    // Create a Uint8Array from the ArrayBuffer for XLSX parsing
    const data = new Uint8Array(arrayBuffer);
    // Read the workbook from the data array
    const workbook = XLSX.read(data, { type: 'array' });
    // Get the name of the first worksheet
    const sheetName = workbook.SheetNames[0];
    // Get the worksheet object
    const worksheet = workbook.Sheets[sheetName];
    // Convert the worksheet to JSON (array of objects)
    const json = XLSX.utils.sheet_to_json(worksheet);
    // Log the loaded data for debugging

    const sortedJson = json.sort((a, b) => {
      return a.Date - b.Date; // Assuming 'Date' is a field in the JSON objects
    });
    console.log('Excel data loaded:', sortedJson);
    // Return the parsed JSON data
    return sortedJson;
  } catch (error) {
    // Log and rethrow any errors encountered during reading
    console.error('Error reading Excel file:', error);
    throw error;
  }
}
