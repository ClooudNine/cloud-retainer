const FooterButton = ({ title }: { title: string }) => {
  return (
    <button
      className={`font-genshin
         cursor-genshin
         w-4/5
         h-1/3
         min-w-max
         text-[#3f4658]
         text-base
         bg-[#e2ded5]
         rounded-full
         transition-all
         hover:shadow-[0_0_0_2px_rgba(34,60,80,0.1)_inset]
         hover:ring
         hover:ring-[#ffffff]
         active:text-[#ffffff]
         active:bg-[#d2d0c1]
         active:shadow-none
         active:ring
         active:ring-[#8798a7]
         md:w-[25%]
         md:h-[80%]
         md:text-lg
         lg:text-xl`}
    >
      {title}
    </button>
  );
};

export default FooterButton;
