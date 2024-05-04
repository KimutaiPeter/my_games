import React from "react";
import { useNavigate } from "react-router-dom";
import { isMobile } from 'react-device-detect';

//Components
import DT_index from "./layouts/index";


export default function Home() {
    const navigate = useNavigate()
    function nav(url) {
        navigate(url);
    }

    if (isMobile) {
        return (
            <>
                <h1>We are coming soon</h1>
            </>
        )
    } else {
        return (<DT_index nav={nav} />)
    }
}