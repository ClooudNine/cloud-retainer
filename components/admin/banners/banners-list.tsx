import { Banners } from '@/lib/banners';
import Image from 'next/image';
import { getPreviewUrl } from '@/app/wish-simulator/utils';
import striptags from 'striptags';
import EditBannerButton from '@/components/admin/banners/edit-banner-button';
import DeleteBannerButton from '@/components/admin/banners/delete-banner-button';

const BannersList = ({ banners }: { banners: Banners[] }) => {
    return (
        <div
            className={
                'mt-2 flex h-[92%] flex-wrap gap-4 items-center justify-center genshin-scrollbar overflow-y-scroll'
            }
        >
            {banners
                .sort(
                    (firstBanner, secondBanner) =>
                        secondBanner.version - firstBanner.version
                )
                .map((banner) => (
                    <div
                        key={`${banner.title}-${banner.id}`}
                        className={'group relative w-[30%] bg-gray-200 rounded-xl'}
                    >
                        <div
                            className={
                                'absolute flex opacity-0 flex-col gap-1 top-1 right-1 transition group-hover:opacity-100'
                            }
                        >
                            <EditBannerButton />
                            <DeleteBannerButton id={banner.id} type={banner.type} />
                        </div>
                        <Image
                            src={`/wish-simulator/banners/${getPreviewUrl(banner)}.webp`}
                            alt={banner.title}
                            width={800}
                            height={450}
                            quality={100}
                            className={'w-full rounded-xl'}
                        />
                        <p className={'text-center'}>{`${striptags(banner.title)}-${
                            banner.version
                        }`}</p>
                    </div>
                ))}
        </div>
    );
};

export default BannersList;
