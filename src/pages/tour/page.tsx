import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { ChevronLeft, ChevronRight, Hand, Maximize2, Minimize2, Minus, Plus } from "lucide-react";
import PageLayout from "../../components/page-layout.tsx";
import Img from "../../components/img.tsx";
import { TOUR_LOCATIONS } from "../../lib/hotel-data.ts";
import { TOUR_NOTE } from "../../lib/site-config.ts";

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.6;
const START_ZOOM = 1.3;
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const ctrl = "flex h-11 w-11 cursor-pointer items-center justify-center bg-[#0f1a30]/85 text-white transition-colors hover:bg-[#c9a84c] hover:text-[#0f1a30] disabled:cursor-not-allowed disabled:opacity-40";

export default function TourPage() {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(START_ZOOM);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [full, setFull] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number } | null>(null);
  const location = TOUR_LOCATIONS[index];

  // Keeps the panned image from leaving empty edges.
  const limit = useCallback((z: number) => {
    const box = stage.current?.getBoundingClientRect();
    return { x: ((z - 1) * (box?.width ?? 0)) / 2, y: ((z - 1) * (box?.height ?? 0)) / 2 };
  }, []);

  const applyZoom = (next: number) => {
    const z = clamp(next, MIN_ZOOM, MAX_ZOOM);
    const l = limit(z);
    setZoom(z);
    setPan((p) => ({ x: clamp(p.x, -l.x, l.x), y: clamp(p.y, -l.y, l.y) }));
  };

  const goTo = (next: number) => {
    setIndex((next + TOUR_LOCATIONS.length) % TOUR_LOCATIONS.length);
    setPan({ x: 0, y: 0 });
    setZoom(START_ZOOM);
  };
  const goToId = (id: string) => goTo(TOUR_LOCATIONS.findIndex((l) => l.id === id));

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    const l = limit(zoom);
    setPan({ x: clamp(e.clientX - drag.current.x, -l.x, l.x), y: clamp(e.clientY - drag.current.y, -l.y, l.y) });
  };
  const onUp = () => { drag.current = null; };

  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void stage.current?.requestFullscreen?.();
  };

  useEffect(() => {
    const sync = () => setFull(document.fullscreenElement === stage.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  return (
    <PageLayout title="360° Virtual Tour Demo | The Imperial Palace Rajkot" description="Explore the lobby, suites, ballrooms, pool and courtyard of The Imperial Palace, Rajkot in an interactive 360 degree tour demo.">
      <section className="bg-[#0f1a30] px-5 py-10 text-white md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <span className="inline-block border border-[#c9a84c] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-[#c9a84c]">360° Tour Demo</span>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-light leading-tight text-balance md:text-6xl">Experience the palace before you arrive</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75">Drag to look around, use the controls to zoom, and tap a glowing marker to walk into the next space.</p>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_260px]">
            <div ref={stage} className="relative aspect-[4/5] w-full select-none overflow-hidden bg-[#0b1426] sm:aspect-[16/10] lg:aspect-auto lg:h-[600px]">
              <div onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} className="absolute inset-0 cursor-grab touch-none active:cursor-grabbing" aria-label={`Panorama of ${location.label}. Drag to look around.`} role="application">
                <div className="absolute inset-0 will-change-transform" style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}>
                  <Img key={location.id} src={location.image} alt={`${location.label} at The Imperial Palace`} priority width={1600} height={1000} className="pointer-events-none h-full w-full object-cover" />
                  {location.hotspots.map((h) => (
                    <button key={h.to} type="button" onPointerDown={(e) => e.stopPropagation()} onClick={() => goToId(h.to)} aria-label={`Go to ${h.label}`} className="group absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-2" style={{ left: `${h.x}%`, top: `${h.y}%`, transform: `translate(-50%, -50%) scale(${1 / zoom})` }}>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-[#c9a84c]/90 text-[#0f1a30] group-hover:bg-white"><ChevronRight className="h-5 w-5" /></span>
                      <span className="whitespace-nowrap bg-[#0f1a30]/90 px-2.5 py-1 text-[11px] uppercase tracking-[0.18em] text-white">{h.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2 sm:left-4 sm:top-4">
                <span className="bg-[#0f1a30]/90 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[#c9a84c]">360° Tour Demo</span>
                <span className="bg-[#0f1a30]/90 px-3 py-2 text-xs uppercase tracking-[0.18em]">{location.label} <span className="text-white/60">· {location.area}</span></span>
              </div>
              <div className="absolute right-3 top-3 flex flex-col gap-2 sm:right-4 sm:top-4">
                <button type="button" onClick={toggleFull} aria-label={full ? "Exit fullscreen" : "Enter fullscreen"} className={ctrl}>{full ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}</button>
                <button type="button" onClick={() => applyZoom(zoom + 0.3)} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in" className={ctrl}><Plus className="h-5 w-5" /></button>
                <button type="button" onClick={() => applyZoom(zoom - 0.3)} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out" className={ctrl}><Minus className="h-5 w-5" /></button>
              </div>
              <button type="button" onClick={() => goTo(index - 1)} aria-label="Previous location" className={`${ctrl} absolute left-3 top-1/2 -translate-y-1/2 sm:left-4`}><ChevronLeft className="h-5 w-5" /></button>
              <button type="button" onClick={() => goTo(index + 1)} aria-label="Next location" className={`${ctrl} absolute right-3 top-1/2 -translate-y-1/2 sm:right-4`}><ChevronRight className="h-5 w-5" /></button>
              <p className="pointer-events-none absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-[#0f1a30]/85 px-3 py-2 text-[11px] uppercase tracking-[0.15em] text-white/85 sm:left-auto sm:right-auto sm:bottom-4 sm:left-1/2 sm:-translate-x-1/2"><Hand className="h-4 w-4 shrink-0 text-[#c9a84c]" />Drag to look around</p>
            </div>

            <nav aria-label="Tour locations" className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:content-start">
              {TOUR_LOCATIONS.map((l, i) => (
                <button key={l.id} type="button" onClick={() => goTo(i)} aria-current={i === index ? "true" : undefined} className={`flex min-h-11 cursor-pointer flex-col items-start border px-4 py-3 text-left transition-colors ${i === index ? "border-[#c9a84c] bg-[#c9a84c]/10 text-[#e8d5a3]" : "border-white/20 text-white/80 hover:border-[#c9a84c]/60"}`}>
                  <span className="text-sm">{l.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/55">{l.area}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-6 grid gap-6 border-t border-white/15 pt-6 md:grid-cols-2">
            <div><h2 className="font-serif text-2xl">{location.label}</h2><p className="mt-2 text-sm leading-6 text-white/75">{location.description}</p></div>
            <p className="border-l-2 border-[#c9a84c] pl-4 text-sm leading-6 text-white/75">{TOUR_NOTE}</p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
