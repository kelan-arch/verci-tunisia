export type ItineraryDay = {
  day: string;
  title: string;
  subtitle: string;
  stamp: string;
  date: string;
  code: string;
  description: string;
  image: string;
};

/** Canonical V3 itinerary (design/PQ_VERCI_V3.pdf, "Suggested Itinerary"). */
export const days: ItineraryDay[] = [
  {
    day: "01",
    title: "Sidi Bou Saïd",
    subtitle: "Arrival",
    stamp: "TUNIS-CARTHAGE",
    date: "19 OCT 2026",
    code: "TUN",
    description:
      "Arrival above the Gulf of Tunis. White walls, blue doors, bougainvillea, and a quality of light that has drawn artists here for over a century. A first unstructured walk — no agenda. Welcome dinner at Dar Zarrouk.",
    image: "/images/tunisia-034.jpg",
  },
  {
    day: "02",
    title: "Medina of Tunis",
    subtitle: "The Living City",
    stamp: "MEDINA · UNESCO",
    date: "20 OCT 2026",
    code: "TUN",
    description:
      "A guided walk through quarters few visitors reach — working ateliers, inner courtyards, artist residencies. Then Dar El Sanaa for the workshops: dinanderie, Arabic calligraphy, embroidery, wood sculpture, mosaic. Dinner in La Goulette.",
    image: "/images/tunisia-004.jpg",
  },
  {
    day: "03",
    title: "Testour & Dougga",
    subtitle: "Andalusia & Rome",
    stamp: "THVGGA",
    date: "21 OCT 2026",
    code: "DGA",
    description:
      "Testour, settled by Moriscos expelled from Spain — the Great Mosque, the malouf tradition. Then Dougga, the best-preserved Africo-Roman city in North Africa: never abruptly abandoned, never looted.",
    image: "/images/tunisia-024.jpg",
  },
  {
    day: "04",
    title: "Cap Bon",
    subtitle: "A Day at Sea",
    stamp: "KORBOUS · MED",
    date: "22 OCT 2026",
    code: "MED",
    description:
      "A full day aboard a catamaran from Sidi Bou Saïd to Korbous — the coast seen from the sea, which is the only way to see it properly. Hidden coves, snorkelling, stand-up paddle, and long stretches of doing nothing in particular.",
    image: "/images/tunisia-030.jpg",
  },
  {
    day: "05",
    title: "Tozeur",
    subtitle: "Seven Hours South",
    stamp: "TOZEUR · OASIS",
    date: "23 OCT 2026",
    code: "TOZ",
    description:
      "Coast to steppe to the first palm groves. The mountain oases of Chebika and Mides — springs, waterfalls, deep canyons. Night in the palmeraie among 400,000 date palms at Diar Abou Habibi.",
    image: "/images/tunisia-046.jpg",
  },
  {
    day: "06",
    title: "Sahara Desert",
    subtitle: "A Night with the Nomads",
    stamp: "GRAND ERG",
    date: "24 OCT 2026",
    code: "SAH",
    description:
      "The road narrows, then disappears. Afternoon at the rhythm of the dunes — on foot, by camel, or watching the light shift. Dinner around a fire. Night under the open sky: no electricity, no schedule, just silence and stars.",
    image: "/images/tunisia-076.jpg",
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
    image: "/images/tunisia-084.jpg",
  },
];
