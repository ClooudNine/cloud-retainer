'use client';
import { Banners } from '@/lib/banners';
import Image from 'next/image';
import { getPreviewUrl } from '@/lib/wish-simulator';
import striptags from 'striptags';
import DeleteBannerButton from '@/components/admin/banners/delete-banner-button';
import CharacterBannerForm from '@/components/admin/banners/character-banner-form';
import { Character, CharacterBanner } from '@/lib/db/schema';
import { useState } from 'react';
import PencilIcon from '@/components/icons/pencil';
import { Dialog, DialogContent } from '@/components/ui/dialog';

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
                            <button
                                className={
                                    'bg-gray-200 p-2 rounded-xl transition hover:bg-gray-400'
                                }
                                onClick={() => setEditedBanner(banner)}
                            >
                                <PencilIcon />
                            </button>
                            <DeleteBannerButton id={banner.id} type={banner.type} />
                        </div>
                        <Image
                            src={`/wish-simulator/banners/${getPreviewUrl(banner)}.webp`}
                            alt={banner.title}
                            width={600}
                            height={300}
                            quality={100}
                            className={'w-full rounded-lg'}
                        />
                        <p className={'text-center'}>{`${striptags(banner.title)}-${
                            banner.version
                        }`}</p>
                    </div>
                ))}
            <Dialog open={Boolean(editedBanner)}>
                <DialogContent className={'max-w-none w-[70vw]'}>
                    {editedBanner && (
                        <CharacterBannerForm
                            banner={editedBanner as CharacterBanner}
                            characters={characters}
                            closeEdit={() => setEditedBanner(null)}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default BannersList;
