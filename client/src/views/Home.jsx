import { useEffect, useState } from "react"
import Screens from "../components/Screens"
import axios from 'axios'
import baseUrl from "../utils/baseUrl"

export default function Home() {

    useEffect(() => {
        async function getUserData() {
            let url = window.location
            let userId = new URLSearchParams(url.search).get('id')
            const response = await axios.get(`${baseUrl.productionUrl}/users/get-user-by-id/${userId}`, {
                headers: {
                    "ngrok-skip-browser-warning": "true"
                }
            })

            setUserData(response.data?.user)
        }

        getUserData()

    }, [])

    const [userData, setUserData] = useState()
    const [activeScreen, setActiveScreen] = useState('exibition')

    return (
        <>
            <div className="flex justify-center items-center py-[30px]">
                <Screens
                    setActiveScreen={setActiveScreen}
                    activeScreen={activeScreen}
                    userData={userData}
                />
            </div>
        </>
    )
}