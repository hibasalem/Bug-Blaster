import { useReducer, useState } from "react";
import "./App.css";
import "./styles.css";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import StatusBar from "./components/StatusBar";
import TicketSort from "./components/TicketSort";
import ticketReducer, { initialState } from "./reducers/ticketReducer";
import { sortControls, initialSort } from "./constants/sortOptions";

function App() {
  const [state, dispatch] = useReducer(ticketReducer, initialState);
  const [sort, setSort] = useState(initialSort);

  return (
    <div className="App">
      <div className="container">
        <h1>Bug Blaster</h1>
        <TicketForm dispatch={dispatch} editingTicket={state.editingTicket} />

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
      </div>
    </div>
  );
}

export default App;
