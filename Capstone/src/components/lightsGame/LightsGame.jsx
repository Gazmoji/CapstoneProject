import React from 'react'
import Board from './Board'
import "../../styles/lg.css"




function LightsGame() {





  return (
    <div className='lg'>
        <h1 className='lg-h1'><span className='lg-orange'>LIGHTS</span>  <span className='lg-blue'>OUT</span></h1>
        <Board size={5} chanceLightStartsOn={0.25}/>

    </div>
  )
}

export default LightsGame