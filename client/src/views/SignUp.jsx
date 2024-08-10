import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export default function SignUp() {

    // Navigate
    const redirect = useNavigate()

    // Payload States
    const [username, setUsername] = useState('')
    const [firstPersonName, setFirstPersonName] = useState('')
    const [secondPersonName, setSecondPersonName] = useState('')
    const [email, setEmail] = useState('')
    const [beginDate, setBeginDate] = useState('')
    const [password, setPassword] = useState('')

    // SignUp Payload
    const userPayload = {
        username: username,
        firstPersonName: firstPersonName,
        secondPersonName: secondPersonName,
        email: email,
        password: password,
        beginAt: beginDate
    }

    const [alertInfo, setAlertInfo] = useState('')
    const serverEndpoint = 'http://localhost:3003'

    // create User
    async function createUser(event) {

        event.preventDefault()

        try {
            console.log(userPayload)
            const response = await axios.post(`${serverEndpoint}/users/sign-up`, userPayload)
            redirect(`/home?id=${response.data.id}`)

        } catch (error) {

            setAlertInfo(console.error)
            alert(alertInfo)
            console.error(error)

        }
    }


    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="w-[85%]">
                    <div className="text-center">
                        <h1>SignUp</h1>
                        <p>Registre-se</p>
                    </div>
                    <div className="mt-5">
                        <form className="" onSubmit={createUser}>
                            <p>Dados do Casal</p>
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Nome de Usuário"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Nome do Namorado(a)"
                                value={firstPersonName}
                                onChange={(e) => setFirstPersonName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Nome do Namorado(a)"
                                value={secondPersonName}
                                onChange={(e) => setSecondPersonName(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Seu Melhor Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="my-2">
                                <p>Início do Namoro</p>
                                <input
                                    type="date"
                                    className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                    value={beginDate}
                                    onChange={(e) => setBeginDate(e.target.value)}
                                    required
                                />
                            </div>
                            <p>Senha</p>
                            <input
                                type="password"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Escolha uma senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                type="submit"
                                className="border w-[100%] my-2 p-2 rounded-sm bg-purple-600 text-white font-medium"
                                value="Registrar Casal"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}