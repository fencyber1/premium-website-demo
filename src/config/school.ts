/* =====================================================================
 * SCHOOL CONFIGURATION — edit this file to rebrand the site for a client.
 * ---------------------------------------------------------------------
 * Everything that changes per school lives here: name, copy, images,
 * programs, testimonials, contact details, button labels and links.
 *
 * BRAND COLORS & FONTS live in ONE labeled block at the top of
 * src/styles.css ("BRAND CONFIG"). Font files are loaded in
 * src/routes/__root.tsx (FONT_URL below is used there).
 *
 * IMAGES: drop new photos into src/assets/ and change the imports below.
 * ===================================================================== */

import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import nurseryImg from "@/assets/nursery.jpg";
import kindergartenImg from "@/assets/kindergarten.jpg";
import primaryImg from "@/assets/primary.jpg";
import juniorImg from "@/assets/junior.jpg";
import playImg from "@/assets/gallery-play.jpg";
import musicImg from "@/assets/gallery-music.jpg";

/* Google Fonts stylesheet. Change the families here AND the
 * --font-heading / --font-body variables in src/styles.css. */
export const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Nunito+Sans:wght@400;600;700&display=swap";

export const school = {
  /* ---- Identity ------------------------------------------------------ */
  name: "Bright Future School",
  shortName: "Bright Future", // used in the logo lockup
  tagline: "Strong foundations. Bright futures.",
  /* Logo: set to an imported image to use a real logo, or leave null
   * to show the built-in monogram (first letters of shortName). */
  logo: null as string | null,

  /* ---- Navigation (label → section id) ------------------------------ */
  nav: [
    { label: "About", href: "#about" },
    { label: "Why Us", href: "#why" },
    { label: "Programs", href: "#programs" },
    { label: "School Life", href: "#life" },
    { label: "Admissions", href: "#admissions" },
    { label: "Contact", href: "#contact" },
  ],

  /* ---- Hero ---------------------------------------------------------- */
  hero: {
    eyebrow: "Now enrolling for the new academic year",
    headline: "Building Strong Foundations for Bright Futures.",
    subtext:
      "Creating a safe, inspiring environment where every child can learn, grow and prepare for tomorrow.",
    image: heroImg,
    imageAlt: "Smiling students raising their hands in a sunlit classroom",
    primaryCta: { label: "Apply Now", href: "#admissions" },
    secondaryCta: { label: "Contact Us", href: "#contact" },
    stats: [
      { value: "15+", label: "Years of excellence" },
      { value: "1:12", label: "Teacher ratio" },
      { value: "98%", label: "Parent satisfaction" },
    ],
  },

  /* ---- About --------------------------------------------------------- */
  about: {
    eyebrow: "About us",
    title: "Where curious minds become confident learners.",
    body: [
      "At Bright Future School, we believe every child carries remarkable potential. Our mission is to nurture it with excellent teaching, genuine care and a love of learning that lasts a lifetime.",
      "From the first day of Nursery to the final year of Junior High, we focus on strong academic foundations, good character and the confidence to take on tomorrow.",
    ],
    image: aboutImg,
    imageAlt: "Teacher reading a story to young children in the school library",
    badge: { value: "Est. 2010", label: "Trusted by families" },
  },

  /* ---- Why Choose Us (icon: academic | teachers | safe | character) -- */
  why: {
    eyebrow: "Why choose us",
    title: "Everything your child needs to thrive.",
    items: [
      { icon: "academic", title: "Strong Academic Foundation", text: "A rigorous, well-rounded curriculum that builds real understanding in literacy, numeracy and science." },
      { icon: "teachers", title: "Caring & Qualified Teachers", text: "Experienced educators who know every child by name and support them to reach their best." },
      { icon: "safe", title: "Safe Learning Environment", text: "Secure campus, clear safeguarding policies and a warm culture where children feel at home." },
      { icon: "character", title: "Character Development", text: "Respect, responsibility and kindness are woven into every lesson and every school day." },
    ],
  },

  /* ---- Programs ------------------------------------------------------ */
  programs: {
    eyebrow: "Our programs",
    title: "A clear path from first steps to high school.",
    items: [
      { name: "Nursery", ages: "Ages 2–3", description: "Gentle, play-based learning that builds curiosity, language and social skills.", image: nurseryImg, href: "#contact" },
      { name: "Kindergarten", ages: "Ages 4–5", description: "Early literacy, numbers and creativity in a joyful, structured setting.", image: kindergartenImg, href: "#contact" },
      { name: "Primary", ages: "Ages 6–11", description: "Strong core skills with hands-on science, arts, sport and technology.", image: primaryImg, href: "#contact" },
      { name: "Junior High", ages: "Ages 12–15", description: "Deeper learning, leadership and study habits that prepare for success ahead.", image: juniorImg, href: "#contact" },
    ],
    linkLabel: "Learn more",
  },

  /* ---- School Life gallery (tall: true makes a taller tile) ---------- */
  gallery: {
    eyebrow: "School life",
    title: "Learning, laughing and growing together.",
    items: [
      { src: playImg, alt: "Students playing football on the school field", tall: true },
      { src: musicImg, alt: "Students singing in music class with their teacher" },
      { src: primaryImg, alt: "Students exploring plants with magnifying glasses" },
      { src: kindergartenImg, alt: "Kindergarten children painting watercolors", tall: true },
      { src: juniorImg, alt: "Junior High students collaborating on a project" },
      { src: nurseryImg, alt: "Toddlers building with wooden blocks" },
    ],
  },

  /* ---- Admissions ---------------------------------------------------- */
  admissions: {
    eyebrow: "Admissions",
    title: "Joining us is simple.",
    steps: [
      { title: "Enquire", text: "Send us a message or call — we'll answer every question." },
      { title: "Visit", text: "Tour our campus, meet teachers and see classes in action." },
      { title: "Enrol", text: "Complete a short application and welcome to the family." },
    ],
    cta: { label: "Start Admission", href: "#contact" },
  },

  /* ---- Testimonials (demo content — replace with real quotes) -------- */
  testimonials: {
    eyebrow: "Parent voices",
    title: "Families who trust us.",
    note: "Sample testimonials shown for demonstration purposes.",
    items: [
      { quote: "Our daughter wakes up excited for school every day. The teachers truly care, and her confidence has grown enormously.", name: "Demo Parent", detail: "Class of 2030" },
      { quote: "Clear communication, a safe campus and real academic progress. We couldn't ask for more from a school.", name: "Sample Parent", detail: "Class of 2028" },
      { quote: "The focus on character as well as grades is exactly what we wanted. Our son has become kind, curious and responsible.", name: "Example Parent", detail: "Class of 2032" },
    ],
  },

  /* ---- Final CTA ----------------------------------------------------- */
  finalCta: {
    title: "Give Your Child a Strong Start.",
    text: "Places are limited each year. Speak to our admissions team today.",
    cta: { label: "Contact Admissions", href: "mailto:admissions@brightfuture.school" },
  },

  /* ---- Contact & footer --------------------------------------------- */
  contact: {
    phone: "+233 20 000 0000",
    whatsapp: "233200000000", // digits only, international format, no "+"
    whatsappMessage: "Hello! I'd like to learn more about admissions.",
    email: "admissions@brightfuture.school",
    address: "12 Learning Avenue, Sunrise District, Accra",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
};

export type School = typeof school;
