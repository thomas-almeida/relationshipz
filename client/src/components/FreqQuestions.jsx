
/* eslint-disable react/prop-types */

export default function QrCodeModal({
    visible,
    closeModal
}) {
    return (
        <>
            <div
                className={
                    visible ?
                        `absolute p-8 bg-[#000] flex items-center justify-center z-10 w-full`
                        : `hidden`
                }
            >
                <div className="border bg-white p-8">
                    
                    <h2>Perguntas Frequentes</h2>

                    <button
                        onClick={() => closeModal()}
                        className="border p-1 px-2"
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </>
    )
}