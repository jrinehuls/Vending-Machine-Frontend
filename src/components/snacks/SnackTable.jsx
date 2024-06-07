import { getAllSnacks } from "../../services/snackService";
import { useEffect } from "react";
function ShowSnacks() {

    useEffect(() => {
        getSnacks();
    }, [])


    async function getSnacks() {
        try {
            const response = await getAllSnacks();
            setSpells(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <></>
    );
}

export default ShowSnacks;
