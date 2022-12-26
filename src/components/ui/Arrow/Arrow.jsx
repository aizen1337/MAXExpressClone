import { Link } from "react-router-dom"
import { BiLeftArrowAlt } from "react-icons/bi"
import "./arrow.scss"
const Arrow = ({destination}) =>
 <Link to={destination ? destination : "/order"}>
    <div className="arrow">
    <i className="arrowIcon">
        <BiLeftArrowAlt className="arrow"/>
    </i>
    </div>
</Link>

export default Arrow