import Popup from "reactjs-popup";
import "./tooltip.scss"
const Tooltip = ({tooltipContent, child}) => {
   return (
    <Popup
      position="bottom center"
      closeOnDocumentClick
      on={"hover"}
      trigger={child}
    >
      <span> {tooltipContent} </span>
    </Popup>
  )};
  export default Tooltip