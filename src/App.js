import { useReducer } from "react";
import "./App.css";
import "./styles.css";
import TicketForm from "./components/TicketForm";
import ticketReducer, { initialState } from "./reducers/ticketReducer";

function App() {
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  return (
    <div className="App">
      <div className="container">
        <h1>Bug Blaster</h1>
        <TicketForm dispatch={dispatch} />
      </div>
    </div>
  );
}

export default App;
