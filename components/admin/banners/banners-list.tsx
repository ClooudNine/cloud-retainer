'use client';
import { Banners } from '@/lib/banners';
import Image from 'next/image';
import { getPreviewUrl } from '@/app/wish-simulator/utils';
import striptags from 'striptags';
import DeleteBannerButton from '@/components/admin/banners/delete-banner-button';
import CharacterBannerForm from '@/components/admin/banners/character-banner-form';
import { Character, Weapon } from '@/lib/db/schema';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import PencilIcon from '@/components/icons/pencil';

const BannersList = ({
    banners,
    characters,
}: {
    banners: Banners[];
    characters: Character[];
}) => {
    const [editedBanner, setEditedBanner] = useState<Banners | null>(null);

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
                            <Button onClick={() => setEditedBanner(banner)}>
                                <PencilIcon />
                            </Button>
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
            {editedBanner && 'rerunNumber' in editedBanner && (
                <CharacterBannerForm banner={editedBanner} characters={characters} />
            )}
        </div>
    );
};

export default BannersList;
