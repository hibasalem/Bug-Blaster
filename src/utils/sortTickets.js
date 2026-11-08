export default function sortTickets(tickets, sort) {
  return [...tickets].sort(
    (a, b) => sort.type.compare(a, b) * sort.direction.multiplier
  );
}
