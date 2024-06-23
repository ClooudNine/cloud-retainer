const MaterialCard = ({ icon, title, width }: { icon: React.ReactNode; title: string; width: string }) => {
    return (
        <div className={`${width} border bg-card shadow p-2 rounded-xl text-center`}>
            {icon}
            <p className={'truncate'}>{title}</p>
        </div>
    );
};

export default MaterialCard;
