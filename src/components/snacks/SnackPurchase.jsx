import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import SnackService from "../../services/snackService";
import styles from "./SnackPurchase.module.css";
import FormInput from '../form_input/FormInput';
import { getErrorResponse } from '../../utils/errorUtils'
import FormFieldError from '../form_field_error/FormFieldError';

const snackService = new SnackService();

function SnackPurchase() {

    const defaultPayment = {
        "fives": 0,
        "ones": 0,
        "quarters": 0
    };

    const defaultErrorData = {
        errors: [],
        message: ""
    }

    const defaultSnack = {
        name: "",
        cost: 0
    }

    const [errorData, setErrorData] = useState(defaultErrorData);
    const [payment, setPayment] = useState(defaultPayment);
    const [snack, setSnack] = useState(defaultSnack);

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
                if (response.data.quantity == 0) {
                    navigator('/')
                }
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
                [name]: value == "" ? 0 : value.replace(/^0+/, '')
            };
        })
    }

    async function handleClick() {
        try {
            const response = await snackService.purchaseSnack(id, payment);
            if (response.status == 200) {
                // Do next thing here
                navigator("/give", {state: response.data});
            }
        } catch (error) {
            setErrorData(getErrorResponse(error));
        }
    }

    return(
        <div className={styles.container}>
            <h1>{snack.name} ${snack.cost.toFixed(2)}</h1>
            {console.log(snack)}
            <h1>Entereth Thou Thine Payment</h1>
            <div className={styles.formContainer}>
                <form>
                    <FormInput type="number" labelText="Fives:" handleChange={handleChange} value={payment.fives}
                            name="fives" holder="0" messages={errorData.errors.Fives} />
                            
                    <FormInput type="number" labelText="Ones:" handleChange={handleChange} value={payment.ones}
                            name="ones" holder="0" messages={errorData.errors.ones} />

                    <FormInput type="number" labelText="Quarters:" handleChange={handleChange} value={payment.quarters}
                            name="quarters" holder="0" messages={errorData.errors.quarters} />

                    <FormFieldError messages={[errorData.message]}></FormFieldError>

                    <div className={styles.buttonContainer}>
                        <button className={styles.submitButton} onClick={handleClick} type="button" >Submit</button >
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SnackPurchase;
