

const FooterSection = () => {
  return (
    <footer className="py-16 bg-foreground text-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <span className="font-display-black text-background text-2xl md:text-3xl uppercase leading-none">
            PEREMOGA
          </span>
          <span className="font-display-black text-background text-2xl md:text-3xl uppercase leading-none">
            BAKERY
          </span>
          <p className="text-[11px] font-body uppercase tracking-[0.4em] text-background/50 mt-3 mb-10">
            Kyiv · з 2021
          </p>

          <div className="flex items-center gap-8 mb-10">
            <a
              href="https://www.tiktok.com/@peremogabakery"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-background transition-colors text-[11px] font-body uppercase tracking-[0.3em]"
            >
              TikTok
            </a>
            <a
              href="https://maps.app.goo.gl/QyoiGuZsLpDQeFmB9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 hover:text-background transition-colors text-[11px] font-body uppercase tracking-[0.3em]"
            >
              Maps
            </a>
          </div>

          <div className="h-px w-16 bg-background/20 mb-6" />

          <p className="text-[11px] text-background/40 font-body uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Peremoga Bakery
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
