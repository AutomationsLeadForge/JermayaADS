import { cn } from "@/lib/utils";
import { HomeIcon } from "@/components/icons";
import { NAV_LINKS } from "@/lib/content";

export function FloatingNav() {
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-[60px] z-[1050] flex justify-center"
    >
      <div
        className="btn-group inline-flex overflow-hidden rounded-md"
        style={{ border: "1px solid #949494" }}
      >
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            aria-current={link.active ? "page" : undefined}
            className={cn(
              "inline-flex items-center justify-center px-4 py-3 min-w-[62px] text-[14px] transition-colors max-[767px]:px-[14px]",
              i > 0 && "border-l border-[#949494]",
              link.active
                ? "bg-[#282d31] text-white"
                : "bg-[#252a2e] text-white/75 hover:bg-[#282d31] hover:text-white",
            )}
          >
            {link.icon === "home" ? (
              <HomeIcon className="h-[18px] w-[18px]" />
            ) : (
              link.label
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
