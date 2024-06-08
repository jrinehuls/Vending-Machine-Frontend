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
        fives: 0,
        ones: 0,
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0
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
    const [paymentTotal, setPaymentTotal] = useState(0.00);
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
        console.log(payment)
    }

    async function handleClick() {
        try {
            const response = await snackService.purchaseSnack(id, payment);
            if (response.status == 200) {
                navigator("/give", {state: response.data});
            }
        } catch (error) {
            setErrorData(getErrorResponse(error));
        }
    }

    function calcTotal(payment) {
        let total = 0
        total += payment.fives * 500
        total += payment.ones * 100
        total += payment.quarters * 25
        total += payment.dimes * 10
        total += payment.nickels * 5
        total += +payment.pennies
        return (total/100).toFixed(2)
    }

    return(
        <div className={styles.container}>
            <h1>{snack.name} ${snack.cost.toFixed(2)}</h1>
            <h1>Entereth Thou Thine Payment</h1>
            <div className={styles.formContainer}>
                <form>
                    <label className={styles.totalLabel}>Current Total: ${calcTotal(payment)}</label>
                    <FormInput type="number" labelText="Fives:" handleChange={handleChange} value={payment.fives}
                            name="fives" holder="0" messages={errorData.errors.Fives} />
                            
                    <FormInput type="number" labelText="Ones:" handleChange={handleChange} value={payment.ones}
                            name="ones" holder="0" messages={errorData.errors.Ones} />

                    <FormInput type="number" labelText="Quarters:" handleChange={handleChange} value={payment.quarters}
                            name="quarters" holder="0" messages={errorData.errors.Quarters} />

                    <FormInput type="number" labelText="Dimes:" handleChange={handleChange} value={payment.dimes}
                            name="dimes" holder="0" messages={errorData.errors.Dimes} />

                    <FormInput type="number" labelText="Nickels:" handleChange={handleChange} value={payment.nickels}
                            name="nickels" holder="0" messages={errorData.errors.Nickels} />

                    <FormInput type="number" labelText="Pennies:" handleChange={handleChange} value={payment.pennies}
                            name="pennies" holder="0" messages={errorData.errors.Pennies} />

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
