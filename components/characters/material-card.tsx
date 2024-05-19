const MaterialCard = ({ icon, title }: { icon: React.ReactNode; title: string }) => {
    return (
        <div
            className={
                'border bg-card shadow p-2 rounded-xl text-center flex flex-col items-center justify-center max-xl:w-[calc(50%-0.5rem)]'
            }
        >
            {icon}
            <p>{title}</p>
        </div>
    );
};

export default MaterialCard;
