import { Link } from "react-router-dom";
import "./widget.scss"
const Widget = ({name, imageURL , destination}) => {
  return (
    <Link to={destination} style={{
      textDecoration: 'none'
    }}>
    <div className="widget" style={{
      backgroundImage: `url(${imageURL})`
    }}>
      <h1 className="widgetTitle">{name}</h1>
    </div>
    </Link>
    );
}
 
export default Widget;
