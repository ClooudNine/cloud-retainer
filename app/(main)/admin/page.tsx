import Link from 'next/link';

export default function AdminPage() {
    return (
        <section>
            Here Is Admin Page!
            <nav>
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
