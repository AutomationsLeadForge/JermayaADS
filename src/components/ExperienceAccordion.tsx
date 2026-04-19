import Image from "next/image";
import { EXPERIENCE_ABOUT, EXPERIENCE_ITEMS } from "@/lib/content";

export function ExperienceAccordion() {
  return (
    <section className="w-full mb-[14px]">
      <div
        className="card-shadow grid w-full gap-[70px] max-[767px]:gap-5 grid-cols-[0.93fr_1fr] max-[767px]:grid-cols-1 rounded-[10px] bg-[#34373c] p-[24px_18px_40px] max-[767px]:p-[24px_14px]"
      >
        <div>
          <div className="mb-2 text-[14px] font-medium text-[#c073a2]">
            {EXPERIENCE_ABOUT.label}
          </div>
          <p className="text-[20px] font-medium leading-snug mb-[12px]">
            {EXPERIENCE_ABOUT.title}
          </p>
          {EXPERIENCE_ABOUT.paragraphs.map((p) => (
            <p key={p} className="mb-3 text-[14px] leading-[1.7]">
              {p}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-[10px]">
          {EXPERIENCE_ITEMS.map((item) => (
            <div
              key={item.company + item.period}
              className="grid items-center gap-[70px] max-[1199px]:gap-6 grid-cols-[1fr_150px] max-[767px]:grid-cols-1 max-[767px]:gap-2"
            >
              <div className="flex items-center gap-[17px]">
                <div className="aspect-square w-[32px] shrink-0">
                  <Image
                    src={item.logo}
                    alt={item.company}
                    width={64}
                    height={64}
                    className="max-w-full object-cover object-center"
                  />
                </div>
                <p className="mb-0 text-[16px] font-medium">{item.role}</p>
              </div>
              <div>
                <p className="mb-1 text-[12px] text-white/65">{item.company}</p>
                <p className="mb-0 text-[12px] text-white/65">{item.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
