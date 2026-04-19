import Image from "next/image";
import { CONTACT_TILES } from "@/lib/content";

export function ContactTiles() {
  return (
    <div className="card-hover-border card-shadow grid w-full grid-cols-3 gap-4 rounded-[10px] bg-[#34373c] p-[20px_18px] max-[767px]:p-[20px_12px]">
      {CONTACT_TILES.map((tile) => (
        <div key={tile.id} className="tile-starred">
          <a
            href={tile.href}
            target={tile.external ? "_blank" : undefined}
            rel={tile.external ? "noopener noreferrer" : undefined}
            aria-label={tile.label}
            className="btn-dark-round flex aspect-square w-[71.153%] items-center justify-center p-0"
          >
            <Image
              src={tile.image}
              alt={tile.label}
              width={60}
              height={60}
              className="aspect-square w-[36.263%]"
            />
          </a>
        </div>
      ))}
    </div>
  );
}
