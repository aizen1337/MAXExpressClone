import React, {useRef} from 'react'
import Sidebar from '../../components/Sidebar/Sidebar'
import Logo from '../../components/ui/Logo/Logo'
import "./landingpage.scss"
import { useAuthentication } from '../../context/auth/AuthContext';
import {Parallax, ParallaxLayer} from '@react-spring/parallax'
import {BsChevronDoubleDown, BsChevronDoubleUp} from 'react-icons/bs'
export default function LandingPage() {
  const ref = useRef();
  const {currentUser} = useAuthentication()
  const url = "https://silesiasmakuje.pl/wp-content/uploads/2018/12/20181220_200635.jpg"
  const url2 = "https://omnichannelnews.pl/wp-content/uploads/2021/12/max-premium-burgers-restauracja-gdansk.jpg"
    return (
    <div className='home'>
      <Sidebar userData={currentUser}/>
      <div className='logo'><Logo/></div>
        <div className='container'>
          <Parallax pages={2} ref={ref}>
            <ParallaxLayer speed={1} style={{
              backgroundImage: `url(${url})`,
              backgroundSize: 'cover'
            }}>
              <div className='arrow' onClick={() => ref.current.scrollTo(1)}>
                  <i><BsChevronDoubleDown/></i>
                  <h2>Do poruszania się po stronie użyj menu w lewym górnym rogu<br/> lub tego po kliknięciu w strzałkę</h2>
              </div>
            </ParallaxLayer>
            <ParallaxLayer offset={1} speed={0.5}  style={{
              backgroundImage: `url(${url2})`,
              backgroundSize: 'cover'
            }}>
              <div className='arrow' onClick={() => ref.current.scrollTo(0)}>
              <i><BsChevronDoubleUp/></i>
              <h2>Wróć na górę</h2>
              </div>
            </ParallaxLayer>
          </Parallax>
        </div>
      </div>
  )
}
