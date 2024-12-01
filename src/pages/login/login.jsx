import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

import './css/login_popup.css'
import { useNavigate, } from "react-router-dom";


import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { doc, setDoc, query, where, onSnapshot } from "firebase/firestore";


//import firebaseConfig from '../../config.js'
import firebaseConfig from "../../config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export default function Login(prop) {
    const [message, set_message] = useState("")
    const [email, set_email] = useState('')
    const [password, set_password] = useState('')
    const db = getFirestore()
    const navigate = useNavigate()



    function nav(url) {
        navigate(url);
    }

    function authenticate(){
        var auth=localStorage.getItem('auth')
        if(auth===null){
            console.log('Empty')
            //set_user_data({'auth':false})
            alert("Authentication failed")
        }else{
            var details=JSON.parse(auth)
            navigate(-1)
            
        }
    }

    async function check() {

        var db_Ref = collection(db, "users");
        var q = query(db_Ref, where("email", "==", email));
        var querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log('Its empty')
            set_message('Incorrect email or password')
        } else {
            querySnapshot.forEach(async (doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                if (doc.data()['password'] === password) {
                    console.log('Correct password')
                    var details = JSON.stringify({ id: doc.id, email: email })
                    localStorage.setItem('auth', details)
                    authenticate()
                } else {
                    set_message('Incorrect email or password')
                }
            });

        }
    }



    function Sign_in() {
        signInWithPopup(auth, provider).then(async (data) => {
            console.log(data)
            var user_data = data['user']



            var db_Ref = collection(db, "users");
            var q = query(db_Ref, where("email", "==", user_data['email']));
            var querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
                console.log('Its empty')
                set_message('Incorrect email or password')


                const users = doc(collection(db, "users"), user_data['uid']);
                await setDoc(users, { email: user_data['email'], password: 'googleid' }, { merge: true });

                var details = JSON.stringify({ id: user_data['uid'], email: user_data['email'] })
                localStorage.setItem('auth', details)
                prop.authenticate()

            } else {
                querySnapshot.forEach(async (doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    if (doc.data()['password'] === 'googleid') {
                        console.log('Correct password')
                        var details = JSON.stringify({ id: doc.id, email: email })
                        localStorage.setItem('auth', details)
                        authenticate()
                    } else {
                        alert('Google auth failed')
                    }
                });

            }

        })
    }


    const auth = getAuth();
    const user = auth.currentUser;


    return (
        <>
            <div class="login_popup_container">

                <div class="pop_up_input_container">
                    <span>Enter your email</span>
                    <input type="text" onChange={(e) => { set_email(e.target.value) }}/>
                </div>

                <div class="pop_up_input_container">
                    <span>Enter your password</span>
                    <input type="password"  onChange={(e) => { set_password(e.target.value) }}/>
                </div>


                <button onClick={e => { 
                    alert("Please use google for now, We dont have enough resources to store this data"); 
                    //check()

                 }}>Login</button>

                <button onClick={e => { Sign_in() }}>Continue with google</button>

            </div>

            <div class="floating_auth_controls_container">

                <button onClick={e => { check() }}>
                    <img src="./imgs/signin.svg" alt=""/>
                        <span>Login</span>
                </button>

                <button onClick={e=>{nav('/register')}}>
                    <img class="button_image" src="./imgs/register.svg" alt=""/>
                        <span>Sign up</span>
                </button>

                <div class="prompt_link">
                    <img src="./imgs/play.svg" alt=""/>
                        <span>Play on call</span>
                </div>

                <div class="prompt_link">
                    <img src="./imgs/play.svg" alt=""/>
                        <span>Dating site</span>
                </div>

            </div>
        </>
    )
}