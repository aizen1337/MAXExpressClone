import { MdOutlinePowerSettingsNew } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
const UserData = ({user}) => {
    return ( 
        <div className='userData'>
        <img src={user.avatarUrl} alt="avatar" />
        <p>{user.username}</p>
        <div className="buttons">
          <i className="icon"><MdOutlinePowerSettingsNew/></i>
          <i className="icon"><IoSettingsOutline/></i>
        </div>
        </div>
      );
}
 
export default UserData;