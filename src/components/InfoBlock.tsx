import Image from "next/image";
import {
  GithubIcon,
  RightArrowIcon,
  StarBadgeIcon,
  DotsGridIcon,
} from "@/components/icons";
import { BLOG_LINKS, HUSTLE_LINKS, SCRIPT_LINKS } from "@/lib/content";
import { cn } from "@/lib/utils";

function ListRow({
  label,
  href,
  external,
  focus,
  withGithub,
}: {
  label: string;
  href: string;
  external?: boolean;
  focus?: boolean;
  withGithub?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "flex items-center justify-between gap-[14px] rounded-md px-[12px] py-[13px] pr-[14px]",
        focus
          ? "bg-[rgba(192,115,162,0.27)]"
          : "bg-[rgba(0,0,0,0.26)] hover:bg-[rgba(192,115,162,0.27)]",
        "transition-colors",
      )}
    >
      <p className="mb-0 text-[14px] max-[1250px]:text-[12px] leading-[1.35] line-clamp-1">
        {label}
      </p>
      <span className="inline-flex shrink-0">
        {withGithub ? (
          <GithubIcon className="h-[22px] w-[22px]" />
        ) : (
          <RightArrowIcon className="h-[15.354px] w-[9.02px]" />
        )}
      </span>
    </a>
  );
}

export function InfoBlock() {
  return (
    <div className="flex flex-col gap-[28px]">
      {/* Side Hustles card */}
      <div className="card-hover-border card-shadow flex flex-col gap-5 rounded-[10px] bg-[#34373c] p-[15px_12px]">
        {/* Card head */}
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between gap-[14px] rounded-md bg-[rgba(31,27,30,0.65)] p-[18px_16px]">
            <div className="flex items-center gap-[12px]">
              <StarBadgeIcon className="h-auto w-[22px]" />
              <p className="mb-0 text-[18px] max-[1199px]:text-[14px] font-medium">
                SIDE HUSTLES
              </p>
            </div>
            <DotsGridIcon className="h-auto w-[20px]" />
          </div>

          {/* Project block */}
          <div className="rhombus-decor-5 flex flex-col gap-[30px] rounded-md bg-[rgba(31,27,30,0.65)] p-[27px_14px_35px]">
            {/* Top: bird (single, centered) */}
            <div className="inline-flex justify-center">
              <a
                href={HUSTLE_LINKS.top.href}
                target={HUSTLE_LINKS.top.external ? "_blank" : undefined}
                rel={HUSTLE_LINKS.top.external ? "noopener noreferrer" : undefined}
                aria-label={HUSTLE_LINKS.top.alt}
                className="btn-dark-round hustle-link flex aspect-square w-[30.416%] items-center justify-center p-[8px]"
              >
                <Image
                  src={HUSTLE_LINKS.top.image}
                  alt={HUSTLE_LINKS.top.alt}
                  width={64}
                  height={64}
                  className="max-w-[95%] transition-transform duration-300 ease-in-out"
                />
              </a>
            </div>

            {/* Bottom: planet + tool */}
            <div className="grid grid-cols-2 place-items-center gap-[15px]">
              <a
                href={HUSTLE_LINKS.bottomLeft.href}
                target={HUSTLE_LINKS.bottomLeft.external ? "_blank" : undefined}
                rel={
                  HUSTLE_LINKS.bottomLeft.external
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={HUSTLE_LINKS.bottomLeft.alt}
                className="btn-dark-round hustle-link flex aspect-square w-[64.513%] items-center justify-center p-[8px]"
              >
                <Image
                  src={HUSTLE_LINKS.bottomLeft.image}
                  alt={HUSTLE_LINKS.bottomLeft.alt}
                  width={96}
                  height={96}
                  className="max-w-[95%] transition-transform duration-300 ease-in-out"
                />
              </a>
              <a
                href={HUSTLE_LINKS.bottomRight.href}
                target={HUSTLE_LINKS.bottomRight.external ? "_blank" : undefined}
                rel={
                  HUSTLE_LINKS.bottomRight.external
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={HUSTLE_LINKS.bottomRight.alt}
                className="btn-dark-round hustle-link flex aspect-square w-[64.513%] items-center justify-center p-[8px]"
              >
                <Image
                  src={HUSTLE_LINKS.bottomRight.image}
                  alt={HUSTLE_LINKS.bottomRight.alt}
                  width={96}
                  height={96}
                  className="max-w-[95%] transition-transform duration-300 ease-in-out"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[5px]">
          {SCRIPT_LINKS.map((l) => (
            <ListRow key={l.label} {...l} />
          ))}
        </div>
      </div>

      {/* Blog list card */}
      <div className="card-hover-border card-shadow rounded-[10px] bg-[#34373c] p-[22px_12px]">
        <div className="flex flex-col gap-[5px]">
          {BLOG_LINKS.map((l) => (
            <ListRow key={l.label} {...l} />
          ))}
        </div>
      </div>
    </div>
  );
}
