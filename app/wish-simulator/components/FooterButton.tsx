const FooterButton = ({title} : {title: string}) => {
    return (
        <button className={"font-genshin w-40 h-10 text-[#3f4658] text-xl bg-[#e2ded5] rounded-full transition-all duration-100 hover:border-4 border-[#ffffff]"}>{title}</button>
    )
}

export default FooterButton