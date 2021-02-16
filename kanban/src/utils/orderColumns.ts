import { parseJSON } from "./parseJSON";

interface orderColumnsProps {
  columns: any;
  order: string[];
}

export const orderColumns = ({
  columns: dataColumns,
  order = [],
}: orderColumnsProps) => {
  const columns = Array.isArray(dataColumns)
    ? dataColumns.map((c) => {
        const column = { ...c };
        const order = parseJSON(
          column?.order,
          (order) => Array.isArray(order),
          []
        );
        const tickets = Array.isArray(column?.tickets)
          ? [...column.tickets]
          : [];
        tickets.sort((a, b) => {
          if (!order.includes(a.id) && !order.includes(b.id)) return 0;
          if (!order.includes(a.id)) return 1;
          if (!order.includes(b.id)) return -1;
          return order.indexOf(a.id) - order.indexOf(b.id);
        });
        column.tickets = tickets;
        return column;
      })
    : [];
  columns.sort((a, b) => {
    if (!order.includes(a.colID) && !order.includes(b.colID)) return 0;
    if (!order.includes(a.colID)) return 1;
    if (!order.includes(b.colID)) return -1;
    return order.indexOf(a.colID) - order.indexOf(b.colID);
  });
  return columns;
};
