import "./NullPositionError.css";

export default function NullPositionError() {

  return (
    <div className="null-position-popup-container">
      <h2 className="null-position-popup-title">Warning ⚠️</h2>
      <span className="null-position-popup-description">Please select a location on the right side map, then click answer.</span>
    </div>);
}