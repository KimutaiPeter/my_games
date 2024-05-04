import React ,{useEffect,useState} from "react";

import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

//Layouts
import DT_auth from "./auth_component/auth";


export default function Auth(){
    const [user_data,set_user_data]=useState({'auth':false})
    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }

    function authenticate(){
        var auth=localStorage.getItem('auth')
        var auth_data=JSON.parse(auth)
        if(auth===null){
            console.log('Empty')
            set_user_data({'auth':false})
        }else{
            set_user_data({'id':auth_data['id'],email:auth_data['email'],'auth':true})
        }
    }


    useEffect(()=>{
        authenticate()
    },[])



    if (isMobile) {
        return (
            <>
                <h1>We are coming soon</h1>
            </>
        )
    } else {
        return (<DT_auth authenticate={authenticate} user_data={user_data} nav={nav}/>)
    }
}