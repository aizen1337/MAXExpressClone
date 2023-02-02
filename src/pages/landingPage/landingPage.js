import React, {useRef} from 'react'
import Logo from '../../components/ui/Logo/Logo'
import "./landingpage.scss"
import {Parallax, ParallaxLayer} from '@react-spring/parallax'
import {BsChevronDoubleDown, BsChevronDoubleUp} from 'react-icons/bs'
import {IoFastFoodOutline, IoCartOutline, IoSettingsOutline, IoCalendarClearOutline} from 'react-icons/io5'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
export default function LandingPage() {
  const ref = useRef();
  const url = "https://silesiasmakuje.pl/wp-content/uploads/2018/12/20181220_200635.jpg"
  const url2 = "https://omnichannelnews.pl/wp-content/uploads/2021/12/max-premium-burgers-restauracja-gdansk.jpg"
    return (
    <div className='home'>
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
              <nav className='navigation'>
                <Link
                    className='link' to='/order'>
                    <motion.div
                    whileHover={{ scale: 1.2,
                    textShadow:"0px 0px white",
                    boxShadow: "0px -5px 8px white"
                   }}
                    onHoverStart={e => {}}
                    onHoverEnd={e => {}}><p>Zamów</p><IoFastFoodOutline/></motion.div></Link>
                <Link className='link' to='/order-history'>         <motion.div
                    whileHover={{ scale: 1.2,
                    textShadow:"0px 0px white",
                    boxShadow: "0px -5px 8px white"
                   }}
                    onHoverStart={e => {}}
                    onHoverEnd={e => {}}><p>Historia zamówień</p><IoCalendarClearOutline/></motion.div></Link>
                <Link className='link' to='/shopping-cart'>         <motion.div
                    whileHover={{ scale: 1.2,
                    textShadow:"0px 0px white",
                    boxShadow: "0px -5px 8px white"
                   }}
                    onHoverStart={e => {}}
                    onHoverEnd={e => {}}><p>Koszyk</p><IoCartOutline/></motion.div></Link>
                <Link className='link' to='/account-settings'>         <motion.div
                    whileHover={{ scale: 1.2,
                    textShadow:"0px 0px white",
                    boxShadow: "0px -5px 8px white"
                   }}
                    onHoverStart={e => {}}
                    onHoverEnd={e => {}}><p>Ustawienia</p><IoSettingsOutline/></motion.div></Link>
              </nav>
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
