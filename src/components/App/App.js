import { useEffect, useState } from "react";
import "./App.css";
import { Api } from "../../api";
import { Card } from "../Card";

export function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Fetch the cards using the API endpoint
  }, []);

  return (
    <div className="App">
      <div className="App-cardlist" role="list">
        {/* Render each card returned from the API */}
      </div>
    </div>
  );
}
