import * as XLSX from 'xlsx';

/**
 * 
 * @param {File} file 
 * @returns 
 */
export async function readExcel(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);
    console.log('Excel data loaded:', json);
    return json;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    throw error;
  }
}
