import NavigationButton from '@/app/wish-simulator/details/components/NavigationButton';
import { DetailsSections } from '@/app/wish-simulator/details/page';
import { BannerTypes } from '@/lib/db/schema';

const Navigation = ({ bannerType }: { bannerType: BannerTypes }) => {
    const sections: { [key in DetailsSections]?: string } = {
        'increased-chance': 'Повышенный шанс',
        'more-info': 'Подробности',
        'items-list': 'Список предметов',
    };

    if (bannerType === 'Standard Wish') {
        delete sections['increased-chance'];
    }

    return (
        <nav
            className={
                'absolute bg-[radial-gradient(circle,rgba(232,223,207,1)_90%,rgba(232,223,207,0.1)_100%)] text-[#595252] text-[2.5cqw] w-[85%] h-[4%] top-[11%] left-[9%] sm:h-[7.5%] sm:w-4/5 sm:top-[12%] sm:text-[1.7cqw]'
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
                        param={section[0] as DetailsSections}
                    />
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
