import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, BookOpen, Facebook, HeartHandshake, Instagram, Mail, MapPin,
  Menu, MessageCircle, Phone, ShieldCheck, Sparkles, X, Youtube,
} from "lucide-react";
import { school } from "@/config/school";

/* Page metadata — pulled from the config so rebranding updates it too. */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${school.name} — ${school.tagline}` },
      { name: "description", content: school.hero.subtext },
      { property: "og:title", content: school.name },
      { property: "og:description", content: school.hero.subtext },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const icons = { academic: BookOpen, teachers: HeartHandshake, safe: ShieldCheck, character: Sparkles };
/* SonnenBloom rotation: lavender + teal + sunny pops on forest green. */
const accentBg = ["bg-[#8b7cf6]", "bg-[#2ec4b6]", "bg-[#ffc93c]"];
const accentFg = ["text-primary-foreground", "text-primary-foreground", "text-primary"];

/* Fades children in when scrolled into view. */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function SectionHead({ eyebrow, title, titleAccent, center = true }: { eyebrow: string; title: string; titleAccent?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : ""}>
      {center && (
        <span aria-hidden className="mb-3 flex items-center justify-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ffc93c]" />
          <span className="h-2 w-2 rounded-full bg-[#2ec4b6]" />
          <span className="h-2 w-2 rounded-full bg-[#4d96ff]" />
        </span>
      )}
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">{title}{titleAccent ? <> <em className="accent-word">{titleAccent}</em></> : null}</h2>
    </Reveal>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  const initials = school.shortName.split(" ").map((w) => w[0]).join("");
  return (
    <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label={`${school.name} home`}>
      {school.logo ? (
        <img src={school.logo} alt="" className="h-10 w-10 shrink-0 rounded-full object-contain" />
      ) : (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary font-display text-xl font-bold text-secondary-foreground">{initials}</span>
      )}
      <span className={`truncate font-display text-3xl font-bold leading-none ${light ? "text-primary-foreground" : "text-primary"}`}>{school.name}</span>
    </a>
  );
}

/* ---------------- Floating pill navigation (SonnenBloom style) ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const solid = scrolled || open;
  return (
    <header className="fixed inset-x-0 top-3 z-40 px-4 sm:top-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div className={`rounded-full px-4 py-2 transition-all duration-300 ${solid ? "bg-card/95 shadow-soft backdrop-blur" : "bg-transparent"}`}>
          <Logo light={!solid} />
        </div>
        <nav className="hidden items-center gap-8 rounded-full bg-[#fffdf5]/95 px-8 py-3 shadow-soft backdrop-blur lg:flex" aria-label="Main">
          {school.nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-semibold text-primary transition-colors hover:text-accent">{n.label}</a>
          ))}
        </nav>
        <button onClick={() => setOpen(!open)} className={`rounded-full p-3 shadow-soft backdrop-blur lg:hidden ${solid ? "bg-card/95 text-primary" : "bg-[#fffdf5]/90 text-primary"}`} aria-label="Toggle menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <ul className="mx-auto mt-2 max-w-7xl rounded-3xl bg-card px-6 pb-6 pt-2 shadow-lift lg:hidden">
          {school.nav.map((n) => (
            <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="block py-3 font-semibold text-foreground">{n.label}</a></li>
          ))}
          <li className="pt-2"><a href={school.hero.primaryCta.href} onClick={() => setOpen(false)} className="btn btn-primary w-full">{school.hero.primaryCta.label}</a></li>
        </ul>
      )}
    </header>
  );
}

/* ---------------- Hero (Little Blooms script headline) ---------------- */
function Hero() {
  const h = school.hero;
  return (
    <section id="top" className="relative isolate flex min-h-[96vh] items-center overflow-hidden rounded-b-[2.5rem]">
      <img src={h.image} alt={h.imageAlt} width={1920} height={1088} fetchPriority="high" className="hero-zoom absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0 -z-10" />
      {/* Playful floating shapes (decorative) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="float-soft absolute right-[12%] top-[20%] hidden h-24 w-24 rounded-full bg-[#c9b8ff]/90 sm:block" />
        <span className="float-soft absolute bottom-[24%] right-[30%] h-8 w-8 rounded-full bg-[#d8f3a5]/80" style={{ animationDelay: "1.2s" }} />
        <span className="float-soft absolute right-[38%] top-[32%] h-5 w-5 rotate-12 rounded-md bg-[#ffc93c]/90" style={{ animationDelay: "2s" }} />
        <span className="dot-grid absolute bottom-[10%] right-[6%] h-28 w-40 opacity-60" />
      </div>
      <div className="mx-auto w-full max-w-7xl px-5 pb-20 pt-36">
        <div className="max-w-3xl text-primary-foreground">
          <p className="hero-in text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground/80">{h.eyebrow}</p>
          <h1 className="hero-in mt-4 -rotate-2 font-display text-8xl font-bold leading-[0.9] sm:text-9xl lg:text-[10rem]" style={{ animationDelay: "120ms" }}>{h.headline}{h.headlineAccent ? <> <em className="accent-word">{h.headlineAccent}</em></> : null}</h1>
          <p className="hero-in mt-6 max-w-xl text-lg font-normal text-primary-foreground/85 sm:text-xl" style={{ animationDelay: "240ms" }}>{h.subtext}</p>
          <div className="hero-in mt-9 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <a href={h.primaryCta.href} className="btn btn-primary">{h.primaryCta.label}<ArrowRight className="h-4 w-4" /></a>
            <a href={h.secondaryCta.href} className="btn btn-ghost-light">{h.secondaryCta.label}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  const a = school.about;
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2">
        <Reveal className="relative">
          <img src={a.image} alt={a.imageAlt} width={1024} height={1280} loading="lazy" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-lift" />
          <div className="sticker absolute -bottom-6 right-6 rounded-2xl bg-card p-5 shadow-lift sm:-right-6">
            <p className="font-heading text-2xl font-extrabold text-primary">{a.badge.value}</p>
            <p className="text-sm text-muted-foreground">{a.badge.label}</p>
          </div>
          <div className="absolute -left-4 -top-4 -z-10 h-32 w-32 rounded-3xl bg-secondary/40" />
          <span aria-hidden className="dot-grid-dark absolute -right-5 -top-6 h-20 w-28 opacity-70" />
        </Reveal>
        <div>
          <SectionHead eyebrow={a.eyebrow} title={a.title} center={false} />
          {a.body.map((p, i) => (
            <Reveal key={i} delay={100 + i * 100}><p className="mt-5 text-lg leading-relaxed text-muted-foreground">{p}</p></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Discovery pillars ---------------- */
function Why() {
  const w = school.why;
  return (
    <section id="why" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow={w.eyebrow} title={w.title} />
        <div className="mx-auto mt-14 grid max-w-5xl gap-10 text-center md:grid-cols-3">
          {w.items.map((it, i) => {
            const Icon = icons[it.icon as keyof typeof icons];
            return (
              <Reveal key={it.title} delay={i * 100}>
                <span className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${accentBg[i]} ${accentFg[i]} shadow-soft`}><Icon className="h-7 w-7" /></span>
                <h3 className="mt-6 text-xl font-bold text-primary">{it.title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-muted-foreground">{it.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Rhythm band ---------------- */
function Rhythm() {
  const r = school.rhythm;
  return (
    <section id="rhythm" className="px-5 pb-4">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-primary px-8 py-16 text-center text-primary-foreground shadow-lift sm:py-20">
        <span aria-hidden className="dot-grid absolute left-[6%] top-[12%] h-24 w-36 opacity-40" />
        <span aria-hidden className="float-soft absolute -right-8 top-10 h-28 w-28 rounded-full bg-[#c9b8ff]/40" />
        <span aria-hidden className="float-soft absolute -left-10 bottom-8 h-24 w-24 rounded-full bg-[#d8f3a5]/25" style={{ animationDelay: "1.5s" }} />
        <p className="relative text-sm font-semibold uppercase tracking-[0.22em] text-primary-foreground/70">{r.eyebrow}</p>
        <h2 className="relative mx-auto mt-4 max-w-2xl font-display text-6xl font-bold leading-[0.95] sm:text-7xl">{r.title}</h2>
        <p className="relative mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">{r.text}</p>
        <a href={r.cta.href} className="btn btn-primary relative mt-8">{r.cta.label}<ArrowRight className="h-4 w-4" /></a>
      </Reveal>
    </section>
  );
}

/* ---------------- Programs ---------------- */
function Programs() {
  const p = school.programs;
  return (
    <section id="programs" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow={p.eyebrow} title={p.title} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {p.items.map((it, i) => (
            <Reveal key={it.name} delay={i * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-3xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <div className="overflow-hidden"><img src={it.image} alt={`${it.name} students`} width={1024} height={768} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">{it.ages}</span>
                  <h3 className="mt-2 text-2xl font-bold text-primary">{it.name}</h3>
                  <p className="mt-3 flex-1 text-muted-foreground">{it.description}</p>
                  <a href={it.href} className="mt-5 inline-flex items-center gap-1.5 font-bold text-primary transition-all group-hover:gap-3">{p.linkLabel}<ArrowRight className="h-4 w-4" /></a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- School life gallery + lightbox ---------------- */
function Gallery() {
  const g = school.gallery;
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    if (active === null) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a! + 1) % g.items.length);
      if (e.key === "ArrowLeft") setActive((a) => (a! - 1 + g.items.length) % g.items.length);
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [active, g.items.length]);
  return (
    <section id="life" className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow={g.eyebrow} title={g.title} titleAccent={g.titleAccent} />
        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 lg:grid-cols-3 lg:auto-rows-[240px]">
          {g.items.map((it, i) => (
            <button key={i} onClick={() => setActive(i)} className={`group relative overflow-hidden rounded-3xl shadow-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring ${it.tall ? "row-span-2" : ""}`} aria-label={`Open photo: ${it.alt}`}>
              <img src={it.src} alt={it.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-overlay/0 transition-colors duration-300 group-hover:bg-overlay/25" />
            </button>
          ))}
        </div>
        <Reveal className="mt-10 text-center"><a href="#programs" className="btn btn-solid">See Our World in Bloom<ArrowRight className="h-4 w-4" /></a></Reveal>
      </div>
      {active !== null && g.items[active] && (
        <div role="dialog" aria-modal="true" aria-label={g.items[active]!.alt} className="fixed inset-0 z-50 grid place-items-center bg-overlay/90 p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setActive(null)}>
          <button className="absolute right-5 top-5 rounded-full bg-primary-foreground/15 p-2.5 text-primary-foreground" aria-label="Close"><X /></button>
          <img src={g.items[active]!.src} alt={g.items[active]!.alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain animate-in zoom-in-95" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

/* ---------------- Testimonials (numbered, SonnenBloom style) ---------------- */
function Testimonials() {
  const t = school.testimonials;
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow={t.eyebrow} title={t.title} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {t.items.map((q, i) => (
            <Reveal key={i} delay={i * 100}>
              <figure className="flex h-full flex-col rounded-3xl bg-card p-8 shadow-soft">
                <span aria-hidden className="font-display text-5xl font-bold text-accent">0{i + 1}</span>
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed">“{q.quote}”</blockquote>
                <figcaption className="mt-6 border-t pt-4"><p className="font-bold text-primary">{q.name}</p><p className="text-sm text-muted-foreground">{q.detail}</p></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Final CTA ---------------- */
function FinalCta() {
  const f = school.finalCta;
  return (
    <section className="px-5 py-24">
      <Reveal className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-primary px-8 py-16 text-center text-primary-foreground shadow-lift sm:py-20">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-secondary/30" aria-hidden />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-accent/30" aria-hidden />
        <h2 className="relative font-display text-6xl font-bold leading-[0.95] sm:text-7xl">{f.title}</h2>
        <p className="relative mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">{f.text}</p>
        <a href={f.cta.href} className="btn btn-primary relative mt-8">{f.cta.label}<ArrowRight className="h-4 w-4" /></a>
      </Reveal>
    </section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  const c = school.contact;
  const wa = `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(c.whatsappMessage)}`;
  const items = [
    { icon: Phone, label: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "Chat on WhatsApp", href: wa },
    { icon: Mail, label: c.email, href: `mailto:${c.email}` },
    { icon: MapPin, label: c.address, href: `https://maps.google.com/?q=${encodeURIComponent(c.address)}` },
  ];
  const socials = [
    { icon: Facebook, href: c.socials.facebook, label: "Facebook" },
    { icon: Instagram, href: c.socials.instagram, label: "Instagram" },
    { icon: Youtube, href: c.socials.youtube, label: "YouTube" },
  ];
  return (
    <footer id="contact" className="bg-overlay pt-20 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs leading-relaxed text-primary-foreground/70">{school.tagline}</p>
          <div className="mt-6 flex gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-secondary hover:text-secondary-foreground"><s.icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold">Contact</h3>
          <ul className="mt-4 space-y-3">
            {items.map((it) => (
              <li key={it.label}><a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="flex items-start gap-3 text-primary-foreground/75 transition-colors hover:text-secondary"><it.icon className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />{it.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold">Explore</h3>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {school.nav.map((n) => <li key={n.href}><a href={n.href} className="text-primary-foreground/75 hover:text-secondary">{n.label}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl border-t border-primary-foreground/10 px-5 py-6 text-sm text-primary-foreground/60">
        © {new Date().getFullYear()} {school.name}. All rights reserved.
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Why />
      <Rhythm />
      <Programs />
      <Gallery />
      <Testimonials />
      <FinalCta />
      <Footer />
    </main>
  );
}
