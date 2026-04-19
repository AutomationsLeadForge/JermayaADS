import { FOOTER_COPY } from "@/lib/content";

export function Footer() {
  return (
    <footer className="flex w-full py-[15px_5px] items-center">
      <span
        aria-hidden="true"
        className="mx-auto my-auto mr-[10px] flex-1 border-b-[5px] border-[rgba(0,0,0,0.18)]"
      />
      <p className="mb-0 text-center text-[14px] max-[1199px]:text-[12px]">
        {FOOTER_COPY}
      </p>
      <span
        aria-hidden="true"
        className="mx-auto my-auto ml-[10px] flex-1 border-b-[5px] border-[rgba(0,0,0,0.18)]"
      />
    </footer>
  );
}
