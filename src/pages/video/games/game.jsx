import React, { useEffect, useReducer, useState } from "react";
import { Dexie } from 'dexie'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

//Layouts
import DT_game from "./layouts/game_layout";


//Creating the database
const db = new Dexie('Game')
window.db = db
db.version(1).stores({
    ToD: '++ID,OrderID,Question,Type,Level,Game'
})


export default function Game(props) {
    const [current_question, set_current_question] = useState('Truth or Dare?')
    const [saved_game_data, set_saved_game_data] = useState({})
    const [current_level, set_current_level] = useState('Family')
    const [current_order_id, set_current_order_id] = useState(0)


    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }

    useEffect(() => {
        console.log('Initialization starting...')
        async function fetcher() {
            let saved_game
            saved_game = localStorage.getItem('saved_game')
            if (!saved_game) {
                saved_game = { current_game: { game: 'truth_or_dare', 'level': 'Family', order_id: 1 }, game: 'truth_or_dare', levels: { 'Family': 0 } }
                localStorage.setItem('saved_game', JSON.stringify(saved_game))
            } else {
                saved_game = JSON.parse(saved_game)
                set_saved_game_data(saved_game)
                //Initialize current game data
                set_current_level(saved_game['current_game'].level)
                set_current_order_id(saved_game['current_game']['order_id'])
            }
            var table_count = await db.ToD.count()

            if (table_count <= 0) {
                var data = await api_fetch('https://tdpp.pythonanywhere.com/api/ToD_base_initialization')
                console.log('Initializing', data, data['data'].length)
                await db.ToD.bulkPut(data['data']).then(() => {
                    console.log('Items added successfully!');
                }).catch(error => {
                    console.error('Error adding items:', error);
                });
            } else {
                console.log('Check current and next')
            }
        }
        fetcher()

    }, [])

    useEffect(() => {
        if (props.caller == false) {
            if (props.game_data !== null) {
                set_current_question(props.game_data[0]['Question'])
            }
        }
    }, [props.game_data])

    useEffect(() => {
        if (props.caller) {
            if (props.game_message !== null) {
                if (props.game_message['type'] === "level") {
                    level_change(props.game_message['data'])
                }
                if (props.game_message['type'] === 'next') {
                    next(props.game_message['data'])
                }
            }
        } else {
            if (props.game_message !== null) {
                set_current_level(props.game_message["data"])
            }
        }
    }, [props.game_message])

    function level_change(level) {
        if (props.caller) {
            //Update current state
            props.sendMessage({ type: 'level', data: level })
            set_current_level(level)
            //Save the game}
        } else {
            
            set_current_level(level)
            props.sendMessage({ type:'level',data:level})
        }
    }
    window.level_change = level_change


    async function next(type) {
        //if Im the caller change the querry and send it to the answerer
        if (props.caller) {
            //Change from database to code Level to type type to Level
            var query = await db.ToD.where({ OrderID: current_order_id, Type: type, Level: current_level }).toArray();
            if (query) {
                set_current_order_id(current_order_id + 1)
                console.log('Next:', query, current_order_id)
                set_current_question(query[0]['Question'])
                props.sendMessage({ type: "game", "data": query })
            } else {
                console.log('False', query, current_order_id)
            }
        } else {
            //I am the answerer, send the request to the caller
            props.sendMessage({ type: 'next', data: type })

        }


        //Focust program
        //Saving the game
    }
    window.next = next


    async function bulk_add(data_items) {
        const items = [
            { name: 'Item 1', price: 10.99 },
            { name: 'Item 2', price: 5.99 },
            // ... more items
        ];

        db.tasks.bulkAdd(data_items).then(() => {
            console.log('base initialized successfully!');
        }).catch(error => {
            console.error('Error initializing base for __game__:', error);
        });
    }

    if (isMobile) {
        return (
            <>
                <h1>We are coming soon</h1>
            </>
        )
    } else {
        return (<DT_game nav={nav} next={next} current_question={current_question} current_level={current_level} level_change={level_change} />)
    }


    function api_post() {
        var post_url = 'http://localhost:5000/auth/status'
        var data = { 'code': 101 }
        var headers = { headers: { 'Content-Type': 'application/json' }, withCredentials: false }
        axios.post(post_url, data, headers)
            .then(res => {
                console.log(res.data)
                if (res.data['status'] === 'success') {
                    alert('you are already logged in')
                } else {
                    console.log('Loging in...')
                }
            })
            .catch(e => { console.error(e) })
    }

    async function api_fetch(url) {
        var headers = { headers: { 'Content-Type': 'application/json' }, withCredentials: false }
        let fetched_data = null
        await axios.post(url, headers)
            .then(res => {
                //console.log(res.data)
                fetched_data = res.data
            })
            .catch(e => { console.error(e); fetched_data = false })
        return fetched_data
    }

    window.api_fetch = api_fetch

}