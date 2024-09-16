import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

export default function LandingPage() {
    return (
        <>
            <div className="flex justify-center">
                <div className="w-[85%] py-4">
                    <div className="text-center">
                        <div className="flex justify-center m-2 mb-4">
                            <p className="border-2 font-semibold w-[80px] rounded-md shadow-sm">
                                Goals 💕
                            </p>
                        </div>
                        <h1 className="text-5xl font-bold py-4">Surpreenda seu Amor</h1>
                        <p className="font-semibold mt-2">
                            Seu namoro agora com um site personalizado + um contador ao vivo do tempo de relacionamento com fotos do casal
                        </p>
                        <NavLink
                            to={"/sign-up"}
                        >
                            <button className="rounded-md shadow-md p-2 px-4 w-[80%] bg-[#EA2DA0] my-2 mt-4 text-white font-semibold">
                                Criar meu site agora
                            </button>
                        </NavLink>
                        <br />
                        <NavLink
                            to={"/sign-in"}
                        >
                            <button className="w-[80%] mt-2 border-2 border-black rounded-md p-2 px-4">
                                <div className="flex justify-center items-center">
                                    <p className="font-semibold">Já tenho conta</p>
                                    <img src="/arrow.png" className="relative top-[2px] left-1" alt="" />
                                </div>
                            </button>
                        </NavLink>
                    </div>

                    <div className="mb-10">
                        <img src="/super-example.gif" draggable="false" alt="" />
                    </div>

                    <div className="text-center">
                        <h2 className="text-2xl font-bold pb-4">
                            Como funciona?
                        </h2>
                        <p className="py-2 font-semibold">
                            Ao criar um site do seu relacionamento no Goals 💕 você garante acesso a inserir fotos, música, mensagens e o tempo de relacionamento do casal
                        </p>

                        <div className="border-4 rounded-md my-2 p-2 mt-4">
                            <h3 className="text-xl font-bold pb-2">1. Dados do Casal</h3>
                            <p className="font-semibold">Ao clicar em  <a href="#" className="text-[#EA2DA0]">crie seu site agora</a>criar o site você será redirecionado para inserir os dados do site como nome do casal, tempo, mensagem, email e senha de acesso.</p>
                        </div>
                        <div className="border-4 rounded-md my-2 p-2">
                            <h3 className="text-xl font-bold pb-2">2. Escolha um Plano</h3>
                            <p className="font-semibold">Após optar em um dos planos anual ou vitalício, e ter inserido os dados iniciais do casal, você será redirecionado ao pagamento do plano escolhido, se estiver tudo certo, você receberá um email com o QR Code do site e irá para a página de configurações</p>
                        </div>
                        <div className="border-4 rounded-md my-2 p-2">
                            <h3 className="text-xl font-bold pb-2">3. Surpreenda seu Amor</h3>
                            <p className="font-semibold">Com seu site e QR Code em mãos, insira fotos, edite a mensagem principal, seja livre para personalizar do jeito que quiser e compartilhar seu site com qualquer pessoa</p>
                            <NavLink
                                to={"/sign-up"}
                            >
                                <button className="rounded-md shadow-md p-2 px-4 w-[80%] bg-[#EA2DA0] my-2 mt-4 text-white font-semibold">
                                    Criar meu site agora
                                </button>
                            </NavLink>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <h2 className="text-2xl font-bold pb-4">Perguntas Frequentes</h2>
                        <div className="border-4 rounded-md my-2 p-2 mt-4">
                            <h3 className="text-xl font-bold pb-2">O Que é o Goals💕</h3>
                            <p className="font-semibold">Goals 💕 é uma plataforma que permite criar paginas personalizadas para casais. Aqui você adiciona fotos, o tempo que estão juntos e muito mais! </p>
                        </div>
                        <div className="border-4 rounded-md my-2 p-2">
                            <h3 className="text-xl font-bold pb-2">Como criar um site no Goals💕</h3>
                            <p className="font-semibold">Para criar um site personalizado na plataforma é muito simples, basta clicar em <a href="#" className="text-[#EA2DA0]">crie seu site agora</a> e começar a preencher o formulário com os dados do casal</p>
                        </div>
                        <div className="border-4 rounded-md my-2 p-2">
                            <h3 className="text-xl font-bold pb-2">Como recebo minha página personalzada</h3>
                            <p className="font-semibold">O processo é automático, após escolher um dos planos e realizar o pagamento, voce é redirecionado á sua página para  personalizar seu site e recebe um email com o QR Code do site para imprimir se quiser</p>
                        </div>
                        <div className="border-4 rounded-md my-2 p-2">
                            <h3 className="text-xl font-bold pb-2">A Página tem validade?</h3>
                            <p className="font-semibold">No preço básico de um ano sim, mas no vitalício você garante sua página personalizada 24/7 disponível para contar os minutos e segundos do seu relacionamento</p>
                        </div>
                        <div className="border-4 rounded-md my-2 p-2">
                            <h3 className="text-xl font-bold pb-2">Quais são as formas de pagamento</h3>
                            <p className="font-semibold">A forma de pagamento aceita por enquanto são por pix, cartões e boleto, você pode pagar como preferir</p>
                        </div>
                        <div className="border-4 rounded-md my-2 p-2">
                            <h3 className="text-xl font-bold pb-2">Como funciona o suporte</h3>
                            <p className="font-semibold">Basta enviar uma <a href="#" className="text-[#04AA28]">mensagem por aqui</a>, e vamos te atender o mais rápido possível para esclarecer e sanar quaisquer dúvidas</p>
                        </div>
                        <NavLink
                            to={"/sign-up"}
                        >
                            <button className="rounded-md shadow-md p-2 px-4 w-[80%] bg-[#EA2DA0] my-2 mt-4 text-white font-semibold">
                                Criar meu site agora
                            </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}