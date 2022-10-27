import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import { UserInfoContext } from './assets/contexts/UserInfoContext';
import axios from 'axios';

export default function Subscriptions(){
    const {userInfo} = useContext(UserInfoContext);
    const config = {
        headers:{Authorization: `Bearer ${userInfo.token}`} 
    }
    const [plansList, setPlansList] = useState([]);
    useEffect(() => {
        
		const plans = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships",config)
            plans.then(promessa=>{console.log("PROMESSA SUBSCRIPTIONS:");console.log(promessa);setPlansList(...[promessa.data])})
            plans.catch((error)=>{console.log("ERROR SUBSCRIPTIONS:");console.log(error);})
	    }, []);
    return(
       <StyledPlansList>

       </StyledPlansList>
    )
}
const StyledPlansList = styled.ul`

`