import React from 'react';
import styled from 'styled-components';
import { Link, Navigate } from "react-router-dom";
import { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from "./assets/imgs/DrivenPlusLogo.png";
import { UserInfoContext } from './assets/contexts/UserInfoContext';


export default function LoginScreen(){
    const {setUserInfo} = useContext(UserInfoContext);
    const [sentRequest, setSentRequest] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate =useNavigate();
    const localUserInfo = JSON.parse(localStorage.getItem("userInfo"))
    if (localUserInfo != null)
    {
        setUserInfo({email:localUserInfo.email,
        id:localUserInfo.id,
        cpf:localUserInfo.cpf,
        name:localUserInfo.name,
        password:localUserInfo.password,
        membership:localUserInfo.membership,
        token:localUserInfo.token});
        if(localUserInfo.membership == null)
        {
            navigate(`/subscriptions`)
        }
        else{
            navigate(`/home`)
        }
    }
    function sendRequest(event){
        event.preventDefault();
        const request = axios.post("https://mock-api.driven.com.br/api/v4/driven-plus/auth/login",
        {
            email: email,
            password:password
        })
        request.then(promessa=>{console.log("PROMESSA");console.log(promessa);handleResponse(promessa)})
        request.catch((error)=>{console.log("ERRO");alert(error.response.data.message);})
    }
    function handleResponse(response){
        setUserInfo({email:response.data.email,
        id:response.data.id,
        cpf:response.data.cpf,
        name:response.data.name,
        password:response.data.password,
        membership:response.data.membership,
        token:response.data.token});
        localStorage.setItem("userInfo", JSON.stringify({
            email:response.data.email,
            id:response.data.id,
            cpf:response.data.cpf,
            name:response.data.name,
            password:response.data.password,
            membership:response.data.membership,
            token:response.data.token}))
        if(response.data.membership == null)
        {
            navigate(`/subscriptions`)
        }
        else{
            navigate(`/home`)
        }
        
        
        
    }
    return(
    <LoginStyled >
        <img src={logo}></img>
        <input placeholder='email' required value={email} onChange={(e)=>setEmail(e.target.value)}>
        </input>
        <input placeholder='senha' type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}>
        </input>
        <button type='submit' onClick={(e)=>{sendRequest(e)}}>Entrar</button>

        <Link to={`/sign-up`}>
        <p>Não tem uma conta? Cadastre-se!</p>
        </Link>
        
    </LoginStyled>)
}
const LoginStyled = styled.form`
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