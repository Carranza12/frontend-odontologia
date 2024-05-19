import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CsvService {
  constructor() {}

  downloadWithPagination(data: any[], filename: string) {
    const csv = this.convertArrayToCsv(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    document.body.appendChild(a);
    a.download = filename + '.csv';
    a.href = url;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }
  private convertArrayToCsv(data: any[]) {
    const csv = [];
    const header = Object.keys(data[0]);
    csv.push(header.join(','));

    data.forEach((row: any) => {
      const values = header.map((field) => this.scapeCsvValue(row[field]));
      csv.push(values.join(','));
    });

    return csv.join('\n');
  }

  private scapeCsvValue(value: any): string {
    if (typeof value === 'string') {
      return `"${value.replace(/"/g, '""')}"`;
    } else {
      return value;
    }
  }
}
