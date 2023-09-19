const CloseButton = () => {
    return (
        <button className={"col-start-12 mr-4 row-start-1 w-8 h-8 md:w-14 md:h-14 place-self-center flex items-center justify-center rounded-full bg-[#e2e2e0] ring-[6px] ring-[#b1bcc3]"}>
            <svg className={"h-3/4"}
                 viewBox="0 0 16 16"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink"
                 fill="#000000"
                 stroke="#000000"
                 strokeWidth="0.00016"
                 transform="rotate(45)">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path fill="#444" d="M16 8l-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z"></path>
                </g>
            </svg>
        </button>
    )
}
export default CloseButton;