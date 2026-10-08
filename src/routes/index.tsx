import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowRight, BookOpen, Facebook, HeartHandshake, Instagram, Mail, MapPin,
  Menu, MessageCircle, Phone, Quote, ShieldCheck, Sparkles, X, Youtube,
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
const accentBg = ["bg-primary", "bg-secondary", "bg-accent", "bg-primary"];

/* Fades children in when scrolled into view. */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function SectionHead({ eyebrow, title, center = true }: { eyebrow: string; title: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : ""}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-extrabold text-primary sm:text-4xl lg:text-5xl">{title}</h2>
    </Reveal>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  const initials = school.shortName.split(" ").map((w) => w[0]).join("");
  return (
    <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label={`${school.name} home`}>
      {school.logo ? (
        <img src={school.logo} alt="" className="h-10 w-10 shrink-0 rounded-xl object-contain" />
      ) : (
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-secondary font-heading text-lg font-extrabold text-secondary-foreground">{initials}</span>
      )}
      <span className={`truncate font-heading text-lg font-extrabold ${light ? "text-primary-foreground" : "text-primary"}`}>{school.name}</span>
    </a>
  );
}

/* ---------------- Sticky navigation ---------------- */
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
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${solid ? "bg-card/95 shadow-soft backdrop-blur" : "bg-transparent"}`}>
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 lg:flex lg:justify-between" aria-label="Main">
        <Logo light={!solid} />
        <ul className="hidden items-center gap-7 lg:flex">
          {school.nav.map((n) => (
            <li key={n.href}><a href={n.href} className={`text-sm font-semibold transition-colors hover:text-secondary ${solid ? "text-foreground" : "text-primary-foreground"}`}>{n.label}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a href={school.hero.primaryCta.href} className="btn btn-primary hidden !py-2.5 sm:inline-flex">{school.hero.primaryCta.label}</a>
          <button onClick={() => setOpen(!open)} className={`rounded-full p-2 lg:hidden ${solid ? "text-primary" : "text-primary-foreground"}`} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {open && (
        <ul className="border-t bg-card px-5 pb-5 lg:hidden">
          {school.nav.map((n) => (
            <li key={n.href}><a href={n.href} onClick={() => setOpen(false)} className="block py-3 font-semibold text-foreground">{n.label}</a></li>
          ))}
          <li className="pt-2"><a href={school.hero.primaryCta.href} onClick={() => setOpen(false)} className="btn btn-primary w-full">{school.hero.primaryCta.label}</a></li>
        </ul>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const h = school.hero;
  return (
    <section id="top" className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
      <img src={h.image} alt={h.imageAlt} width={1920} height={1088} fetchPriority="high" className="hero-zoom absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="hero-overlay absolute inset-0 -z-10" />
      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-32">
        <div className="max-w-2xl text-primary-foreground">
          <span className="hero-in inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-accent" />{h.eyebrow}
          </span>
          <h1 className="hero-in mt-6 text-4xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl" style={{ animationDelay: "120ms" }}>{h.headline}</h1>
          <p className="hero-in mt-6 max-w-xl text-lg text-primary-foreground/85 sm:text-xl" style={{ animationDelay: "240ms" }}>{h.subtext}</p>
          <div className="hero-in mt-9 flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <a href={h.primaryCta.href} className="btn btn-primary">{h.primaryCta.label}<ArrowRight className="h-4 w-4" /></a>
            <a href={h.secondaryCta.href} className="btn btn-ghost-light">{h.secondaryCta.label}</a>
          </div>
          <dl className="hero-in mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-primary-foreground/20 pt-6" style={{ animationDelay: "480ms" }}>
            {h.stats.map((s) => (
              <div key={s.label}><dt className="sr-only">{s.label}</dt><dd className="font-heading text-3xl font-extrabold text-secondary">{s.value}</dd><dd className="text-sm text-primary-foreground/75">{s.label}</dd></div>
            ))}
          </dl>
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
          <div className="absolute -bottom-6 right-6 rounded-2xl bg-card p-5 shadow-lift sm:-right-6">
            <p className="font-heading text-2xl font-extrabold text-primary">{a.badge.value}</p>
            <p className="text-sm text-muted-foreground">{a.badge.label}</p>
          </div>
          <div className="absolute -left-4 -top-4 -z-10 h-32 w-32 rounded-3xl bg-secondary/40" />
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

/* ---------------- Why choose us ---------------- */
function Why() {
  const w = school.why;
  return (
    <section id="why" className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHead eyebrow={w.eyebrow} title={w.title} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {w.items.map((it, i) => {
            const Icon = icons[it.icon as keyof typeof icons];
            return (
              <Reveal key={it.title} delay={i * 100}>
                <article className="group h-full rounded-3xl bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl ${accentBg[i]} ${i === 1 ? "text-secondary-foreground" : "text-primary-foreground"} transition-transform duration-300 group-hover:scale-110`}><Icon className="h-6 w-6" /></span>
                  <h3 className="mt-6 text-xl font-bold text-primary">{it.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{it.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
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
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
        <SectionHead eyebrow={g.eyebrow} title={g.title} />
        <div className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 lg:grid-cols-3 lg:auto-rows-[240px]">
          {g.items.map((it, i) => (
            <button key={i} onClick={() => setActive(i)} className={`group relative overflow-hidden rounded-3xl shadow-soft focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-ring ${it.tall ? "row-span-2" : ""}`} aria-label={`Open photo: ${it.alt}`}>
              <img src={it.src} alt={it.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-0 bg-overlay/0 transition-colors duration-300 group-hover:bg-overlay/25" />
            </button>
          ))}
        </div>
      </div>
      {active !== null && (
        <div role="dialog" aria-modal="true" aria-label={g.items[active].alt} className="fixed inset-0 z-50 grid place-items-center bg-overlay/90 p-4 backdrop-blur-sm animate-in fade-in" onClick={() => setActive(null)}>
          <button className="absolute right-5 top-5 rounded-full bg-primary-foreground/15 p-2.5 text-primary-foreground" aria-label="Close"><X /></button>
          <img src={g.items[active].src} alt={g.items[active].alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain animate-in zoom-in-95" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </section>
  );
}

/* ---------------- Admissions ---------------- */
function Admissions() {
  const a = school.admissions;
  return (
    <section id="admissions" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow={a.eyebrow} title={a.title} />
        <ol className="relative mt-16 grid gap-10 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-8 hidden h-0.5 border-t-2 border-dashed border-secondary md:block" aria-hidden />
          {a.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 150}>
              <li className="relative text-center">
                <span className={`mx-auto grid h-16 w-16 place-items-center rounded-full font-heading text-2xl font-extrabold shadow-soft ring-8 ring-background ${accentBg[i]} ${i === 1 ? "text-secondary-foreground" : "text-primary-foreground"}`}>{i + 1}</span>
                <h3 className="mt-6 text-2xl font-bold text-primary">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-muted-foreground">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-14 text-center"><a href={a.cta.href} className="btn btn-solid">{a.cta.label}<ArrowRight className="h-4 w-4" /></a></Reveal>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
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
                <Quote className="h-8 w-8 text-secondary" />
                <blockquote className="mt-4 flex-1 text-lg leading-relaxed">“{q.quote}”</blockquote>
                <figcaption className="mt-6 border-t pt-4"><p className="font-bold text-primary">{q.name}</p><p className="text-sm text-muted-foreground">{q.detail}</p></figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm italic text-muted-foreground">{t.note}</p>
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
        <h2 className="relative text-3xl font-extrabold sm:text-5xl">{f.title}</h2>
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
          <p className="mt-4 max-w-xs text-primary-foreground/70">{school.tagline}</p>
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
      <Programs />
      <Gallery />
      <Admissions />
      <Testimonials />
      <FinalCta />
      <Footer />
    </main>
  );
}
