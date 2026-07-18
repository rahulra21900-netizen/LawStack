import { triggerDownload } from "./download";

export function exportToCsv<T>(data: T[], filename: string) {
  if (data.length === 0) return;
  const headers = Object.keys(data[0] as object).join(",");
  const rows = data.map((item) =>
    Object.values(item as object)
      .map((val) => `"${String(val).replace(/"/g, '""')}"`)
      .join(",")
  );
  const csvContent = [headers, ...rows].join("\n");
  triggerDownload(csvContent, filename, "text/csv");
}
