import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import baseUrl from "../utils/baseUrl"

export default function SignIn() {

    const redirect = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userPayload = {
        email: email,
        password: password
    }

    const [alertInfo, setAlertInfo] = useState('')

    async function signInUser(event) {

        event.preventDefault()

        try {

            const response = await axios.post(`${baseUrl.productionUrl}/users/sign-in`, userPayload)
            localStorage.setItem('userID', response.data.user?.id)
            localStorage.setItem('userLogged', 'true')
            redirect(`/home?settings`)

        } catch (error) {
            console.error(error)
            setAlertInfo(error)
            alert(alertInfo)
        }
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-[85%]">
                    <div className="text-center">
                        <h1 className="text-black text-center mb-4">Goals 💕</h1>
                        <p>Entrar</p>
                    </div>
                    <div className="mt-5">
                        <form className="" onSubmit={signInUser}>
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm"
                                placeholder="Email Cadastrado"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="border w-[100%] my-2 p-2 rounded-sm"
                                placeholder="Escolha uma senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="submit"
                                className="border w-[100%] my-2 p-2 rounded-sm bg-purple-600 text-white font-medium"
                                value="Entrar"
                            />
                            <p className="text-center mt-4">
                                Ainda não tem o site de voces?,
                                <NavLink to={"/sign-up"}>
                                    <b className="font-semibold text-purple-600"> crie um agora!</b>
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}