import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import baseUrl from "../utils/baseUrl"


export default function SignUp() {

    // Navigate
    const redirect = useNavigate()

    // Payload States
    const [description, setDescription] = useState('')
    const [firstPersonName, setFirstPersonName] = useState('')
    const [firstPersonInstagram, setFirstPersonInstagram] = useState('')
    const [secondPersonName, setSecondPersonName] = useState('')
    const [secondPersonInstagram, setSecondPersonInstagram] = useState('')
    const [email, setEmail] = useState('')
    const [beginDate, setBeginDate] = useState('')
    const [password, setPassword] = useState('')

    // SignUp Payload
    const userPayload = {
        description: description,
        firstPersonName: firstPersonName,
        secondPersonName: secondPersonName,
        firstPersonInstagram: `https://www.instagram.com/${firstPersonInstagram}/`,
        secondPersonInstagram: `https://www.instagram.com/${secondPersonInstagram}/`,
        email: email,
        password: password,
        beginAt: beginDate
    }

    const [alertInfo, setAlertInfo] = useState('')

    // create User
    async function createUser(event) {

        event.preventDefault()

        try {
            const response = await axios.post(`${baseUrl.productionUrl}/users/sign-up`, userPayload)
            localStorage.setItem('userID', response.data.user?.id)
            localStorage.setItem('userLogged', 'true')
            redirect(`/home?settings`)

        } catch (error) {

            setAlertInfo(console.error)
            alert(alertInfo)
            console.error(error)

        }
    }


    return (
        <>
            <div className="flex justify-center items-center py-10 overflow-y-auto">
                <div className="w-[85%]">
                    <div className="text-center">
                        <h1>SignUp</h1>
                        <p>Registre-se</p>
                    </div>
                    <div className="mt-5">
                        <form className="" onSubmit={createUser}>
                            <p>Mensagem Principal</p>
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder={`Ex "Te Amo Mil Milhoes"`}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <p className="mt-4">{`Namorado(a) #1`}</p>
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
                                placeholder="@ do instagram"
                                value={firstPersonInstagram}
                                onChange={(e) => setFirstPersonInstagram(e.target.value)}
                                required
                            />
                            <p className="mt-4">{`Namorado(a) #2`}</p>
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Nome do Namorado(a)"
                                value={secondPersonName}
                                onChange={(e) => setSecondPersonName(e.target.value)}
                                required
                            />
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="@ do instagram"
                                value={secondPersonInstagram}
                                onChange={(e) => setSecondPersonInstagram(e.target.value)}
                                required
                            />
                            <p className="mt-4">{`Email`}</p>
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