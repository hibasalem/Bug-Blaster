const STORAGE_KEY = "bug-blaster-tickets";

export const loadTickets = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
};

export const saveTickets = (tickets) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
