import React, { useContext, useState } from 'react'
import "./Sidebar.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/context';

const Sidebar = () => {


  const [extended, setExtended] = useState(false);
  const {onSent, prevPrompts, setRecentPrompts} = useContext(Context)

  function clickHandler () {
    setExtended(!extended)
  }

  const loadPrompt = async (prompt) => {
    setRecentPrompts(prompt)
    await onSent(prompt)
  }

  return (
    <div className='sidebar'>
        <div className="top">
            <img className='menu_icon' src={assets.menu_icon} alt="menu_icon.png" onClick={clickHandler}/>
            <div className="new_chat">
              <img src={assets.add_icon} alt="" />
              {extended ? <p>New Chat</p> : null }
            </div>

            {
              extended ? <div className="recent">
              <p className='recent_title'>Recent</p>
              {
                prevPrompts.map((item, index)=> {
                  return (
                    <div onClick={() => loadPrompt(item)} className='recent-entry'>
                      <img src={assets.comment_icon} alt="" />
                      <p className='text-sidebar'>{item}...</p>
                    </div>
                  )
                })
              }
            </div> : null 
            }
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
              <img src={assets.help_icon} alt="" />
              {extended ? <p>Help</p> : null }
            </div>
            <div className="bottom-item recent-entry">
              <img src={assets.history_icon} alt="" />
              {extended ? <p>Activity</p> : null }
            </div>
            <div className="bottom-item recent-entry">
              <img src={assets.setting_icon} alt="" />
              {extended ? <p>Settings</p> : null }
            </div>
        </div>
    </div>
  )
}

export default Sidebar