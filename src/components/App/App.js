import { useEffect, useState} from "react";
import "./App.css";
import { Card } from "../Card";
import { fetchCards } from "../../api/api";

export function App() {
  const [cards, setCards] = useState([]);
  const [fetching, setFetching] = useState(true);
  let [page, setPage] = useState(1);
  const [query, setQuery] = useState("")

  const searchCards = (e) =>{
    e.preventDefault();
    if(query===""){
      setPage(0);
    }
    setFetching(true);
    fetch(`https://api.elderscrollslegends.io/v1/cards?name=${query}&pageSize=20`).then(response => response.json())
    .then(responseData => {
      setCards(responseData.cards);
    }).finally(setFetching(false));
  }
  const loadCards = () =>{
    //load the first 20 cards
    setCards([]);
    setPage(1);
    setFetching(true);
    setTimeout(()=>{
      fetchCards(1).then((actualData) => setCards(actualData.cards))
      .finally(setFetching(false));
    }, 1000)

  }
  const loadMoreCards = () => {   
    setFetching(true);
    setTimeout(()=>{
    fetchCards(page).then((actualData) => setCards(oldCards => [...oldCards, ...actualData.cards]))
    .finally(setFetching(false));
    }, 1000)
    setPage(page++);
   
  }

  const infiniteScrolling = () => {
  
    const bottomMinus = (window.innerHeight + document.documentElement.scrollTop) >= document.documentElement.offsetHeight-0.5;
    const bottom = (window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight;
    
    if ((bottom || bottomMinus) && query==="") {//if reached the end of the page
    
      loadMoreCards();
    }

  }
  useEffect(() => {
    // Fetch the cards using the API endpoint
   
    window.addEventListener('scroll', infiniteScrolling);
    if(query===""){
      loadCards();
    }
    return () => window.removeEventListener("scroll", infiniteScrolling);
  
  },[query]);
  
  return (
    <div className="App">
      <div className="title">
        <h1 className="titleText">Elder Scrolls Cards</h1>
      </div>
      <div className="Search">
        <form onSubmit={searchCards}>
          <input className="searchBar" placeholder="Enter Card Title" onChange={event => setQuery(event.target.value)}/>
          <button className="searchButton">Search</button>
        </form>
       
      </div>
      <div className="App-cardlist" role="list">
        
        {
        cards ? cards.map((card, idx)=>
          <Card key={idx} cardData={card}/>
        ): 
        <div></div>
        }
        {/* Render each card returned from the API */}
      </div>
      
      <div className="Loader">
        {
          fetching?
          <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>: <></>
          
        }
      </div>
      
    </div>
  );
}
