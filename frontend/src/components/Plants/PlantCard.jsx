import StatusTag from "./StatusTag";

const PlantCard = ({ plant }) => {
  return (
    <div className="plant-card">
      <div className="image-gallery">
        <img src="../../Calathea_orbifolia.jpg"></img>
      </div>
      <div className="plant-info-section">
        <h2>{plant.name}</h2>
        <StatusTag status={plant.status}/>
        <h4>Last Note:</h4>
        <p>One of the leaves looked a little bit yellow, I'm thinking I may have overwatered</p>
      </div>
    </div>
  );
};
export default PlantCard;
