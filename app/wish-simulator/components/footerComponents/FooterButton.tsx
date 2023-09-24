const FooterButton = ({title} : {title: string}) => {
    return (
        <button className={`font-genshin
             cursor-genshin
             max-w-[150px]
             max-h-20
             min-w-min
             w-4/5
             h-1/3
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
             md:w-full
             md:h-[90%]
             md:text-lg
             lg:text-xl`}>{title}</button>
    )
}

export default FooterButton