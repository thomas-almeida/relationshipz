/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
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

    useEffect(() => {
        if (localStorage.getItem('userLogged')) {
            redirect('/home?settings')
        }
    }, [])

    async function signInUser(event) {

        event.preventDefault()

        try {

            const response = await axios.post(`${baseUrl.localUrl}/users/sign-in`, userPayload)
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
                        <h1 className="text-black text-center mb-4 font-semibold">GOALS</h1>
                        <h2 className="text-2xl font-semibold py-2">O Site do Seu Relacionamento!</h2>
                    </div>
                    <div className="mt-5">
                        <form className="" onSubmit={signInUser}>
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm"
                                placeholder="Seu Email Cadastrado"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="border w-[100%] my-2 p-2 rounded-sm"
                                placeholder="Insira Sua Senha"
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