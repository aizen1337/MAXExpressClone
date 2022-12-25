import { MdOutlinePowerSettingsNew } from 'react-icons/md'
import { IoSettingsOutline } from 'react-icons/io5'
import { useAuthentication } from '../../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Tooltip from '../../ui/Tooltip/Tooltip';
import avatar from '../../../assets/avatar.png'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
const UserData = ({user}) => {
  const {logOut} = useAuthentication();
  const [open,setOpen] = useState(false)
  async function handleLogout() {
    setOpen(true)
    try {
      setTimeout(async ()=> {
      await logOut()},
      1500)
    }
    catch {
      throw new Error("Logging out failed")
    }
  }
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
    return (
      <>
      { open && 
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
              <h3>Nastąpi wylogowanie...</h3>
              <h4>Zapraszamy ponownie!</h4>
          </Alert>
        </Snackbar>
    } 
        <div className='userData'>
          <Link to="/account-settings"><img src={user.photoURL || avatar} alt="avatar" /></Link>
          <p>{user.displayName}</p>
          <div className="buttons">
          <i className="icon" onClick={handleLogout}><Tooltip tooltipContent={"Wyloguj"} child={<i><MdOutlinePowerSettingsNew/></i>}/></i>
          <i className="icon"><Tooltip tooltipContent={"Ustawienia użytkownika"} child={<Link to="/account-settings"><IoSettingsOutline/></Link>}/></i>
          </div>
        </div>
        </>
      );
}
 
export default UserData;