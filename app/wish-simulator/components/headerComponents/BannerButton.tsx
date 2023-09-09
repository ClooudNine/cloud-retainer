const BannerButton = ({isSelected, setBannerCallback}:
                          {isSelected: boolean, setBannerCallback: () => void}) => {
    return (
        <button className={`relative
                            w-1/5
                            h-1/2
                            z-10
                            flex
                            justify-center
                            items-center
                            rounded
                            transition-all
                            hover:scale-110
                            ${isSelected ? "bg-[#f7f3d8] scale-110" : "bg-[#4e6d96]"}
                            `}
                onClick={setBannerCallback}>
            <div className={`h-[90%] w-[95%] overflow-hidden rounded border-2 ${isSelected ? "border-[#f0e6cc]" : "border-[#6b8db9]"}`}></div>
            <div className={`absolute h-[90%] w-[95%]  rounded-full border-2 ${isSelected ? "border-[#f0e6cc]" : "border-[#6b8db9]"}`}></div>
        </button>
    )
}

export default BannerButton