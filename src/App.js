import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyle from "./assets/styles/GlobalStyle"
import LoginScreen from "./LoginScreen"
import SignUp from "./SignUp"

export default function App(){
const [userInfo,setUserInfo] = useState({})
return(
    <>

    <BrowserRouter>
        <GlobalStyle/>
        <Routes>
            <Route path="/" element={<LoginScreen setUserInfo={setUserInfo} userInfo={userInfo}/>}></Route>
            <Route path="/sign-up" element={<SignUp/>}></Route>
        </Routes>
    </BrowserRouter>
    </>
)
}