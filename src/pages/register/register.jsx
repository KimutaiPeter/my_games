import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { doc, setDoc, query, where, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

//import firebaseConfig from '../../config.js'
import firebaseConfig from "../../config";


// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default function Register() {
    const [message, set_message] = useState('')
    const [email, set_email] = useState('')
    const [password1, set_password1] = useState('')
    const [password2, set_password2] = useState('')


    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }






    async function register() {
        console.log(email, password1)

        if (password1 === password2) {
            const db = getFirestore()
            var db_Ref = collection(db, "users");
            var q = query(db_Ref, where("email", "==", email));
            var querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                
                // Add a new document with a generated id
                const users = doc(collection(db, "users"));
        
                await setDoc(users, { email: email, password: password1 }, { merge: true });
                set_message('Great, you are now registered')
            } else {
                set_message('You already registered')

            }
        } else {
            set_message('Password miss match')
        }


    }



    return (
        <>
            <div class="login_popup_container">
                <div class="pop_up_input_container">
                    <span>Enter your email</span>
                    <input type="text" onChange={(e) => { set_email(e.target.value) }}/>
                </div>

                <div class="pop_up_input_container">
                    <span>Enter your password</span>
                    <input type="password" onChange={(e) => { set_password1(e.target.value) }}/>
                </div>

                <div class="pop_up_input_container">
                    <span>Enter your password</span>
                    <input type="password" onChange={(e) => { set_password2(e.target.value) }}/>
                </div>


                <button onClick={(e) => { register() }}>Sign up</button>



                <button >Continue with google</button>

            </div>

            <div class="floating_auth_controls_container">

                <button onClick={e=>{nav('/login')}}>
                    <img src="./imgs/signin.svg" alt="" />
                    <span>Login</span>
                </button>

                <button onClick={e=>{nav('/register')}}>
                    <img class="button_image" src="./imgs/register.svg" alt="" />
                    <span>Sign up</span>
                </button>

                <div class="prompt_link">
                    <img src="./imgs/play.svg" alt="" />
                    <span>Play on call</span>
                </div>

                <div class="prompt_link">
                    <img src="./imgs/play.svg" alt="" />
                    <span>Dating site</span>
                </div>

            </div>
        </>
    )
}