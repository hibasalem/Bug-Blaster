export const initialState = { tickets: [], editingTicket: null };

export default function ticketReducer(state, action) {
  switch (action.type) {
    case "ADD_TICKET":
      return { ...state, tickets: [...state.tickets, action.payload] };



    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket.id !== action.payload.id
        ),
        editingTicket:
          state.editingTicket?.id === action.payload.id
            ? null
            : state.editingTicket,
      };

    case "SET_EDITING_TICKET":
      return { ...state, editingTicket: action.payload };

    case "CLEAR_EDITING_TICKET":
      return { ...state, editingTicket: null };

    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket.id === action.payload.id ? action.payload : ticket
        ),
        editingTicket: null,
      };

    default:
      return state;
  }
}
