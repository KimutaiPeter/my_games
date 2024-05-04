import React, { useState, useEffect } from "react";

//CSS
import './games.css'
import Auth from '../../../auth/auth'


export default function DT_game(props) {
    const [current_question, set_current_question] = useState('')

    useEffect((e) => {
        set_current_question(props.current_question)
    }, [props.current_question])


    return (
        <>
            <div class="game_container">
                <div class="game_mode_controls_container">
                    <button style={{ color: 'rgb(57, 49, 73)', 'background-color': 'white' }} >
                        <span>😝truth or dare</span>
                    </button>

                    <button>
                        <span>😝Would you rather</span>
                    </button>

                    <button>
                        <img src="./imgs/plus.svg" alt="" />
                        <span>more</span>
                    </button>
                </div>

                <div class="game_mode_controls_container" id="game_modes_container">
                    <button style={{ color: 'rgb(57, 49, 73)', 'background-color': 'white' }} onClick={e => {
                        props.level_change('Family')
                        var game_mode_controls_container = document.getElementById('game_modes_container')
                        Array.from(game_mode_controls_container.children).forEach((child) => {
                            // Your code here
                            child.style = ""
                        })
                        e.target.style.backgroundColor = 'white'
                        e.target.style.color = 'rgb(57, 49, 73)'
                    }} >😁friends</button>

                    <button onClick={(e) => {
                        props.level_change('friends');

                        var game_mode_controls_container = document.getElementById('game_modes_container')
                        Array.from(game_mode_controls_container.children).forEach((child) => {
                            // Your code here
                            child.style = ""
                        })
                        e.target.style.backgroundColor = 'white'
                        e.target.style.color = 'rgb(57, 49, 73)'

                    }}>😈spicy</button>

                    <button onClick={(e) => {
                        props.level_change('couples');

                        var game_mode_controls_container = document.getElementById('game_modes_container')
                        Array.from(game_mode_controls_container.children).forEach((child) => {
                            child.style = ""
                        })
                        e.target.style.backgroundColor = 'white'
                        e.target.style.color = 'rgb(57, 49, 73)'

                    }}>💏couples</button>

                    <button onClick={(e) => {
                        props.level_change('couples');

                        var game_mode_controls_container = document.getElementById('game_modes_container')
                        Array.from(game_mode_controls_container.children).forEach((child) => {
                            // Your code here
                            child.style = ""
                        })
                        e.target.style.backgroundColor = 'white'
                        e.target.style.color = 'rgb(57, 49, 73)'

                    }}>💦🍆kinky
                    </button>

                </div>

                <div class="game_text_container">
                    <h1>{props.current_question}</h1>
                </div>

                <div class="game_controls_container">
                    <button onClick={e => { props.next('truth') }}>Truth</button>
                    <button onClick={e => { props.next('dare') }}>Dare</button>
                </div>


            </div>

            <Auth></Auth>

            
        </>
    )
}