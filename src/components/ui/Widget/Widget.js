import "./widget.scss"
const Widget = ({name,price}) => {
  return (
    <div className="widget">
      <h4 className="widgetTitle">{name}</h4>
      <p className="price">{price}</p>
    </div>
    );
}
 
export default Widget;
