import { useEffect, useState } from "react"
import Screens from "../components/Screens"
import axios from 'axios'
import baseUrl from "../utils/baseUrl"

export default function Home() {

    const [userData, setUserData] = useState()
    const [activeScreen, setActiveScreen] = useState('settings')

    async function getUserData() {
        if (localStorage.getItem('userId') !== 'undefined') {
            let userId = localStorage.getItem('userId')
            const response = await axios.get(`${baseUrl.productionUrl}/users/get-user-by-id/${userId}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            })

            setUserData(response.data?.user)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])


    return (
        <>
            <div className="flex justify-center items-center py-[30px] bg-slate-50">
                <Screens
                    setActiveScreen={setActiveScreen}
                    activeScreen={activeScreen}
                    userData={userData}
                    refreshUserData={getUserData}
                />
            </div>
        </>
    )
}