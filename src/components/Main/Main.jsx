import React, { useContext, useState } from 'react';
import "./Main.css";
// import { IoLogoGoogle } from "react-icons/io";
import { assets } from "../../assets/assets";
import { Context } from '../../context/context';

const Main = () => {
  const { onSent, recentPrompts, showResult, loading, resultData, setInput, input } = useContext(Context);


  return (
    <div className="main">
      <div className='nav'>
        <p>Gemini</p>
        <div className='right-menu'>
          <img className='dark-mode' src={assets.light_icon} alt="" />
          <img src={assets.person_icon} alt="" />
        </div>
      </div>
      <div className="main-container">
        {
          
          !showResult ? 
            <>
              <div className="greet">
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>Suggest popular programming language in 2024</p>
                  <img src={assets.code_icon} alt="" />
                </div>
                <div className="card">
                  <p>Recommend new type of water sports, including pros & cons</p>
                  <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                  <p>Find YouTube videos with inspiring best man speeches</p>
                  <img src={assets.comment_icon} alt="" />
                </div>
                <div className="card">
                  <p>Brainstorm team bonding activities for our work retreat</p>
                  <img src={assets.bulb_icon} alt="" />
                </div>
              </div>
            </>
           : 
            <div className='result'>
              <div className='result-title'>
                  <p>{recentPrompts}</p>
              </div>
              <div className='result-data'>
                  <img className='gemini-icon' src={assets.gemini_icon} alt="" />
                  {loading ? <div className='loader'>
                   <hr />
                   <hr />
                   <hr className='last-hr'/>  
                  </div> 
                  : 
                  <p dangerouslySetInnerHTML={{__html:resultData}}></p>}
                  
              </div>
            </div>
          
        }

        {/* main bottom */}
        <div className="main-bottom">
          <div className="search-box">
            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
            <div>
              {/* <img className='buttons' src={assets.image_icon} alt="" /> */}
              <img className='buttons' src={assets.mic_icon} alt="" />
              {
                input ?               <img className='buttons' onClick={() => onSent()} src={assets.send_icon} alt="" />
                : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
