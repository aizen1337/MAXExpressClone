import { Link } from "react-router-dom"
import { BiLeftArrowAlt } from "react-icons/bi"
import "./arrow.scss"
const Arrow = () =>
 <Link to="/order"><BiLeftArrowAlt className="arrow"/></Link>

export default Arrow