import { NavLink } from "react-router-dom"
import { useState } from "react"
//import axios from "axios"
//import baseUrl from "../utils/baseUrl"

export default function SignUp() {

    // Payload States
    const [description, setDescription] = useState('')
    const [coupleName, setCoupleName] = useState('')
    const [email, setEmail] = useState('')
    const [beginDate, setBeginDate] = useState('')
    const [password, setPassword] = useState('')
    const [selectedPlan, setSelectedPlan] = useState(null)

    async function selectPaymentPlan(plan) {
        setSelectedPlan(plan)
    }

    // SignUp Payload
    const userPayload = {
        selectedPlan: selectedPlan,
        coupleName: coupleName,
        description: description,
        email: email,
        password: password,
        beginAt: beginDate
    }

    const [alertInfo, setAlertInfo] = useState('')

    // Store user payload, advance to checkout pix
    async function createUser(event) {

        event.preventDefault()

        if (selectedPlan === null) {
            alert('Selecione um Plano')
            return
        }

        try {
            console.log(userPayload)
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
                        <h1 className="text-black text-center mb-4 font-semibold">GOALS</h1>
                        <h2 className="text-2xl font-semibold py-4">Faça uma surpresa para seu parceiro!</h2>
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

                            <div className="rounded-sm mt-4">
                                <p className="py-2 text-lg font-semibold">Escolha um plano</p>
                                <p className="text-sm">Escolha um plano que mais se encaixa com voce e seu parceiro(a), o pagamento é via Pix e o plano pode ser cancelado quando quiser.</p>

                                <div
                                    className={`text-left border-2 p-2 rounded-md my-4 mb-1 w-full relative ${selectedPlan === 'PLANO_ANUAL' ? 'border-green-400 shadow-md' : ''}`}
                                    onClick={() => selectPaymentPlan('PLANO_ANUAL')}
                                >
                                    <p className={`border-2 w-[100px] font-semibold text-green-600 border-green-400 text-center px-1 rounded-md absolute right-2 text-sm ${selectedPlan === 'PLANO_ANUAL' ? 'block' : 'hidden'}`}>Quero Esse</p>
                                    <h3 className="font-semibold text-lg">1 Ano, R$15,00</h3>
                                    <p className="text-sm mt-2">Renove Anualmente, suporte semanal, nesse plano básico, voce terá acesso ás seguintes funcionalidades:</p>
                                    <ul className="p-0 m-0 grid grid-cols-2 mt-2">
                                        <li className="">✅ 3 Fotos</li>
                                        <li className="">✅ QR Code</li>
                                        <li className="">❌ Música</li>
                                        <li className="">❌ Lin. do Tempo</li>
                                        <li className="">❌ Wallpaper</li>
                                        <li className="">❌ Foto de Perfil</li>
                                    </ul>
                                </div>
                                <div
                                    className={`text-left border-2 p-2 rounded-md my-4 mb-1 w-full relative ${selectedPlan === 'PLANO_VITA' ? 'border-green-400 shadow-md' : ''}`}
                                    onClick={() => selectPaymentPlan('PLANO_VITA')}
                                >
                                    <p className={`border-2 w-[100px] font-semibold text-green-600 border-green-400 text-center px-1 rounded-md absolute right-2 text-sm ${selectedPlan === 'PLANO_VITA' ? 'block' : 'hidden'}`}>Quero Esse</p>
                                    <h3 className="font-semibold text-lg">Para Sempre, R$29,90</h3>
                                    <p className="text-sm mt-2">Seu site não espira, e tem suporte vitalício, além de mais funcionalidades como:</p>
                                    <ul className="p-0 m-0 grid grid-cols-2 mt-2">
                                        <li className="">✅ 5 Fotos</li>
                                        <li className="">✅ QR Code</li>
                                        <li className="">✅ Música</li>
                                        <li className="">✅ Lin. do Tempo</li>
                                        <li className="">✅ Wallpaper</li>
                                        <li className="">✅ Foto de Perfil</li>
                                    </ul>
                                </div>
                            </div>

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

                            <p className="text-center mt-4">
                                <NavLink to={"/"}>
                                    <b className="font-semibold text-purple-600"> Já tenho conta!</b>
                                </NavLink>
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}