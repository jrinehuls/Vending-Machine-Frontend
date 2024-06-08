import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from "./SnackGive.module.css";

 function SnackGive() {

    const location = useLocation();
    const navigator = useNavigate();

    const defaultResponse = {
        snack: {
            id: 0,
            name: "",
            cost: 0,
            quantity: 0
        },
        change: {
            totalChange: 0.00,
            fives: 0,
            ones: 0,
            quarters: 0,
            dimes: 0,
            nickles: 0,
            pennies: 0
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
                <label>Here's your {response.snack.name} snack.</label>
                <label>Here's your ${(response.change.totalChange).toFixed(2)} in change.</label>
                <label>Your change is broken down thusly:</label>
                <label>Fives: {response.change.fives}</label>
                <label>Ones: {response.change.ones}</label>
                <label>Quarters: {response.change.quarters}</label>
                <label>Dimes: {response.change.dimes}</label>
                <label>Nickles: {response.change.nickles}</label>
                <label>Pennies: {response.change.pennies}</label>
            </div>
        </div>
    );
}

export default SnackGive;
