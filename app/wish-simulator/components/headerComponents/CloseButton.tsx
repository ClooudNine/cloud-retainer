const CloseButton = () => {
  return (
    <button
      aria-label={"Все баннеры"}
      className={
        "col-start-12 mr-6 w-8 h-8 sm:mr-0 lg:w-12 lg:h-12 place-self-center rounded-full transition-all bg-[#ede6d6] ring-[6px] ring-[rgba(237,230,214,0.5)] cursor-genshin hover:ring-[#fcfdff] hover:ring-4 hover:drop-shadow-[0_0_5px_rgba(255,255,255,1)] active:ring-[#7a8ca4] active:ring-4 active:bg-[#c8c4bb]"
      }
    >
      <svg
        className={"group h-4/5 mx-auto"}
        transform="rotate(45)"
        fill="#000000"
        stroke="#000000"
        strokeWidth="0.00016"
        version="1.1"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          className={"group-active:fill-[#fefeff]"}
          d="m16 8-3-3v2h-4v-4h2l-3-3-3 3h2v4h-4v-2l-3 3 3 3v-2h4v4h-2l3 3 3-3h-2v-4h4v2z"
          fill="#444"
        />
      </svg>
    </button>
  );
};
export default CloseButton;
