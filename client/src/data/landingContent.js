/** Royalty-free Unsplash travel imagery for Colombiator */
export const UNSPLASH = {
  hero: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1400&q=80',
  auth: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80',
  split: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80',
};

export const FALLBACK_DESTINATIONS = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    region: 'Mediterranean',
    image:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
    description: 'Iconic whitewashed caldera views, Aegean sunsets, and coastal walking paths.',
    highlight: 'Cliffside Walks & Island Sunsets',
  },
  {
    id: '2',
    name: 'Kyoto',
    country: 'Japan',
    region: 'East Asia',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    description: 'Centuries-old bamboo groves, historic wooden shrines, and seasonal gardens.',
    highlight: 'Ancient Temples & Tea Traditions',
  },
  {
    id: '3',
    name: 'Maldives',
    country: 'Maldives',
    region: 'Indian Ocean',
    image:
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80',
    description: 'Pristine coral atolls, marine biodiversity, and turquoise lagoon routes.',
    highlight: 'Lagoon Exploration & Marine Reefs',
  },
  {
    id: '4',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'Central Europe',
    image:
      'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=800&q=80',
    description: 'Dramatic alpine passes, high-altitude panoramas, and scenic cogwheel railways.',
    highlight: 'Mountain Trails & Scenic Rail Passes',
  },
];

export const FEATURES = [
  {
    title: 'Multi-Stop Itinerary Studio',
    desc: 'Organize day-by-day travel timelines, custom stops, arrival times, and waypoint sequences in one synchronized workspace.',
    icon: 'sparkles',
  },
  {
    title: 'Interactive Route Mapping',
    desc: 'Visualize your entire journey path, stop coordinates, and transit connections with Leaflet interactive maps.',
    icon: 'map',
  },
  {
    title: 'Expense & Budget Tracking',
    desc: 'Allocate spending caps across transport, accommodation, food, and activities with interactive visual charts.',
    icon: 'wallet',
  },
  {
    title: 'Categorized Packing Organizers',
    desc: 'Keep clothing, electronics, documents, and essentials checked off before departure with category organizers.',
    icon: 'shield',
  },
  {
    title: 'Curated Destination Search',
    desc: 'Discover global destinations by region, explore top attractions, and add stops directly to your itinerary.',
    icon: 'globe',
  },
  {
    title: 'Public Community Route Sharing',
    desc: 'Publish read-only trip itineraries for fellow explorers or clone community-crafted journeys into your planner.',
    icon: 'heart',
  },
  {
    title: 'Private Travel Notes & Vault',
    desc: 'Keep flight details, lodging confirmations, emergency contacts, and personal thoughts secured in your account.',
    icon: 'cloud',
  },
  {
    title: 'Zero Hidden Paywalls',
    desc: 'Developed for the Odoo × Parul University Hackathon 2026. All planning tools are 100% free and unlocked.',
    icon: 'users',
  },
];

export const WORKFLOW_SHOWCASE = [
  {
    title: '1. Build Your Day-by-Day Timeline',
    desc: 'Set trip dates, sequence your stops, and organize activities from morning coffee to evening viewpoints without messy spreadsheets.',
    badge: 'Itinerary Studio',
    actionText: 'Try Trip Planner',
    actionLink: '/trips/new',
  },
  {
    title: '2. Track Real Expenses Against Budget Caps',
    desc: 'Keep flights, stays, dining, and museum tickets categorized. Interactive Recharts breakdowns show exactly where every dollar or rupee goes.',
    badge: 'Budget Manager',
    actionText: 'View Dashboard',
    actionLink: '/dashboard',
  },
  {
    title: '3. Share With Confidence or Keep Private',
    desc: 'Your trips and notes are strictly private by default. When you are ready, publish a read-only community link with personal notes safely redacted.',
    badge: 'Privacy & Sharing',
    actionText: 'Explore Community',
    actionLink: '/community',
  },
];

export const GALLERY_IMAGES = [
  'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=600&q=80',
];

export const CAPABILITIES = [
  { value: 'Multi-Stop', label: 'Day-by-Day Timeline' },
  { value: 'Interactive', label: 'Leaflet Route Maps' },
  { value: 'Dynamic', label: 'Budget Categorization' },
  { value: '100% Free', label: 'Open Access Platform' },
];
