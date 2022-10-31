import React from 'react';
import styled from 'styled-components';
import { Link, Navigate } from "react-router-dom";
import { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from "./assets/imgs/DrivenPlusLogo.png";
import { UserInfoContext } from './assets/contexts/UserInfoContext';

export default function HomePage(){
    const {userInfo} = useContext(UserInfoContext);
    const navigate = useNavigate();
    console.log(userInfo)
    function deletePlan(){
        const config = {
            headers: { Authorization: `Bearer ${userInfo.token}` }
        }
        const deletion = axios.delete("https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",config
        )
        navigate(`/subscriptions`)

    }
    function logout(){
        localStorage.removeItem("userInfo");
        navigate(`/`)
    }
    return(
        <StyledHome>
            <header>
                <div>
                    <img src={userInfo?.membership.image}></img>
                    <section><ion-icon onClick={()=>{logout()}} name="log-out"></ion-icon>
                    <ion-icon name="person-circle"></ion-icon></section>
                    
                </div>
                <h1>Ola, {userInfo.name}</h1>
            </header>
            <StyledPerksList>
                {userInfo?.membership.perks.map((perk,index)=>(<li key={index}><a href={perk.link}>
                    <div>{perk.title}</div>
                </a></li>))}
            </StyledPerksList>
            <footer>
                <Link to={`/subscriptions`}><div>Mudar plano</div></Link>
                <div onClick={()=>{deletePlan()}}>Cancelar plano</div>
            </footer>
        </StyledHome>
    )
}

const StyledHome = styled.div`
position:relative;
display:flex;
flex-direction:column;
align-items:center;
width:100%;
padding-top:160px;
header {
    position:absolute;
    top:0px;
    left:0px;
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
}

header > div {
    box-sizing:border-box;
display:flex;
justify-content:space-between;
padding-left:10%;
padding-top:7%;
width:100%;
padding-right:5%;
}

header img{
    width:75px;
    height:50px;
}
h1{
    font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 24px;
line-height: 28px;
color: #FFFFFF;
margin-bottom:50px;
}
text-decoration:none;
ion-icon{
    color:white;
    font-size:34px;
}
header div section > :first-child{
    color:#FF4747;
}
footer{
    display:flex;
    flex-direction:column;
    align-items:center;
    width:100%;
    position:fixed;
    bottom:0px;
    left:0px;
    padding-bottom:12px;
}
 > footer > :first-child{
    background: #FF4791;
border-radius: 8px;
width: 299px;
height: 52px;
display: flex;
justify-content: center;
align-items: center;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
text-decoration:none;
 }
 > footer > :last-child{
    margin-top:8px;
    background: #FF4747;
border-radius: 8px;
width: 299px;
height: 52px;
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
`
const StyledPerksList = styled.ul`
text-decoration:none;
li div{
background: #FF4791;
border-radius: 8px;
width: 299px;
height: 52px;
display: flex;
justify-content: center;
align-items: center;
font-family: 'Roboto';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 16px;
color: #FFFFFF;
text-decoration:none;
margin-bottom:8px;
}
`