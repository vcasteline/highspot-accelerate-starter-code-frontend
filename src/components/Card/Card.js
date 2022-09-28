import "./Card.css";

export function Card({ cardData }) {
  return <div className="Card">
    <div className="cardImage">
      <img alt="" className="image" src={cardData.imageUrl}/>
    </div>
    <div className="cardText">
      <p className="cardTitle"><b>{cardData.name}</b></p>
      <p>{cardData.text}</p>
      <p><b>Set Name: </b>{cardData.set.name}</p>
      <p><b>Type: </b>{cardData.type}</p>
    </div>
  </div>;
}
