import Link from 'next/link';

export default function AdminPage() {
    return (
        <section className={'flex-1'}>
            <h1 className={'w-full text-white mt-2 py-2 text-center bg-black rounded-xl'}>
                Панель администратора
            </h1>
            <nav className={'mt-2 ml-2'}>
                <Link
                    href={'/admin/banners'}
                    className={
                        'bg-gray-200 py-1 px-4 rounded-xl transition duration-500 hover:bg-black hover:text-white'
                    }
                >
                    Баннеры
                </Link>
            </nav>
        </section>
    );
}
