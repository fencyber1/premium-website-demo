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
import playImg from "@/assets/gallery-play.jpg";
import musicImg from "@/assets/gallery-music.jpg";

/* Google Fonts stylesheet. Change the families here AND the
 * --font-heading / --font-body / --font-accent / --font-display variables in src/styles.css. */
export const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Playfair+Display:ital,wght@1,500;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";

export const school = {
  /* ---- Identity ------------------------------------------------------ */
  name: "Little Blooms",
  shortName: "Little Blooms", // used in the logo lockup
  tagline: "Nurturing the unique spark in every child.",
  /* Logo: set to an imported image to use a real logo, or leave null
   * to show the built-in monogram (first letters of shortName). */
  logo: null as string | null,

  /* ---- Navigation (label → section id) ------------------------------ */
  nav: [
    { label: "About", href: "#about" },
    { label: "Programs", href: "#programs" },
    { label: "Contact", href: "#contact" },
  ],

  /* ---- Hero ---------------------------------------------------------- */
  hero: {
    eyebrow: "Admissions open for 2026",
    headline: "Little Blooms",
    headlineAccent: "" as string,
    subtext:
      "A world of wonder, creativity, and gentle growth awaits your child at our kinderhaus.",
    image: heroImg,
    imageAlt: "Smiling child wearing a handmade flower crown in a sunny garden",
    primaryCta: { label: "Discover Our World", href: "#about" },
    secondaryCta: { label: "Book a Tour", href: "#contact" },
  },

  /* ---- About --------------------------------------------------------- */
  about: {
    eyebrow: "Welcome",
    title: "A Nurturing Place to Grow",
    body: [
      "We believe every child is a unique individual with boundless potential. Our sunlit spaces and nature-infused curriculum provide the perfect environment for curiosity to flourish and friendships to form.",
      "We blend structured activities with imaginative free play, focusing on emotional, social, and cognitive development.",
    ],
    image: aboutImg,
    imageAlt: "Children playing and learning together in a bright classroom",
    badge: { value: "Since 2035", label: "Nature-first kinderhaus" },
  },

  /* ---- Discovery pillars (icon: academic | teachers | safe | character) -- */
  why: {
    eyebrow: "Our approach",
    title: "Learning Through Joyful Discovery",
    items: [
      { icon: "character", title: "Creative Expression", text: "Daily art, music, and storytelling to ignite imagination and foster early social skills." },
      { icon: "academic", title: "Play-Based Academics", text: "Introducing early literacy and numeracy through engaging games that celebrate each child's unique spirit." },
      { icon: "safe", title: "Nature Connection", text: "Exploring the outdoors in our garden classroom to build resilience and respect for the natural world." },
    ],
  },

  /* ---- Rhythm band --------------------------------------------------- */
  rhythm: {
    eyebrow: "Daily life",
    title: "The Rhythm of Our Day",
    text: "From circle time songs to garden adventures, our days are filled with laughter and learning. We balance energetic play with quiet moments, ensuring a happy and harmonious experience for all.",
    cta: { label: "See Our Programs", href: "#programs" },
  },

  /* ---- Programs ------------------------------------------------------ */
  programs: {
    eyebrow: "Our programs",
    title: "Growing with us, year by year.",
    items: [
      { name: "Seedlings", ages: "Ages 2–3", description: "Gentle, play-based first steps that build curiosity, language and social skills.", image: nurseryImg, href: "#contact" },
      { name: "Sprouts", ages: "Ages 4–5", description: "Early literacy, numbers and creativity in a joyful, structured setting.", image: kindergartenImg, href: "#contact" },
      { name: "Explorers", ages: "Ages 5–6", description: "Hands-on projects, garden science, arts and music to get ready for school.", image: primaryImg, href: "#contact" },
    ],
    linkLabel: "Learn more",
  },

  /* ---- School Life gallery (tall: true makes a taller tile) ---------- */
  gallery: {
    eyebrow: "Gallery",
    title: "A Sneak Peek into Our World",
    titleAccent: "",
    items: [
      { src: playImg, alt: "Children playing together in the garden", tall: true },
      { src: musicImg, alt: "Children singing in music class with their teacher" },
      { src: primaryImg, alt: "Children exploring plants with magnifying glasses" },
      { src: kindergartenImg, alt: "Kindergarten children painting watercolors", tall: true },
      { src: aboutImg, alt: "Teacher reading a story to young children" },
      { src: nurseryImg, alt: "Toddlers building with wooden blocks" },
    ],
  },

  /* ---- Testimonials (demo content — replace with real quotes) -------- */
  testimonials: {
    eyebrow: "Testimonials",
    title: "What Our Families Say",
    items: [
      { quote: "SonnenBloom is more than a school; it's a community where our daughter has truly thrived and found her spark.", name: "Anouk De Vries", detail: "Kindergarten parent" },
      { quote: "A beautiful philosophy brought to life with care and intention. A warm, nurturing environment — truly a magical place for children to grow, explore, and feel safe.", name: "Clara Dubois", detail: "Preschool parent" },
      { quote: "The teachers' dedication is incredible. They celebrate each child's unique spirit every single day.", name: "Matteo Rossi", detail: "Nursery parent" },
    ],
  },

  /* ---- Final CTA ----------------------------------------------------- */
  finalCta: {
    title: "Ready to Start the Journey?",
    text: "Come see our sunlit spaces and garden classroom. We would love to meet your family.",
    cta: { label: "Book a Tour", href: "#contact" },
  },

  /* ---- Contact & footer --------------------------------------------- */
  contact: {
    phone: "123-456-7890",
    whatsapp: "1234567890", // digits only, international format, no "+"
    whatsappMessage: "Hello! I'd like to book a tour.",
    email: "hello@littleblooms.school",
    address: "500 Terry Francine St, San Francisco, CA 94158",
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      youtube: "https://youtube.com",
    },
  },
};

export type School = typeof school;
