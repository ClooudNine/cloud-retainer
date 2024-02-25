'use client';
import FooterLink from '@/components/wish-simulator/footer-link';
import { useBannerContext } from '@/app/wish-simulator/banner-provider';
import { getBannerStatName } from '@/lib/wish-simulator';

const Links = () => {
    const { selectedBanner } = useBannerContext();
    return (
        <div
            className={
                'flex justify-center flex-col gap-y-4 gap-x-2 xs:max-lg:flex-wrap xs:flex-row'
            }
        >
            <FooterLink
                title={'Магазин'}
                link={'shop/paimon-bargain'}
                sfxEffect={'click-5'}
            />
            <FooterLink
                title={'Детали'}
                link={`details?id=${selectedBanner.id}&type=${
                    selectedBanner.type
                }&section=${
                    selectedBanner.type === 'Standard Wish' ||
                    selectedBanner.type === 'Novice Wish'
                        ? 'more-info'
                        : 'increased-chance'
                }`}
                sfxEffect={'click-4'}
            />
            <FooterLink
                title={'История'}
                link={`history?type=${getBannerStatName(selectedBanner.type)}`}
                sfxEffect={'click-4'}
            />
        </div>
    );
};
export default Links;
