import { Link, Navigate, useParams } from 'react-router-dom';
import { UserInfoContext } from './assets/contexts/UserInfoContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';



export default function SubscriptionsPlans(){
    const {setUserInfo} = useContext(UserInfoContext);
    const [sentRequest, setSentRequest] = useState(true);
    const [nomeCartao, setNomeCartao] = useState()
    const [numCartao, setNumCartao] = useState()
    const [segCartao, setSegCartao] = useState()
    const [valCartao, setValCartao] = useState()
    const { userInfo } = useContext(UserInfoContext);
    const { idPlano } = useParams();
    const [planInfo, setPlanInfo] = useState([])
    const [confirmBox, setConfirmBox] = useState(false);
    const config = {
        headers: { Authorization: `Bearer ${userInfo.token}` }
    }
    const navigate =useNavigate();
    console.log(confirmBox)
    useEffect(() => {

        const plan = axios.get(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlano}`, config)
        plan.then(promessa => {setPlanInfo(promessa.data)
        setSentRequest(false);
        })
        plan.catch((error) => { console.log("ERROR SUBSCRIPTIONS:"); console.log(error); })
    }, []);
    function sendCardInfo(){
        const assin = axios.post(`https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions`,
        {
            membershipId: idPlano,
            cardName: nomeCartao,
            cardNumber: numCartao,
            securityNumber: segCartao,
            expirationDate: valCartao 
        },config)
        assin.then((promise)=>{
            const tempUserInfo = userInfo;
            tempUserInfo.membership = promise.data.membership;
            console.log("Temp user info:")
            console.log(tempUserInfo);
            localStorage.setItem("userInfo", JSON.stringify(tempUserInfo))
            setUserInfo(tempUserInfo);
            navigate(`/home`);
        })

        assin.catch((error)=>console.log(error))
    }
    function toggleConfirmBox(e){
        e.preventDefault();
        setConfirmBox(!confirmBox)
    }
    if(sentRequest ===true){
        return(
            <h1>LOADING</h1>
        )
    }
    return(
        <StyledPlan confirmBox={confirmBox}>
            <header>
            <Link to={'/subscriptions'}>
            <ion-icon name="arrow-back"></ion-icon></Link>
            
            </header>
        <StyledInfo>
        <img src={planInfo.image} ></img>
        <h2>{planInfo.name}</h2>
        <h3><ion-icon name="id-card"></ion-icon> Beneficios:</h3>
        <ul>
            {planInfo?.perks.map((perk,index)=>(
                <li key={index}>
                    <h4>{`${perk.id}. ${perk.title}`}</h4>
                </li>

            ))}
        </ul>
        <h3><ion-icon name="cash"></ion-icon> Preco:</h3>
        <h4>{planInfo.price} cobrados mensalmente</h4>
        </StyledInfo>
        <StyledForm>
            <input type="text" placeholder='Nome impresso no cartao' value={nomeCartao} onChange={(e)=>setNomeCartao(e.target.value)}></input>
            <input type="text" placeholder='Digitos do cartao' value={numCartao} onChange={(e)=>setNumCartao(e.target.value)}></input>
            <input type="text" placeholder='Codigo de seguranca' value={segCartao} onChange={(e)=>setSegCartao(e.target.value)}></input>
            <input type="text" placeholder='Validade' value={valCartao} onChange={(e)=>setValCartao(e.target.value)}></input>
            <button type='submit' onClick={(e)=>toggleConfirmBox(e)}>Assinar</button>
        </StyledForm >
        <ConfirmBox confirmBox={confirmBox}>
            <h2>Tem certeza que deseja <br/> assinar o plano <br/> {planInfo.name} {`(R$${planInfo.price})?`}</h2>
            <button onClick={(e)=>toggleConfirmBox(e)}>Nao</button>
            <button onClick={()=>sendCardInfo()}>Sim</button>
        </ConfirmBox>
        <div className='background'></div>
        </StyledPlan>
    )
}
const StyledPlan = styled.div`
position:relative;
.background{
    display:${(props)=>props.confirmBox == true?"flex":"none"};
    background-color:black;
    position:fixed;
    height:100%;
    width:100%;
    z-index:5;
    opacity:70%;
}
display:flex;
flex-direction:column;
align-items:center;
header{
    width:100%;
    padding-top:24px;
    padding-left:3%;
}
header ion-icon{
color: #FFFFFF;
font-size:28px;
}

`
const StyledInfo = styled.div`
ion-icon{
    color: #FF4791;

}
img{
    width:140px;
    height:95px;
}
>:nth-child(3){
    margin-bottom:6px;
}
h2{
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 38px;
color: #FFFFFF;
margin-bottom:22px;
}
h3{
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 19px;
color: #FFFFFF;
}
h4{
    margin-top:4px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
}
`
const StyledForm = styled.form`
margin-top:34px;
width:310px;
display:flex;
flex-wrap:wrap;
justify-content:space-evenly;

> :nth-child(1), > :nth-child(2){
    background: #FFFFFF;
border-radius: 8px;
border-width:0px;
    width:300px;
    height:52px;
    margin-bottom: 8px;
    padding-left:7px;
    box-sizing:border-box;
}
> :nth-child(3), > :nth-child(4){
    background: #FFFFFF;
border-radius: 8px;
border-width:0px;
    width:145px;
    height:52px;
    padding-left:7px;
    box-sizing:border-box;
}
> button {

font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;
    display: flex;
justify-content: center;
align-items: center;
padding: 18px 122px;
    width: 300px;
height: 52px;
background: #FF4791;
border-radius: 8px;
border-width:0px;
margin-top:12px;
}
`

const ConfirmBox = styled.div`
position:absolute;
z-index:10;
box-sizing:border-box;
justify-content:space-evenly;
display:${(props)=>props.confirmBox == true?"flex":"none"};
flex-wrap:wrap;
align-items:space-between;
margin-top:-105px;
margin-left:-124px;
top:50%;
left:50%;
width: 248px;
height: 210px;
background: #FFFFFF;
border-radius: 12px;
padding-top:33px;
h2{
    width:100%;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    text-align: center;
    color: #000000;
}
> :nth-child(2){
    width: 95px;
height: 52px;

background: #CECECE;
border-radius: 8px;
border-width:0px;
display: flex;
justify-content: center;
align-items: center;

font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;
}
> :nth-child(3){
    width: 95px;
height: 52px;
display: flex;
justify-content: center;
align-items: center;
background: #FF4791;
border-radius: 8px;
border-width:0px;

font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;

color: #FFFFFF;
}
`