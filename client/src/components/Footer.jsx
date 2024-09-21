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
                            href="#"
                            className="text-[#EA2DA0]"
                        >
                            Thomas Almeida
                        </a>
                    </p>
                </div>
                <div className="py-2 flex justify-around items-center flex-wrap font-semibold">
                    <a href="/termos-e-condicoes">Veja os Termos e Condições</a>
                </div>
            </footer>
        </>
    )
}