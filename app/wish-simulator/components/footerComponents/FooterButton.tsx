const FooterButton = ({title} : {title: string}) => {
    return (
        <button className={"font-genshin " +
            "cursor-genshin " +
            "w-1/4 " +
            "min-w-min " +
            "h-3/4 " +
            "text-[#3f4658] " +
            "text-base " +
            "bg-[#e2ded5] " +
            "rounded-full " +
            "transition-all " +
            "hover:shadow-[0_0_0_2px_rgba(34,60,80,0.1)_inset] " +
            "hover:ring " +
            "hover:ring-[#ffffff] " +
            "active:text-[#ffffff] " +
            "active:bg-[#d2d0c1] " +
            "active:shadow-none " +
            "active:ring " +
            "active:ring-[#8798a7] " +
            "sm:text-xs " +
            "md:text-lg " +
            "lg:text-lg "}>{title}</button>
    )
}

export default FooterButton