'use client';
import Image from 'next/image';
import { getPreviewUrl } from '@/lib/wish-simulator';
import striptags from 'striptags';
import DeleteBannerButton from '@/components/admin/banners/delete-banner-button';
import { useState } from 'react';
import ConfirmBannerDelete from '@/components/admin/banners/confirm-banner-delete';
import EditBannerButton from '@/components/admin/banners/edit-banner-button';
import EditBannerModal from '@/components/admin/banners/edit-banner-modal';
import { Banners, Character } from '@/lib/types';

const BannersList = ({
    banners,
    characters,
}: {
    banners: Banners[];
    characters: Character[];
}) => {
    const [deletedBanner, setDeletedBanner] = useState<Banners | null>(null);
    const [editedBanner, setEditedBanner] = useState<Banners | null>(null);

    return (
        <div
            className={
                'mt-2 flex flex-wrap gap-4 items-center justify-center genshin-scrollbar overflow-y-scroll'
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
                        className={'group relative w-[30%] bg-gray-200 rounded-lg'}
                    >
                        <div
                            className={
                                'absolute flex opacity-0 flex-col gap-1 top-1 right-1 transition group-hover:opacity-100'
                            }
                        >
                            <EditBannerButton setBanner={() => setEditedBanner(banner)} />
                            <DeleteBannerButton
                                setBanner={() => setDeletedBanner(banner)}
                            />
                        </div>
                        <Image
                            src={`wish-simulator/banners/${getPreviewUrl(banner)}.webp`}
                            alt={banner.title}
                            width={600}
                            height={300}
                            className={'w-full rounded-lg'}
                        />
                        <p className={'text-center'}>{`${striptags(banner.title)}-${
                            banner.version
                        }`}</p>
                    </div>
                ))}
            <ConfirmBannerDelete
                banner={deletedBanner}
                closeModal={() => setDeletedBanner(null)}
            />
            <EditBannerModal
                banner={editedBanner}
                characters={characters}
                closeModal={() => setEditedBanner(null)}
            />
        </div>
    );
};

export default BannersList;
