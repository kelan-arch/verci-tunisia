export type ItineraryDay = {
  day: string;
  title: string;
  subtitle: string;
  stamp: string;
  date: string;
  code: string;
  description: string;
  image: string;
  /** CSS object-position for the passport photo crop (default "center"). */
  imagePosition?: string;
};

/** Canonical itinerary — aligned with "What we'll actually do" copy. */
export const days: ItineraryDay[] = [
  {
    day: "01",
    title: "La Marsa",
    subtitle: "Arrival",
    stamp: "TUNIS-CARTHAGE",
    date: "19 OCT 2026",
    code: "TUN",
    description:
      "We take over a hotel on the coast just north of Carthage and use it as a basecamp. Mornings are for working and hanging out, with some small programming. Golden Carthage Hotel & Résidence — seafront, ten minutes from Sidi Bou Saïd, with the promenade and the beach in walking distance.",
    image: "/images/brochure/sidi-bou-said-street.jpg",
  },
  {
    day: "02",
    title: "Medina of Tunis",
    subtitle: "The Living City",
    stamp: "MEDINA · UNESCO",
    date: "20 OCT 2026",
    code: "TUN",
    description:
      "Tunis's old city is one of the best-preserved medieval Islamic city centers anywhere — a UNESCO site with 700-odd monuments, founded in the 7th century and still completely lived in. We walk it with someone who can get us into the working ateliers and inner courtyards that aren't on any tour. The afternoon is at Dar El Sanaa: copper engraving, Arabic calligraphy, embroidery, wood carving, and mosaic. You pick one and leave with whatever you made.",
    image: "/images/brochure/medina-clock-tower.jpg",
  },
  {
    day: "03",
    title: "Carthage & Sidi Bou Saïd",
    subtitle: "Antiquity & Light",
    stamp: "CARTHAGO · 814 BC",
    date: "21 OCT 2026",
    code: "TUN",
    description:
      "Carthage was founded around 814 BC and spent a few centuries running the western Mediterranean before Rome finally finished it off. What's left is worth the morning: the museum on Byrsa hill, the Tophet, the circular Punic ports, and the Antonine Baths, whose columns are still standing at the edge of the water. Sidi Bou Saïd in the afternoon — white walls, blue doors, the light that pulled Klee and Macke here a century ago — and Ennejma Ezzahra, a palace that's now the home of Tunisian musical heritage.",
    image: "/images/brochure/sidi-blue-door.jpg",
  },
  {
    day: "04",
    title: "Cap Bon",
    subtitle: "A Day at Sea",
    stamp: "KORBOUS · MED",
    date: "22 OCT 2026",
    code: "MED",
    description:
      "Cap Bon is the peninsula pointing at Sicily, the closest Africa gets to Europe. In October the sea is still warm and everyone else has gone home. Three options: a catamaran from Sidi Bou Saïd to Korbous, the cove at Mteris at the northern tip, or kayaks and paddleboards from Port aux Princes along the coast to a cove where lunch is already waiting.",
    image: "/images/brochure/kayak-cove.jpg",
  },
  {
    day: "05",
    title: "The Drive South",
    subtitle: "Tozeur & the Oases",
    stamp: "TOZEUR · OASIS",
    date: "23 OCT 2026",
    code: "TOZ",
    description:
      "Coast to steppe to palm grove over about seven hours, with lunch at Tamarza when we arrive. Then the mountain oases — Tamarza, Chébika, and Midès — where springs and waterfalls run through the rock and a canyon opens up under your feet. Late afternoon at Mos Espa near Nefta, the Star Wars set that's still sitting out in the sand, with a drink while the sun goes down.",
    image: "/images/brochure/tozeur-palms.jpg",
  },
  {
    day: "06",
    title: "Sahara Desert",
    subtitle: "A Night with the Nomads",
    stamp: "GRAND ERG",
    date: "24 OCT 2026",
    code: "SAH",
    description:
      "Past Tozeur the road narrows and then stops, and the Grand Erg Oriental starts — one of the two great sand seas of the desert. No signal, no noise, nothing to fix your eye on. The afternoon goes at whatever pace the dunes set: walking, camels, or sitting still and watching the light change. Dinner around a fire, then you sleep outside. Most people say this is the part they remember.",
    image: "/images/brochure/dunes.jpg",
    imagePosition: "82% center",
  },
  {
    day: "07",
    title: "Back to Tunis",
    subtitle: "Farewell Tunisia",
    stamp: "DÉPART · TUN",
    date: "25 OCT 2026",
    code: "TUN",
    description:
      "Sunrise in the desert, breakfast at camp. The long road north with a stop for a last meal together. Departures from Tunis-Carthage — the quest ends where it began, but nothing looks the same.",
    image: "/images/brochure/dusk-silhouettes.jpg",
  },
];
