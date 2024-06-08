import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from "./SnackGive.module.css";

 function SnackGive() {

    const location = useLocation();
    const navigator = useNavigate();

    const defaultResponse = {
        changeResponseDto: {
            change: 0,
            quarters: 0
        },
        snackResponseDto: {
            id: 0,
            name: "",
            cost: 0,
            quantity: 0
        }
    }

    const [response, setResponse] = useState(defaultResponse)

    useEffect(() => {
        if (!location.state) {
            navigator("/");
        }
        setResponse(location.state);
    })
   
    return (
        <div className={styles.container}>
            <h1>Here Thou Goeth</h1>
            <div className={styles.labelContainer}>
                <label>Here's your {response.snackResponseDto.name} snack.</label>
                <label>Here's your ${(response.changeResponseDto.change).toFixed(2)} in change.</label>
                <label>Your change consists of {response.changeResponseDto.quarters} quarter{'(s)'}.</label>
            </div>
        </div>
    );
}

export default SnackGive;
