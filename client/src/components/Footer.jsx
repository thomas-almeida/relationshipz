import { Analytics } from "@vercel/analytics/react"
export default function Footer() {
    return (
        <>
            <footer className="p-2 py-4 bg-slate-100 mt-8">
                <div className="flex justify-center items-center">
                    <img
                        src="/author.jpg"
                        className="w-[40px] rounded-full mr-2"
                        alt="autor do site"
                    />
                    <p className="font-semibold">
                        Feito por                        
                        <a
                            href="https://www.instagram.com/nego.thomm/"
                            target="_blank"
                            className="text-[#EA2DA0] ml-1"
                        >
                            Thomas Almeida
                        </a>
                    </p>
                </div>
                <div className="py-2 flex justify-around items-center flex-wrap font-semibold">
                    <a href="/termos-e-condicoes">Veja os Termos e Condições</a>
                </div>
            </footer>
            <Analytics/>
        </>
    )
}