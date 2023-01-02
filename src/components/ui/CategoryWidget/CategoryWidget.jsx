import { Link } from "react-router-dom";
import "./categorywidget.scss"
const CategoryWidget = ({name, imageURL , destination}) => {
  return (
      <Link to={destination} style={{
        textDecoration: 'none'
      }}>
        <div className="categoryWidget">
        <img src={imageURL} className="image" alt={name}/>
        <h1 className="categoryWidgetTitle">{name}</h1>
        </div>
      </Link>
    );
}
 
export default CategoryWidget;
