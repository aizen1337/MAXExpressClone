import { MdOutlinePowerSettingsNew } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import { useAuthentication } from '../../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import Tooltip from '../../ui/Tooltip/Tooltip';
import avatar from '../../../assets/avatar.png'
const UserData = ({user}) => {
  const {logOut} = useAuthentication();
  async function handleLogout() {
    try {
      await logOut()
    }
    catch {
      throw new Error("Logging out failed")
    }
  }
    return ( 
        <div className='userData'>
          <Link to="/account-settings"><img src={user.photoURL || avatar} alt="avatar" /></Link>
          <p>{user.displayName}</p>
          <div className="buttons">
          <i className="icon" onClick={handleLogout}><Tooltip tooltipContent={"Wyloguj"} child={<i><MdOutlinePowerSettingsNew/></i>}/></i>
          <i className="icon"><Tooltip tooltipContent={"Ustawienia użytkownika"} child={<Link to="/account-settings"><IoSettingsOutline/></Link>}/></i>
          </div>
        </div>
      );
}
 
export default UserData;