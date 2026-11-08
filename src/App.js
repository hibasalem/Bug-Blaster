import { useCallback, useEffect, useReducer, useState } from "react";
import "./styles.css";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import StatusBar from "./components/StatusBar";
import TicketSort from "./components/TicketSort";
import Drawer from "./components/Drawer";
import ticketReducer, { initialState } from "./reducers/ticketReducer";
import { sortControls, initialSort } from "./constants/sortOptions";
import { loadTickets, saveTickets } from "./utils/ticketStorage";

function App() {
  const [state, dispatch] = useReducer(ticketReducer, initialState, (init) => ({
    ...init,
    tickets: loadTickets(),
  }));
  const [sort, setSort] = useState(initialSort);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const isDrawerOpen = isFormOpen || Boolean(state.editingTicket);

  useEffect(() => {
    saveTickets(state.tickets);
  }, [state.tickets]);

  const closeDrawer = useCallback(() => {
    setIsFormOpen(false);
    dispatch({ type: "CLEAR_EDITING_TICKET" });
  }, []);

  return (
    <div className="app">
      <header className="app-header" inert={isDrawerOpen}>
        <div className="app-header-inner">
          <h1 className="brand">
            <span className="brand-logo">BB</span>
            Bug Blaster
          </h1>
          <button
            className="button button-primary"
            onClick={() => setIsFormOpen(true)}
          >
            + New ticket
          </button>
        </div>
      </header>

      <main className="container" inert={isDrawerOpen}>
        <StatusBar tickets={state.tickets}>
          <TicketSort
            controls={sortControls}
            sort={sort}
            onChange={(key, option) =>
              setSort((prevSort) => ({ ...prevSort, [key]: option }))
            }
          />
        </StatusBar>

        <TicketList tickets={state.tickets} dispatch={dispatch} sort={sort} />
      </main>

      <Drawer
        isOpen={isDrawerOpen}
        title={state.editingTicket ? "Edit ticket" : "New ticket"}
        onClose={closeDrawer}
      >
        <TicketForm
          dispatch={dispatch}
          editingTicket={state.editingTicket}
          isOpen={isDrawerOpen}
          onClose={closeDrawer}
        />
      </Drawer>
    </div>
  );
}

export default App;
