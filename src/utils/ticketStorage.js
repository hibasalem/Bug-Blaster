const STORAGE_KEY = "bug-blaster-tickets";

export const loadTickets = () => {
  try {
    const tickets = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(tickets) ? tickets : [];
  } catch {
    return [];
  }
};

export const saveTickets = (tickets) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch {}
};
