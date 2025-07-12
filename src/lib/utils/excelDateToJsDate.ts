export function excelDateToJsDate(excelDate: number): Date {
    // Convert Excel date to JavaScript Date object
    const date = new Date((excelDate - 25569) * 86400 * 1000);
    return date;
  }