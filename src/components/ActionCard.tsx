import { ContactTiles } from "@/components/ContactTiles";
import { PortfolioSlider } from "@/components/PortfolioSlider";
import { ServicesBlock } from "@/components/ServicesBlock";

export function ActionCard() {
  return (
    <div className="flex flex-col gap-5">
      <ContactTiles />
      <PortfolioSlider />
      <ServicesBlock />
    </div>
  );
}
