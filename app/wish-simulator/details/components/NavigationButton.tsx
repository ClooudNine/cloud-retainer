import Image from "next/image";
import detailsButton from "@/public/wish-simulator/assets/details-button.webp";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import clsx from "clsx";

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
  const buttonClasses = clsx(
    "max-md:relative group h-full px-4 flex-1 flex justify-center items-center hover:text-white",
    {
      "text-white": searchParams.get("section") === param,
    },
  );
  const backgroundButtonClasses = clsx("absolute h-full w-auto", {
    "hidden group-hover:block group-hover:brightness-110":
      searchParams.get("section") !== param,
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
