import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl,box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageUrl} alt="" className="face-image" />
        <div id="bounding-box" style={{top:box.topRow, bottom:box.bottomRow, left:box.leftCol, right:box.rightCol}}></div>
      </div>
    </div>
  );
};

export default FaceRecognition;