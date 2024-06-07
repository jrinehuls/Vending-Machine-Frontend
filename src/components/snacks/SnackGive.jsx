import { useEffect } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

 function SnackGive() {

    const location = useLocation();
    const navigator = useNavigate();

    useEffect(() => {
        if (!location.state) {
            navigator("/");
        }
    })
   
        return (
            <div>
            {console.log(location.state)} 
            </div>
        );
    }

export default SnackGive;
