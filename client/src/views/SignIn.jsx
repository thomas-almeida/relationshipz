/* eslint-disable react-hooks/exhaustive-deps */
import { NavLink, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import baseUrl from "../utils/baseUrl"
import Footer from "../components/Footer"

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

            const response = await axios.post(`${baseUrl.productionUrl}/users/sign-in`, userPayload)
            localStorage.setItem('userId', response.data.user?.id)
            localStorage.setItem('userLogged', 'true')
            localStorage.setItem('userData', JSON.stringify(response.data?.user))
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
                        <div className="flex justify-center m-2 mb-4">
                            <p className="border-2 font-semibold w-[80px] rounded-md shadow-sm">
                                Goals 💕
                            </p>
                        </div>
                        <h1 className="text-4xl font-bold py-6">O Site do Seu Relacionamento!</h1>
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
                                className="border w-[100%] my-2 p-2 rounded-md shadow-md bg-[#EA2DA0] text-white font-medium"
                                value="Entrar"
                            />
                            <p className="text-center mt-4">
                                <p>Ainda não tem o site de vocês?,</p>
                                <NavLink to={"/"}>
                                    <b className="font-semibold text-[#EA2DA0]"> crie o seu site agora!</b>
                                </NavLink>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}