import { useOnClickOutside } from "@/lib/custom-hooks";
import { useRef } from "react";


const Modal = (props) => {
    const {
        isOpen = false,
        onClose,
        children,
        adjustment,
        contentClass,
        isMobile,
        onScroll,
        closablex,
        title,
        subtitle,
        closable,
        headerClass,
        modalClass
    } = props

    const modal = useRef(null);
    useOnClickOutside(modal, () => {
        if (!closablex) return
        onClose()
    });
    console.log("title", title)
    return (
        <>
        <div
            role="alertdialog"
            className={`bg-[#00000095] w-screen overflow-y-auto h-screen fixed top-0 left-0 md:pt-[150px] flex items-start justify-center transition-all`}
            style={!isOpen ? { opacity: 0, zIndex: -1 } : { zIndex: 5555 }}
            onClick={onClose ? onClose : null}
        ></div>
            <div
                ref={modal}
                className={
                    adjustment
                        ? `max-w-[300px] sm:min-w-[350px] mt-8 sm:mt-0 sm:mb-12 centered sm:fixed max-h-[80%] overflow-y-auto ${contentClass || ""
                        }`
                        : `bg-white shadow-md ${isMobile ? "min-w-[95%]" : "min-w-[400px]"}  sm:min-w-[350] mt-8 sm:mt-0 sm:mb-12 centered overflow-y-auto sm:fixed max-h-[80%]  ${contentClass || ""
                        }`
                }
                style={!isOpen ? { opacity: 0, zIndex: -1 } : { zIndex: 5555 }}
                onScroll={onScroll ? onScroll : null}
            >{title || closable ? (
                <div
                    className={
                        adjustment
                            ? "p-4 border-b flex items-center justify-between bg-white"
                            : `p-4 border-b flex items-center justify-between`
                    }
                >
                    <div className={`${headerClass}`}>
                        {title ? (
                            <div className={`${adjustment ? "" : "pr-12"} font-semibold`}>
                                {title}
                            </div>
                        ) : (
                            ""
                        )}
                        {subtitle ? (
                            <div className=" text-xs text-gray-600">{subtitle}</div>
                        ) : (
                            ""
                        )}
                    </div>
                    {closable ? (
                        <button
                            className="btn-modalClose ml-auto"
                            onClick={onClose}
                            aria-label="Close Modal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                            >
                                <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                            </svg>
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
                <div
                    className={`${adjustment ? "" : "p-4"} overflow-y-auto ${modalClass ? modalClass : ""
                        }`}
                >
                    {" "}
                    {/*remove p-4*/}
                    {children}
                </div>
            </div>
            </>
    )
}

export default Modal;