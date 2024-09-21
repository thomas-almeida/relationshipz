

import { NavLink } from 'react-router-dom'
import Footer from '../components/Footer'

export default function TermsAndPolicy() {

    return (
        <>
            <div className="flex justify-center">
                <div className="w-[85%] py-4">

                    <div className="mb-6">
                        <p className="border-2 font-semibold w-[80px] text-center rounded-md shadow-sm">
                            <NavLink to={'/'}>
                                Voltar
                            </NavLink>
                        </p>
                    </div>

                    <h1 className="text-2xl font-semibold">
                        Termos de Uso e Politica de Privacidade
                    </h1>

                    <div className="my-6">

                        <h2 className="text-xl">Termos de Uso</h2>

                        <h2 className="my-2 font-semibold">1. Introdução</h2>
                        <p className="text-justify">Bem-vindo ao <strong>Goals</strong>, uma plataforma online dedicada à criação de páginas personalizadas para casais. Ao acessar e utilizar nossos serviços, você concorda com os termos e condições estabelecidos neste documento. Caso não concorde, recomendamos que não utilize nossos serviços.</p>

                        <h2 className="my-2 font-semibold">2. Serviços Oferecidos</h2>
                        <p className="text-justify">O <strong>Goals</strong> oferece a criação de páginas personalizadas para casais, contendo fotos, contador de tempo de relacionamento, música favorita e mensagens. O serviço é acessado mediante pagamento de um plano único anual, e a página criada terá validade de um ano. Após a confirmação do pagamento e o registro dos dados do casal, será enviado um QR Code com o link da página personalizada.</p>

                        <h2 className="my-2 font-semibold">3. Registro e Responsabilidade do Usuário</h2>
                        <p className="text-justify">Para utilizar nossos serviços, é necessário fornecer informações verdadeiras e completas no momento do registro. O usuário é responsável pela veracidade dos dados e pelo conteúdo enviado, como fotos e mensagens.</p>

                        <h2 className="my-2 font-semibold">4. Pagamentos</h2>
                        <p className="text-justify">O pagamento do plano anual é feito de forma única e não reembolsável. A duração do serviço contratado é de um ano, contada a partir da data de pagamento. Após o término desse período, a página personalizada será removida da plataforma, a menos que o plano seja renovado.</p>

                        <h2 className="my-2 font-semibold">5. Propriedade Intelectual</h2>
                        <p className="text-justify">O conteúdo criado pelo usuário, como fotos e mensagens, permanece de sua propriedade. No entanto, ao usar o <strong>Goals</strong>, você concede à plataforma o direito de hospedar e exibir esse conteúdo enquanto o serviço estiver ativo.</p>

                        <h2 className="my-2 font-semibold">6. Modificações nos Termos</h2>
                        <p className="text-justify">O <strong>Goals</strong> reserva-se o direito de alterar os Termos de Uso a qualquer momento. Qualquer modificação será comunicada aos usuários via e-mail ou notificação no site.</p>

                        <h2 className="my-2 font-semibold">7. Encerramento de Conta</h2>
                        <p className="text-justify">Caso haja violação dos termos aqui estabelecidos, o <strong>Goals</strong> reserva-se o direito de encerrar a conta do usuário e remover o conteúdo sem aviso prévio.</p>

                        <h2 className="my-2 font-semibold">8. Limitação de Responsabilidade</h2>
                        <p className="text-justify">O <strong>Goals</strong> não se responsabiliza por interrupções temporárias no serviço, perdas de dados ou falhas de acesso causadas por fatores externos. O usuário concorda em isentar o <strong>Goals</strong> de qualquer reclamação por danos decorrentes do uso da plataforma.</p>

                        <h2 className="my-2 font-semibold">9. Lei Aplicável</h2>
                        <p className="text-justify">Este contrato é regido pelas leis do Brasil. Em caso de litígios, estes deverão ser resolvidos no foro da cidade sede do <strong>Goals</strong>.</p>
                    </div>

                    <hr />

                    <div className="my-6">

                        <h2 className="text-xl">Politica de Privacidade</h2>

                        <h2 className="my-2 font-semibold">1. Informações Coletadas</h2>
                        <p className="text-justify">O <strong>Goals</strong> coleta informações fornecidas diretamente pelos usuários, incluindo nome, e-mail, fotos, música favorita, mensagens e outras informações relacionadas ao casal. Também coletamos informações de pagamento para processar a compra do plano anual.</p>

                        <h2 className="my-2 font-semibold">2. Uso das Informações</h2>
                        <p className="text-justify">As informações fornecidas pelos usuários são utilizadas para criar páginas personalizadas e enviar QR Codes. O e-mail é usado para comunicação sobre o serviço e atualizações. As informações financeiras são utilizadas exclusivamente para processar o pagamento e não são armazenadas em nossos servidores.</p>

                        <h2 className="my-2 font-semibold">3. Compartilhamento de Dados</h2>
                        <p className="text-justify">O <strong>Goals</strong> não compartilha os dados dos usuários com terceiros, exceto quando necessário para o processamento de pagamentos ou para cumprir obrigações legais.</p>

                        <h2 className="my-2 font-semibold">4. Segurança dos Dados</h2>
                        <p className="text-justify">Implementamos medidas de segurança para proteger as informações dos usuários, como criptografia e controle de acesso. Apesar disso, nenhum sistema é completamente seguro, e não podemos garantir a segurança absoluta dos dados.</p>

                        <h2 className="my-2 font-semibold">5. Direitos dos Usuários</h2>
                        <p className="text-justify">Os usuários têm o direito de solicitar acesso, correção ou exclusão de seus dados a qualquer momento. Para fazer isso, basta entrar em contato conosco através do nosso canal de atendimento.</p>

                        <h2 className="my-2 font-semibold">6. Cookies</h2>
                        <p className="text-justify">Nosso site pode usar cookies para melhorar a experiência do usuário, como manter sua sessão ativa ou salvar preferências. Esses cookies podem ser desativados a qualquer momento nas configurações do navegador.</p>

                        <h2 className="my-2 font-semibold">7. Retenção de Dados</h2>
                        <p className="text-justify">Os dados pessoais fornecidos pelos usuários são mantidos apenas durante a vigência do plano anual. Após o término do plano, os dados são excluídos permanentemente, a menos que o usuário opte por renovar o serviço.</p>

                        <h2 className="my-2 font-semibold">8. Alterações na Política de Privacidade</h2>
                        <p className="text-justify">O <strong>Goals</strong> pode alterar esta Política de Privacidade periodicamente. Notificaremos os usuários sobre qualquer mudança significativa através de e-mail ou notificação no site.</p>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}