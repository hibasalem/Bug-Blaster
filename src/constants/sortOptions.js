export const sortTypes = [
  { value: "date", label: "Date", compare: (a, b) => a.createdAt.localeCompare(b.createdAt) },
  { value: "priority", label: "Priority", compare: (a, b) => a.priority - b.priority },
];

export const sortDirections = [
  { value: "desc", label: "Descending", multiplier: -1 },
  { value: "asc", label: "Ascending", multiplier: 1 },
];

export const sortControls = [
  { key: "type", control: "select", label: "Sort by", options: sortTypes },
  { key: "direction", control: "toggle", options: sortDirections },
];

export const initialSort = Object.fromEntries(
  sortControls.map(({ key, options }) => [key, options[0]])
);
