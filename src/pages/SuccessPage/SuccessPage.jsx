import React from 'react'
import Rating from '@mui/material/Rating';
import "./successpage.scss";
import { useNavigate, useParams } from 'react-router-dom';
import { collection,addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useState, useRef } from 'react';
import { useAuthentication } from '../../context/auth/AuthContext';
import { Snackbar } from '@mui/material';
import {Alert} from '@mui/material';
const SuccessPage = () => {
    const [value, setValue] = useState(0);
    const {id} = useParams();
    const [open,setOpen] = useState()
    const {currentUser} = useAuthentication()
    const navigate = useNavigate()
    const areaRef = useRef()
    const sendOpinion = async () => {
        await addDoc(collection(db,"opinions"), {
            opinion: areaRef.current.value,
            orderRating: value,
            orderId: id,
            orderOwner: currentUser.uid
        }).then(() => {
         setOpen(true)
         setTimeout(()=> {
            navigate('/');
         },1500)
        })
        .catch((error) => console.log(error))  
    }
  return (
    <>
    {open && 
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert severity="success" sx={{ width: '100%' }}>
                <h2>Dziękujemy za twoją opinię!</h2>
                <h3>Nastąpi przekierowanie na stronę główną</h3>
            </Alert>
        </Snackbar>
    } 
    <div className='successPage'>
        <div className="content">
            <div className="rating">
            <h1>Dziękujemy za złożenie zamówienia w MAX!</h1>
                <h2>Daj nam znać jak podobała się obsługa i jakość!</h2>
                    <Rating
                    value={value}
                    onChange={(event, newValue) => {
                    setValue(newValue);
                    }}
                    className="stars"
                    />
                <textarea ref={areaRef} className="area" placeholder='Tutaj napisz swoją opinię....'></textarea>
                <button className='submitButton' onClick={() => sendOpinion()}>Przekaż nam swoją opinię i wydrukuj paragon</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default SuccessPage