import React from "react";

export default function DT_auth(props) {
    
    return (
        <div class="floating_auth_controls_container">

            {(() => {
                if (props.user_data['auth']) {
                    return (<>
                        <button onClick={e => { localStorage.removeItem('auth');props.authenticate();props.nav('/') }}>
                            <img src="/imgs/signin.svg" alt="" />
                            <span>Logout</span>
                        </button>
                    </>)

                } else {
                    return (
                        <>
                            <button onClick={e => { props.nav('/login') }}>
                                <img src="/imgs/signin.svg" alt="" />
                                <span>Login</span>
                            </button>

                            <button onClick={e => { props.nav('/register') }}>
                                <img class="button_image" src="/imgs/register.svg" alt="" />
                                <span>Sign up</span>
                            </button>
                        </>

                    )
                }
            })()}



            <div class="prompt_link" onClick={e=>{
                if(props.user_data['auth']){
                    props.nav('/meets/'+props.user_data['id'])
                }else{
                    alert('Please login or sign up')
                }
            }}>
                <img src="/imgs/play.svg" alt="" />
                <span>Play on call</span>
            </div>

            <div class="prompt_link">
                <img src="/imgs/play.svg" alt="" />
                <span>Dating site</span>
            </div>

        </div>
    )
}