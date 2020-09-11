import {
  GetCsvResponses,
  GetCsvResponses_getForm_responses_entries,
} from './__generated__/GetCsvResponses';

export function makeCsv(data: GetCsvResponses): string[][] {
  const fieldTypes = Object.fromEntries(
    data.getForm!.fields!.map(field => [field.id, field.type])
  );

  function entryToString(
    entry: GetCsvResponses_getForm_responses_entries
  ): string | null {
    switch (fieldTypes[entry.field.id]) {
      case 'Date':
        return entry.date;
      case 'NetPromoterScore':
        return entry.netPromoterScore?.toString() || null;
      case 'Rating':
        return entry.rating?.toString() || null;
      case 'SingleChoice':
        return entry.singleChoice?.title || null;
      case 'Text':
        return entry.text;
      default:
        return null;
    }
  }

  const responses = data.getForm!.responses!.map(response =>
    Object.fromEntries(
      response.entries
        .map(entry => [entry!.field!.id, entryToString(entry)])
        .filter(([_, value]) => value !== null)
    )
  );

  const csv = [data.getForm!.fields!.map(field => field.title!)];
  responses.map(response =>
    csv.push(data.getForm!.fields!.map(field => response[field.id] || ''))
  );

  return csv;
}
