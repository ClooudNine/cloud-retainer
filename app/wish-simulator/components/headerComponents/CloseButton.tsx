const CloseButton = () => {
  return (
    <button
      aria-label={"Все баннеры"}
      className={`col-start-12 mr-6 w-8 h-8 sm:mr-0 lg:w-12 lg:h-12 place-self-center flex items-center justify-center rounded-full transition-all bg-[#ede6d6] ring-[6px] ring-[rgba(237,230,214,0.5)] cursor-genshin hover:ring-[#fcfdff] hover:ring-4 hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)] active:ring-[#7a8ca4] active:ring-4 active:bg-[#c8c4bb]`}
    >
      <svg
        className={"h-4/5 group"}
        viewBox="0 0 16 16"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        fill="#000000"
        stroke="#000000"
        strokeWidth="0.00016"
        transform="rotate(45)"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            className={"group-active:fill-[#fefeff]"}
            fill="#444"
            d="M16 8l-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z"
          ></path>
        </g>
      </svg>
    </button>
  );
};
export default CloseButton;
