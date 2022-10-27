import React from 'react';
import styled from 'styled-components';
import { Link, Navigate } from "react-router-dom";
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from "./assets/imgs/DrivenPlusLogo.png";


export default function LoginScreen({setUserInfo}){
    const [sentRequest, setSentRequest] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate =useNavigate();
    useEffect(() => {
        if (sentRequest ===false){}
        else{
		const registration = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login",
            {
                email: email,
                password:password
            })
            registration.then(promessa=>{handleResponse(promessa)})
            registration.catch((error)=>{setSentRequest(false)})
	    }}, [sentRequest]);

    function handleResponse(response){
        setUserInfo({email:response.data.email,
        id:response.data.id,
        image:response.data.image,
        name:response.data.name,
        password:response.data.password,
        token:response.data.token})
        navigate(`/hoje`)
        
    }
    return(
    <LoginStyled>
        <img src={logo}></img>
        <input placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}>
        </input>
        <input placeholder='senha' value={password} onChange={(e)=>setPassword(e.target.value)}>
        </input>
        <button onClick={()=>{setSentRequest(true)}}>Entrar</button>

        <Link to={`/sign-up`}>
        <p>Não tem uma conta? Cadastre-se!</p>
        </Link>
        
    </LoginStyled>)
}
const LoginStyled = styled.div`
box-sizing: border-box;
img{
    height:49px;
    width:299px;
    margin-top:70px;
    margin-bottom:100px;
}
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
input{
    box-sizing: border-box;
    width: 299px;
height: 45px;
margin-bottom:6px;
background: #FFFFFF;
border: 1px solid #D5D5D5;
border-radius: 8px;
font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
color: #7E7E7E;
padding-left:11px;
margin-bottom:16px;
}
button{
    display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
padding: 18px 122px;
gap: 10px;
width: 298px;
height: 52px;
background: #FF4791;
border-radius: 8px;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
border-width:0px;
margin-top:8px;
margin-bottom:24px;
}

p{
    font-family: 'Roboto';
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 16px;
text-decoration-line: underline;
color: #FFFFFF;
}
button:hover{
    cursor:pointer;
}
p:hover{
    cursor:pointer;
}
`