const PlantDetailPage = ({ plant }) => {
  return (
    <div className="plant-detail-container">
      <h1>{plant.name}</h1>
      <img
        className="plant-profile-img"
        src="../../Calathea_orbifolia.jpg"
      ></img>
      <h3>Watering Frequency</h3>
      <p>{plant.watering_frequency}</p>
    </div>
  );
};
export default PlantDetailPage;
