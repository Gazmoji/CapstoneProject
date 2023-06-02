import React from 'react'
import Board from './Board'
import "../../styles/lg.css"




function LightsGame() {
  document.body.className = "backgroundSpace";




  return (
    <div className='lg'>
        <h1 className='lg-h1'><span className='lg-orange'>LIGHTS</span>  <span className='lg-blue'>OUT</span></h1>
        <Board size={5} chanceLightStartsOn={0.25}/>
        <div className='dialogBox2'>You need to escape your persuer, but you dont know how to fly the ship, try to turn off all the lights to activate the jump and get out of there!</div>
    </div>
  )
}

export default LightsGame