import NavigationButton from '@/components/wish-simulator/details/navigation-button';

import { BannerTypes } from '@/lib/types';

const Navigation = ({ bannerType }: { bannerType: BannerTypes }) => {
    const sections: {
        [key in 'increased-chance' | 'more-info' | 'items-list']?: string;
    } = {
        'increased-chance': 'Повышенный шанс',
        'more-info': 'Подробности',
        'items-list': 'Список предметов',
    };

    if (bannerType === 'Standard Wish' || bannerType === 'Novice Wish') {
        delete sections['increased-chance'];
    }

    return (
        <nav
            className={
                'absolute bg-[radial-gradient(circle,rgba(232,223,207,1)_90%,rgba(232,223,207,0.1)_100%)] text-[#595252] text-lg w-[85%] h-[4%] top-[11%] left-[9%] xs:h-[7%] xs:top-[13%] xs:left-[7%]'
            }
        >
            <div
                className={
                    'w-full h-full flex justify-between items-center border-y border-y-[#ede5d7]'
                }
            >
                {Object.entries(sections).map((section) => (
                    <NavigationButton
                        key={section[0]}
                        title={section[1]}
                        param={
                            section[0] as 'increased-chance' | 'more-info' | 'items-list'
                        }
                    />
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
