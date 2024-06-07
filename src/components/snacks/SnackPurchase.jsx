import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import SnackService from "../../services/snackService";
import styles from "./SnackPurchase.module.css";
import FormInput from '../form_input/FormInput';
//import getErrorResponse from '../../utils/errorUtils'

const snackService = new SnackService();

function SnackPurchase() {

    const defaultPayment = {
        "fives": 0,
        "ones": 0,
        "quarters": 0
    };

    const [errors, setErrors] = useState(null);
    const [payment, setPayment] = useState(defaultPayment);
    const [snack, setSnack] = useState({});

    const navigator = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getSnackById(id);
        }
    }, [id])

    async function getSnackById(id) {
        try {
            const response = await snackService.getSnackById(id);
            if (response.status == 200) {
                setSnack(response.data);
            }
        } catch (error) {
            if (error.response.status === 404) {
                navigator('/')
            } else {
                console.error(error);
            }
        }
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setPayment(p => {
            return {
                ...p,
                [name]: value
            };
        })
    }

    function handleClick() {

    }


    return(
        <div className={styles.container}>
            <h1>Entereth Thou Thine Payment</h1>
            <div className={styles.formContainer}>
                <form>
                    <FormInput type="number" labelText="Fives:" handleChange={handleChange} value={payment.fives}
                            name="fives" holder="Enter Fives..." messages={errors?.fives} />

                    <FormInput type="number" labelText="Ones:" handleChange={handleChange} value={payment.ones}
                            name="ones" holder="Enter Ones..." messages={errors?.ones} />

                    <FormInput type="number" labelText="Quarters:" handleChange={handleChange} value={payment.quarters}
                            name="quarters" holder="Enter Quarters..." messages={errors?.quarters} />

                    <div className={styles.buttonContainer}>
                        <button className={styles.submitButton} onClick={handleClick} type="button" >Submit</button >
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SnackPurchase;
