import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import b2bSupreme from "@/assets/b2b-supreme-croissants.jpeg";
import b2bCake from "@/assets/b2b-cake.jpeg";
import b2bEclairs from "@/assets/b2b-eclairs.jpeg";
import b2bTubes from "@/assets/b2b-tubes.jpeg";
import strawberryPavlova from "@/assets/strawberry-pavlova.jpeg.asset.json";
import strawberryEclair from "@/assets/strawberry-eclair.jpeg.asset.json";
import strawberryCheesecake from "@/assets/strawberry-cheesecake.jpeg.asset.json";
import { supabase } from "@/integrations/supabase/client";


type Corner = "nw" | "ne" | "sw" | "se";
type Viewport = "mobile" | "tablet" | "desktop";

const getViewport = (): Viewport => {
  if (typeof window === "undefined") return "desktop";
  const w = window.innerWidth;
  if (w < 768) return "mobile";
  if (w < 1024) return "tablet";
  return "desktop";
};

const useViewport = (): Viewport => {
  const [vp, setVp] = useState<Viewport>(getViewport);
  useEffect(() => {
    const onResize = () => setVp(getViewport());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return vp;
};

interface DraggableResizableImageProps {
  id: string;
  viewport: Viewport;
  src: string;
  alt: string;
  /** Initial absolute position classes, e.g. "left-0 top-0" */
  position: string;
  /** Initial pixel size (square). */
  initialSize: number;
  /** Pastel offset block tailwind class, e.g. "bg-pastel-peach" */
  offsetColor: string;
  /** Where the pastel offset sits: which two edges to attach to. */
  offsetCorner?: Corner;
  delay?: number;
}

const offsetClassMap: Record<Corner, string> = {
  nw: "-top-2 -left-2 md:-top-3 md:-left-3",
  ne: "-top-2 -right-2 md:-top-3 md:-right-3",
  sw: "-bottom-2 -left-2 md:-bottom-3 md:-left-3",
  se: "-bottom-2 -right-2 md:-bottom-3 md:-right-3",
};

type SavedState = { x: number; y: number; size: number };

// Hardcoded fallback layout used until cloud values load.
const desktopDefaults: Record<string, SavedState> = {
  supreme: { x: 57.57, y: 35.51, size: 270.04 },
  eclairs: { x: -93.05, y: 0.29, size: 146.67 },
  tubes: { x: -113.39, y: 48.11, size: 200.75 },
  pavlova: { x: 112.86, y: 113.2, size: 181.33 },
  "strawberry-eclair": { x: -85.63, y: 63.61, size: 174.62 },
  cheesecake: { x: 429.57, y: -10.63, size: 120 },
  cake: { x: -361.83, y: -37.49, size: 192.8 },
};

// ====== Cloud-backed layout store (shared across all visitors) ======

type LayoutMap = Record<string, SavedState>;
type LayoutsByViewport = Record<Viewport, LayoutMap>;

const LayoutContext = createContext<LayoutsByViewport>({
  mobile: {},
  tablet: {},
  desktop: {},
});

const useLayoutsProvider = (): LayoutsByViewport => {
  const [layouts, setLayouts] = useState<LayoutsByViewport>({
    mobile: {},
    tablet: {},
    desktop: { ...desktopDefaults },
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("hero_image_layouts")
        .select("viewport, image_id, x, y, size");
      if (cancelled || !data) return;
      const next: LayoutsByViewport = {
        mobile: {},
        tablet: {},
        desktop: { ...desktopDefaults },
      };
      for (const row of data) {
        const vp = row.viewport as Viewport;
        if (vp !== "mobile" && vp !== "tablet" && vp !== "desktop") continue;
        next[vp][row.image_id] = { x: row.x, y: row.y, size: row.size };
      }
      setLayouts(next);
    })();

    const channel = supabase
      .channel("hero_image_layouts_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "hero_image_layouts" },
        (payload) => {
          const row = (payload.new ?? payload.old) as {
            viewport: string;
            image_id: string;
            x: number;
            y: number;
            size: number;
          };
          const vp = row.viewport as Viewport;
          if (vp !== "mobile" && vp !== "tablet" && vp !== "desktop") return;
          setLayouts((prev) => ({
            ...prev,
            [vp]: {
              ...prev[vp],
              [row.image_id]: { x: row.x, y: row.y, size: row.size },
            },
          }));
        }
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return layouts;
};

const saveStateCloud = async (id: string, viewport: Viewport, state: SavedState) => {
  await supabase.from("hero_image_layouts").upsert(
    {
      image_id: id,
      viewport,
      x: state.x,
      y: state.y,
      size: state.size,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "viewport,image_id" }
  );
};

const DraggableResizableImageInner = ({
  id,
  viewport,
  src,
  alt,
  position,
  initialSize,
  offsetColor,
  offsetCorner = "sw",
  delay = 0,
}: DraggableResizableImageProps) => {
  const layouts = useContext(LayoutContext);
  const saved = layouts[viewport]?.[id] ?? null;
  const [size, setSize] = useState(saved?.size ?? initialSize);
  const offsetRef = useRef({ x: saved?.x ?? 0, y: saved?.y ?? 0 });
  const resizingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0, size: initialSize, corner: "se" as Corner });

  const persist = (patch: Partial<SavedState>) => {
    const next: SavedState = {
      x: offsetRef.current.x,
      y: offsetRef.current.y,
      size,
      ...patch,
    };
    void saveStateCloud(id, viewport, next);
  };

  const onResizePointerDown = (e: React.PointerEvent, corner: Corner) => {
    e.stopPropagation();
    e.preventDefault();
    resizingRef.current = true;
    startRef.current = { x: e.clientX, y: e.clientY, size, corner };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onResizePointerMove = (e: React.PointerEvent) => {
    if (!resizingRef.current) return;
    const { x, y, size: s, corner } = startRef.current;
    const dx = e.clientX - x;
    const dy = e.clientY - y;
    const signX = corner.includes("e") ? 1 : -1;
    const signY = corner.includes("s") ? 1 : -1;
    const delta = (dx * signX + dy * signY) / 2;
    const next = Math.max(60, Math.min(520, s + delta));
    setSize(next);
  };

  const onResizePointerUp = (e: React.PointerEvent) => {
    if (!resizingRef.current) return;
    resizingRef.current = false;
    persist({ size });
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const handles: { corner: Corner; cursor: string; pos: string }[] = [
    { corner: "nw", cursor: "cursor-nwse-resize", pos: "-top-1.5 -left-1.5" },
    { corner: "ne", cursor: "cursor-nesw-resize", pos: "-top-1.5 -right-1.5" },
    { corner: "sw", cursor: "cursor-nesw-resize", pos: "-bottom-1.5 -left-1.5" },
    { corner: "se", cursor: "cursor-nwse-resize", pos: "-bottom-1.5 -right-1.5" },
  ];

  return (
    <motion.div
      drag
      dragMomentum={false}
      whileDrag={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 24, x: offsetRef.current.x }}
      animate={{ opacity: 1, y: offsetRef.current.y, x: offsetRef.current.x }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      onDragEnd={(_, info) => {
        offsetRef.current = {
          x: offsetRef.current.x + info.offset.x,
          y: offsetRef.current.y + info.offset.y,
        };
        persist({});
      }}
      className={`absolute ${position} group touch-none`}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full">
        <div className={`absolute w-full h-full ${offsetColor} ${offsetClassMap[offsetCorner]}`} />
        <img
          src={src}
          alt={alt}
          className="relative w-full h-full object-cover select-none pointer-events-none"
          draggable={false}
          loading="eager"
        />
        {handles.map((h) => (
          <div
            key={h.corner}
            onPointerDown={(e) => onResizePointerDown(e, h.corner)}
            onPointerMove={onResizePointerMove}
            onPointerUp={onResizePointerUp}
            onPointerCancel={onResizePointerUp}
            className={`absolute ${h.pos} w-3 h-3 bg-foreground border border-background ${h.cursor} opacity-0 group-hover:opacity-100 transition-opacity z-20`}
          />
        ))}
      </div>
    </motion.div>
  );
};


// Remount per viewport and when cloud layout for this image changes.
const DraggableResizableImage = (props: DraggableResizableImageProps) => {
  const layouts = useContext(LayoutContext);
  const saved = layouts[props.viewport]?.[props.id];
  const layoutKey = saved ? `${saved.x.toFixed(2)}:${saved.y.toFixed(2)}:${saved.size.toFixed(2)}` : "init";
  return <DraggableResizableImageInner key={`${props.viewport}:${layoutKey}`} {...props} />;
};


// Editorial collage hero — Dominique Ansel inspired.
// Huge wordmark center; product photos float on white with pastel offset blocks.
const HeroSection = () => {
  const viewport = useViewport();
  const layouts = useLayoutsProvider();
  return (
    <LayoutContext.Provider value={layouts}>
    <header
      className="relative bg-background pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden"
      role="banner"
    >
      <div className="container mx-auto px-6">
        <div className="relative min-h-[560px] md:min-h-[680px] lg:min-h-[760px]">
          <DraggableResizableImage
            id="supreme"
            viewport={viewport}
            src={b2bSupreme}
            alt="Круасан Supreme Peremoga Bakery"
            position="left-0 top-0"
            initialSize={120}
            offsetColor="bg-pastel-peach"
            offsetCorner="sw"
          />

          <DraggableResizableImage
            id="eclairs"
            viewport={viewport}
            src={b2bEclairs}
            alt="Еклер ремісничої пекарні Перемога"
            position="left-1/2 -translate-x-1/2 top-[4%]"
            initialSize={100}
            offsetColor="bg-pastel-lavender"
            offsetCorner="se"
            delay={0.08}
          />

          <DraggableResizableImage
            id="tubes"
            viewport={viewport}
            src={b2bTubes}
            alt="Авторські десерти Peremoga Bakery"
            position="right-0 top-0"
            initialSize={120}
            offsetColor="bg-pastel-lime"
            offsetCorner="ne"
            delay={0.15}
          />

          <DraggableResizableImage
            id="pavlova"
            viewport={viewport}
            src={strawberryPavlova.url}
            alt="Полунична павлова Peremoga Bakery"
            position="left-0 top-[42%]"
            initialSize={100}
            offsetColor="bg-pastel-blue"
            offsetCorner="sw"
            delay={0.22}
          />

          <DraggableResizableImage
            id="strawberry-eclair"
            viewport={viewport}
            src={strawberryEclair.url}
            alt="Полуничний еклер Peremoga Bakery"
            position="right-0 top-[42%]"
            initialSize={100}
            offsetColor="bg-pastel-peach"
            offsetCorner="ne"
            delay={0.28}
          />

          <DraggableResizableImage
            id="cheesecake"
            viewport={viewport}
            src={strawberryCheesecake.url}
            alt="Полуничний чізкейк Peremoga Bakery"
            position="left-0 bottom-0"
            initialSize={120}
            offsetColor="bg-pastel-lavender"
            offsetCorner="se"
            delay={0.35}
          />

          <DraggableResizableImage
            id="cake"
            viewport={viewport}
            src={b2bCake}
            alt="Авторський торт Peremoga Bakery"
            position="right-0 bottom-0"
            initialSize={120}
            offsetColor="bg-pastel-blue"
            offsetCorner="sw"
            delay={0.42}
          />


          {/* Center wordmark */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[560px] md:min-h-[680px] lg:min-h-[760px] pointer-events-none text-[#a4b8cc]">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-body text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#A4B8CC] mb-4"
            >
              &nbsp;&nbsp;
              <br />
              KYIV · 2021
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
              className="font-display-black text-[#A4B8CC] leading-[0.85] text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[10rem] xl:text-[12rem]"
            >
              <span className="block">PEREMOGA</span>
              <span className="block">BAKERY</span>
            </motion.h1>
          </div>
        </div>

        



        {/* Sticky floating CTA bar — bottom of viewport, Dominique Ansel style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05 }}
          className="fixed bottom-5 md:bottom-6 left-0 right-0 z-40 flex items-center justify-center pointer-events-none"
        >
          <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-3 md:gap-4 bg-background/80 backdrop-blur-md border border-border rounded-full px-4 py-3 md:px-6 md:py-3.5 shadow-lg">
          {[
            { to: "/clients", label: "АВТОРСЬКІ ВИРОБИ" },
            { to: "/b2b", label: "HORECA (B2B)" },
            { to: "/standard-line", label: "СТАНДАРТИЗОВАНА ЛІНІЙКА" },
          ].map((cta) => (
            <Link
              key={cta.to}
              to={cta.to}
              className="font-body text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-white bg-foreground rounded-full px-5 py-2.5 md:px-6 md:py-3 hover:bg-foreground/85 transition-colors duration-200"
            >
              {cta.label}
            </Link>
          ))}
          </div>
        </motion.div>
      </div>
    </header>
    </LayoutContext.Provider>
  );
};

export default HeroSection;
