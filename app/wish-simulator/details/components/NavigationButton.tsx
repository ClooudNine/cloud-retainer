import Image from "next/image";
import detailsButton from "@/public/wish-simulator/assets/details-button.webp";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import classNames from "classnames";

const NavigationButton = ({
  title,
  param,
}: {
  title: string;
  param: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectSection = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set("section", param);
    router.replace(pathname + "?" + params.toString());
  }, [param, pathname, router, searchParams]);
  const buttonClasses = classNames(
    "h-full px-4 flex-1 flex justify-center items-center",
    {
      "text-white": searchParams.get("section") === param,
    },
  );
  const backgroundButtonClasses = classNames("absolute h-[97%] w-auto", {
    hidden: searchParams.get("section") !== param,
  });
  return (
    <button className={buttonClasses} onClick={selectSection}>
      <Image
        src={detailsButton}
        alt={title}
        className={backgroundButtonClasses}
      />
      <p className={"z-10"}>{title}</p>
    </button>
  );
};
export default NavigationButton;
