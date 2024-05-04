import React from "react";
//CSS
import './index.css'
//Components
import Auth from '../../auth/auth'

export default function DT_index(props) {
    return (
        <>
            <div class="prompt_container">
                <h1>Play Truth or Dare online</h1>
                <button onClick={(e)=>{props.nav('/game')}}><img src="./imgs/play.svg" alt="" />Play online games</button>
            </div>

            <Auth/>
        </>
    )
}