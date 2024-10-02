import { NavLink, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import baseUrl from "../utils/baseUrl"

export default function SignUp() {

    // Payload States
    const [description, setDescription] = useState('')
    const [coupleName, setCoupleName] = useState('')
    const [email, setEmail] = useState('')
    const [beginDate, setBeginDate] = useState('')
    const [password, setPassword] = useState('')

    // SignUp Payload
    const userPayload = {
        coupleName: coupleName,
        description: description,
        email: email,
        password: password,
        beginAt: beginDate
    }

    const redirect = useNavigate()
    const [alertInfo, setAlertInfo] = useState('')

    useEffect(() => {
        const url = window.location.search

        function isPaid() {
            if (!url.includes('?paid')) {
                console.log('user dont pay yet')
                redirect('/')
            }

            console.log('user already pay')
            return
        }

        isPaid()

    }, [])

    async function createUser(event) {

        event.preventDefault()

        try {

            // store user and advance to upload photos
            const response = await axios.post(`${baseUrl.productionUrlFIX}/users/sign-up`, userPayload)
            localStorage.setItem('userId', response.data?.id)
            localStorage.setItem('userData', JSON.stringify(response.data))
            localStorage.setItem('userLogged', true)

            //sending email
            await axios.post(`${baseUrl.productionUrlFIX}/send-email`, {
                email: email,
                link: `https://goals-three.vercel.app/home?id=${response.data?.id}`
            })

            redirect('/home?settings')

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
                        <div className="flex justify-center m-2 mb-4">
                            <p className="border-2 font-semibold px-4 py-1 text-white bg-green-500 rounded-md shadow-sm">
                                Pagamento Aprovado! Crie sua conta
                            </p>
                        </div>
                        <h2 className="text-4xl font-bold py-4">Insira os dados do casal e crie seu site!</h2>
                    </div>
                    <div className="mt-5">
                        <form className="" onSubmit={createUser}>
                            <p className="text-lg font-semibold pt-1">Nome do Casal</p>
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder={`Ex "Agostinho & Bebel"`}
                                value={coupleName}
                                onChange={(e) => setCoupleName(e.target.value)}
                                required
                            />
                            <p className="text-lg font-semibold pt-1">Mensagem Principal</p>
                            <input
                                type="text"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder={`Ex "Te Amo Mil Milhoes"`}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            <div className="my-2">
                                <p className="text-lg font-semibold pt-1">Início do Namoro</p>
                                <input
                                    type="date"
                                    className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                    value={beginDate}
                                    onChange={(e) => setBeginDate(e.target.value)}
                                    required
                                />
                            </div>
                            <p className="text-lg font-semibold mt-4">Email</p>
                            <input
                                type="email"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Seu Melhor Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <p className="text-lg font-semibold pt-1">Senha</p>
                            <input
                                type="password"
                                className="border w-[100%] my-2 p-2 rounded-sm text-lg"
                                placeholder="Escolha uma senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <p className=" mb-4 mt-4">
                                Dúvidas? nos mande um
                                <NavLink to={"/"}>
                                    <b className="font-semibold text-green-600"> Whatsapp!</b>
                                </NavLink>
                            </p>

                            <input
                                type="submit"
                                className="border w-[100%] my-2 p-3 rounded-sm bg-purple-600 text-white font-medium"
                                value="Registrar Casal e Prosseguir"
                            />
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}