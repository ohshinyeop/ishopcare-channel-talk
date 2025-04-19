export interface ExcelData {
    sheetName: string;
    headers: string[];
    rows: Array<Record<string, any>>;
}

export interface ChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
    }>;
}

export interface DataSelection {
    selectedRows: number[];
    selectedColumns: string[];
}