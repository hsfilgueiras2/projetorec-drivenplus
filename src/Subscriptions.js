import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import { UserInfoContext } from './assets/contexts/UserInfoContext';
import axios from 'axios';
import react from 'react';
import { Link } from 'react-router-dom';

export default function Subscriptions() {
    const { userInfo } = useContext(UserInfoContext);
    const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
    }
    const [plansList, setPlansList] = useState([]);
    useEffect(() => {

        const plans = axios.get("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships", config)
        plans.then(promessa => { setPlansList(promessa.data)})
    }, []);
    return (
        <StyledPlansList>
            <h3>Escolha seu Plano</h3>
            {
                plansList.map((plan, index) => (
                    <Link to={`/subscriptions/${plan.id}`}>
                        <li data-plan-id={plan.id} key={index}>
                            <img src={plan.image}></img>
                            <h4>R$ {plan.price}</h4>
                        </li>
                    </Link>
                ))

            }
        </StyledPlansList>
    )
}
const StyledPlansList = styled.ul`
display: flex;
flex-direction:column;
align-items:center;
li img {
    height:95px;
    width:140px;
}
li{
    justify-content:space-around;
    text-decoration:none;
    align-items:center;
    display:flex;
    height:180px;
    width:290px;
    background: #0E0E13;
border: 3px solid #7E7E7E;
border-radius: 12px;
margin-bottom:10px;
}
h4{
    text-decoration:none;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
color: #FFFFFF;
}
h3{
    margin-top:29px;
    text-decoration:none;
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 38px;
color: #FFFFFF;
margin-bottom:24px;
}


`