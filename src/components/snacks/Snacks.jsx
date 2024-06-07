import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSnacks } from "../../services/snackService";
import styles from "./Snacks.module.css";

let numRows = 0;

function Snacks() {

    const [snacks, setSnacks] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        getSnacks();
    }, [])

    function onPurchase(id) {
        console.log(snacks.filter(p => p.id == id));
        //navigator(`/purchase/${id}`);
    }


    async function getSnacks() {
        try {
            const response = await getAllSnacks();
            setSnacks(response.data);
            console.log(snacks);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.tableContainer}>
                        <h1>Chooseth Thou Thine Snack</h1>
            <table className={styles.snackTable}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Quantity</th>
                        <th>Buy</th>
                    </tr>
                </thead>
                <tbody>
                {snacks.map(s => {
                    numRows++;
                    return (
                        <tr key={s.id} className={numRows % 2 === 0 ? styles.even : styles.odd}>
                            <td>{s.id}</td>
                            <td>{s.name}</td>
                            <td>{"$" + s.cost.toFixed(2)}</td>
                            <td>{s.quantity}</td>
                            <td>
                                <div className={styles.buttonContainer}>
                                    <button className={styles.buyButton} disabled={s.quantity <= 0} onClick={() => onPurchase(s.id)}>Buy</button>
                                </div>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
}

export default Snacks;
