import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { menuCategories } from "@/data/menuData";
import type { MenuItem } from "@/data/menuData";
import photo2Asset from "@/assets/photo-2.png.asset.json";
import photo3Asset from "@/assets/photo-3.png.asset.json";
import photo4Asset from "@/assets/photo-4.mp4.asset.json";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/* Set to false to instantly reverse the background-blending effect */
const BLEND_IMAGES = true;

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  return (
    <section id="menu" className="relative py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="font-body text-[11px] uppercase tracking-[0.4em] text-muted-foreground">
            Для вас
          </span>
          <h2 className="font-display-black text-foreground text-4xl md:text-6xl lg:text-7xl uppercase mt-4 leading-[0.9]">
            Оберіть своє задоволення
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto font-light text-sm mt-6">
            Роздрібне меню. Для B2B співпраці — напишіть нам в Instagram.
          </p>
        </motion.div>

        {/* Category text links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-16 border-y border-border py-5">
          {menuCategories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(i)}
              className={`font-body text-[11px] uppercase tracking-[0.3em] transition-all ${
                activeCategory === i
                  ? "text-foreground border-b border-foreground pb-1"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
          >
            {menuCategories[activeCategory].items.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedItem(item)}
                className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
              >
                <div className={`aspect-square overflow-hidden mb-4 flex items-center justify-center p-4 ${BLEND_IMAGES ? "product-image-blend" : "bg-secondary"}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-[1.04] transition-transform duration-[900ms]"
                  />
                </div>
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="font-display-black text-foreground text-sm uppercase leading-tight">
                    {item.name}
                  </h3>
                  <span className="font-body text-xs text-foreground whitespace-nowrap pt-0.5">
                    {item.price}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed font-light mb-2">
                  {item.description}
                </p>
                <span className="text-[10px] text-muted-foreground/70 font-body uppercase tracking-[0.2em]">
                  {item.weight}
                </span>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="max-w-sm sm:max-w-md max-h-[90vh] overflow-y-auto p-0 gap-0">
          {selectedItem && (
            <>
              {/* Instagram-style full-size image carousel */}
              <div className="relative w-full overflow-hidden">
                <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {/* Main product image — first slide */}
                  <div className={`w-full aspect-square flex-shrink-0 snap-start flex items-center justify-center p-4 ${BLEND_IMAGES ? "product-image-blend" : "bg-secondary"}`}>
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Variation placeholders — same full size */}
                  {[1, 2, 3].map((i) => {
                    const photoNum = i + 1;
                    if (photoNum === 4) {
                      return (
                        <div
                          key={i}
                          className={`w-full aspect-square flex-shrink-0 snap-start flex items-center justify-center p-4 ${BLEND_IMAGES ? "product-image-blend" : "bg-secondary"}`}
                        >
                          <video
                            src={photo4Asset.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-contain"
                          />
                        </div>
                      );
                    }
                    if (photoNum === 2 || photoNum === 3) {
                      const src = photoNum === 2 ? photo2Asset.url : photo3Asset.url;
                      return (
                        <div
                          key={i}
                          className={`w-full aspect-square flex-shrink-0 snap-start flex items-center justify-center p-4 ${BLEND_IMAGES ? "product-image-blend" : "bg-secondary"}`}
                        >
                          <img
                            src={src}
                            alt={`${selectedItem.name} — фото ${photoNum}`}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      );
                    }
                    return (
                      <div
                        key={i}
                        className={`w-full aspect-square flex-shrink-0 snap-start flex items-center justify-center text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60 font-body ${BLEND_IMAGES ? "product-image-blend" : "bg-secondary"}`}
                      >
                        Photo {photoNum}
                      </div>
                    );
                  })}
                </div>
                {/* Scroll indicator dots */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  ))}
                </div>
              </div>

              <div className="p-5 space-y-4">
                <DialogHeader className="space-y-1.5">
                  <DialogTitle className="font-display-black text-foreground text-base sm:text-lg uppercase leading-tight text-center">
                    {selectedItem.name}
                  </DialogTitle>
                  <DialogDescription className="font-body text-xs text-muted-foreground font-light leading-relaxed text-center">
                    {selectedItem.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 border-t border-border pt-4">
                  <div>
                    <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Склад та алергени
                    </span>
                    <p className="font-body text-xs text-foreground font-light leading-relaxed mt-1.5">
                      {selectedItem.ingredients ??
                        "Інформація уточнюється. Зверніться до нас в Instagram для уточнення складу та алергенів."}
                    </p>
                  </div>

                  <div>
                    <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      Умови зберігання
                    </span>
                    <p className="font-body text-xs text-foreground font-light leading-relaxed mt-1.5">
                      {selectedItem.storage ??
                        "Інформація уточнюється. Зверніться до нас в Instagram для уточнення."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <div>
                      <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        Вага
                      </span>
                      <p className="font-display-black text-foreground text-sm mt-1">
                        {selectedItem.weight}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-body text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                        Ціна
                      </span>
                      <p className="font-display-black text-foreground text-sm mt-1">
                        {selectedItem.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default MenuSection;
