import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import GlobalStyle from "./assets/styles/GlobalStyle"
import LoginScreen from "./LoginScreen"
import SignUp from "./SignUp"
import Subscriptions from "./Subscriptions"
import SubscriptionsPlans from "./SubscriptionsPlans"
import UserInfoContextProvider from "./assets/contexts/UserInfoContext"
import { UserInfoContext } from "./assets/contexts/UserInfoContext"
import HomePage from "./HomePage"

export default function App(){
const [userInfo,setUserInfo] = useState({})

return(
    <>
    <UserInfoContext.Provider value={{userInfo, setUserInfo}}>
    <BrowserRouter>
        <GlobalStyle/>
        <Routes>
            <Route path="/" element={<LoginScreen/>}></Route>
            <Route path="/sign-up" element={<SignUp/>}></Route>
            <Route path="/subscriptions" element={<Subscriptions/>}></Route>
            <Route path="/subscriptions/:idPlano" element={<SubscriptionsPlans />}></Route>
            <Route path='/home' element={<HomePage/>}></Route>
        </Routes>
    </BrowserRouter>
    </UserInfoContext.Provider>
    </>
)
}