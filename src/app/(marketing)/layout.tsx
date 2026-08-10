import { AnnouncementBar } from "@/components/marketing/announcement-bar";
import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main style={{ paddingTop: "var(--promo-h, 0px)" }}>{children}</main>
      <Footer />
      <div
        aria-hidden
        className="film-grain pointer-events-none fixed inset-0 z-[100]"
      />
    </>
  );
}
