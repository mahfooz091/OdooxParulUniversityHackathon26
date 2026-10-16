import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import City from '../models/City.js';
import Activity from '../models/Activity.js';
import Trip from '../models/Trip.js';
import Stop from '../models/Stop.js';
import Budget from '../models/Budget.js';

dotenv.config();

const unsplash = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const citySeeds = [
  ['Paris', 'France', 'Europe', 'Iconic art, cuisine, and riverside charm.', 4, 98, '1502602898657-3e91760cbb34', 48.8566, 2.3522],
  ['Tokyo', 'Japan', 'Asia', 'Neon skylines and timeless temples.', 5, 95, '1540959733332-eab4deabeeaf', 35.6762, 139.6503],
  ['New York', 'United States', 'Americas', 'The city that never sleeps.', 5, 99, '1485871981521-5b1fd3805eee', 40.7128, -74.006],
  ['London', 'United Kingdom', 'Europe', 'Royal history and world-class museums.', 5, 96, '1513635269975-59663e0ac1ad', 51.5074, -0.1278],
  ['Rome', 'Italy', 'Europe', 'Ancient ruins and Italian dolce vita.', 4, 94, '1529154036614-a60975f5c760', 41.9028, 12.4964],
  ['Barcelona', 'Spain', 'Europe', 'Gaudi architecture and Mediterranean beaches.', 4, 92, '1583422409516-2895a77efded', 41.3851, 2.1734],
  ['Dubai', 'United Arab Emirates', 'Asia', 'Futuristic skyline and desert adventures.', 5, 90, '1512453979798-5ea266f8880c', 25.2048, 55.2708],
  ['Singapore', 'Singapore', 'Asia', 'Garden city with hawker culture.', 5, 91, '1506351421178-63b52a2d2562', 1.3521, 103.8198],
  ['Sydney', 'Australia', 'Oceania', 'Harbor icons and coastal walks.', 4, 89, '1506973035872-a4ec16b8e8d9', -33.8688, 151.2093],
  ['Los Angeles', 'United States', 'Americas', 'Entertainment capital with endless sunshine.', 4, 93, '1580655653885-65763b2597d0', 34.0522, -118.2437],
  ['Berlin', 'Germany', 'Europe', 'Creative energy and layered history.', 3, 87, '1560969184-10fe8719e047', 52.52, 13.405],
  ['Amsterdam', 'Netherlands', 'Europe', 'Canals, bikes, and cozy cafes.', 4, 88, '1549918864-48ac978761a4', 52.3676, 4.9041],
  ['Prague', 'Czech Republic', 'Europe', 'Fairytale Old Town and bridges.', 3, 85, '1519671482749-fd09be7ccebf', 50.0755, 14.4378],
  ['Vienna', 'Austria', 'Europe', 'Classical music and imperial palaces.', 4, 84, '1516550893923-42d28e5677af', 48.2082, 16.3738],
  ['Lisbon', 'Portugal', 'Europe', 'Hills, tiles, and Atlantic breezes.', 3, 86, '1585208798174-6cedd86e019a', 38.7223, -9.1393],
  ['Istanbul', 'Turkey', 'Europe', 'Continents meet at the Bosphorus.', 3, 90, '1527838832700-5059252407fa', 41.0082, 28.9784],
  ['Cairo', 'Egypt', 'Africa', 'Pyramids and Nile-side bustle.', 2, 82, '1539650116574-8efeb43e2750', 30.0444, 31.2357],
  ['Marrakech', 'Morocco', 'Africa', 'Souks, riads, and desert gateways.', 3, 83, '1548013146-72479768bada', 31.6295, -7.9811],
  ['Cape Town', 'South Africa', 'Africa', 'Table Mountain and wine routes.', 3, 84, '1580618672591-eb180b1a973f', -33.9249, 18.4241],
  ['Nairobi', 'Kenya', 'Africa', 'Safari hub with vibrant markets.', 2, 78, '1516426122078-c23e76319801', -1.2921, 36.8219],
  ['Bangkok', 'Thailand', 'Asia', 'Temples, street food, and river life.', 2, 94, '1508009603885-50cf7c579365', 13.7563, 100.5018],
  ['Hong Kong', 'Hong Kong', 'Asia', 'Harbor views and dim sum.', 5, 92, '1506973035872-a4ec16b8e8d9', 22.3193, 114.1694],
  ['Seoul', 'South Korea', 'Asia', 'K-culture, cuisine, and nightlife.', 4, 91, '1538485399081-7191377e8241', 37.5665, 126.978],
  ['Beijing', 'China', 'Asia', 'Great Wall access and imperial heritage.', 3, 89, '1508804185872-d7badad00f7d', 39.9042, 116.4074],
  ['Shanghai', 'China', 'Asia', 'Pudong skyline and historic Bund.', 4, 90, '1506973035872-a4ec16b8e8d9', 31.2304, 121.4737],
  ['Mumbai', 'India', 'Asia', 'Bollywood energy and coastal contrasts.', 3, 88, '1570168007204-dfb528c6958f', 19.076, 72.8777],
  ['Delhi', 'India', 'Asia', 'Mughal monuments and spice markets.', 2, 87, '1587474260584-136574528ed5', 28.6139, 77.209],
  ['Melbourne', 'Australia', 'Oceania', 'Laneways, coffee, and sports.', 4, 86, '1506973035872-a4ec16b8e8d9', -37.8136, 144.9631],
  ['Auckland', 'New Zealand', 'Oceania', 'Harbor city near geothermal wonders.', 3, 82, '1506973035872-a4ec16b8e8d9', -36.8485, 174.7633],
  ['Toronto', 'Canada', 'Americas', 'Multicultural neighborhoods on Lake Ontario.', 4, 88, '1494522855154-9297ac14b55f', 43.6532, -79.3832],
  ['Vancouver', 'Canada', 'Americas', 'Mountains meet the Pacific.', 4, 87, '1560814304-4f05b62af116', 49.2827, -123.1207],
  ['Mexico City', 'Mexico', 'Americas', 'Aztec roots and creative cuisine.', 2, 85, '1516306580123-e6e52b1b7b5f', 19.4326, -99.1332],
  ['Rio de Janeiro', 'Brazil', 'Americas', 'Beaches, samba, and Sugarloaf views.', 3, 91, '1516306580123-e6e52b1b7b5f', -22.9068, -43.1729],
  ['Buenos Aires', 'Argentina', 'Americas', 'Tango, steak, and Parisian avenues.', 3, 84, '1516306580123-e6e52b1b7b5f', -34.6037, -58.3816],
  ['Lima', 'Peru', 'Americas', 'Coastal capital gateway to Machu Picchu.', 2, 80, '1516306580123-e6e52b1b7b5f', -12.0464, -77.0428],
  ['Chicago', 'United States', 'Americas', 'Architecture river tours and deep dish.', 4, 86, '1494522855154-9297ac14b55f', 41.8781, -87.6298],
  ['San Francisco', 'United States', 'Americas', 'Golden Gate and tech innovation.', 5, 93, '1501594907352-04cda38ebc29', 37.7749, -122.4194],
  ['Miami', 'United States', 'Americas', 'Art deco beaches and nightlife.', 4, 88, '1506953823976-52e1fdc0149a', 25.7617, -80.1918],
  ['Edinburgh', 'United Kingdom', 'Europe', 'Castle rock and festival city.', 4, 83, '1506377247377-2a5b3b417ebb', 55.9533, -3.1883],
  ['Dublin', 'Ireland', 'Europe', 'Literary pubs and Georgian streets.', 4, 82, '1549918864-48ac978761a4', 53.3498, -6.2603],
  ['Stockholm', 'Sweden', 'Europe', 'Island archipelago and Nordic design.', 5, 81, '1509356843151-3e7d96241e11', 59.3293, 18.0686],
  ['Oslo', 'Norway', 'Europe', 'Fjords nearby and modern museums.', 5, 79, '1516426122078-c23e76319801', 59.9139, 10.7522],
  ['Helsinki', 'Finland', 'Europe', 'Sauna culture and design district.', 4, 78, '1538332576228-eb5b4c4de6f5', 60.1699, 24.9384],
  ['Warsaw', 'Poland', 'Europe', 'Rebuilt Old Town and pierogi.', 2, 76, '1519671482749-fd09be7ccebf', 52.2297, 21.0122],
  ['Athens', 'Greece', 'Europe', 'Ancient Acropolis and island ferries.', 3, 87, '1570077188670-e3a8d69ac5ff', 37.9838, 23.7275],
  ['Reykjavik', 'Iceland', 'Europe', 'Northern lights and geothermal pools.', 5, 77, '1531366936337-7c912a4589a7', 64.1466, -21.9426],
  ['Zurich', 'Switzerland', 'Europe', 'Alpine trains and lakeside calm.', 5, 80, '1531366936337-7c912a4589a7', 47.3769, 8.5417],
  ['Brussels', 'Belgium', 'Europe', 'Chocolate, beer, and EU capital.', 4, 79, '1502602898657-3e91760cbb34', 50.8503, 4.3517],
  ['Copenhagen', 'Denmark', 'Europe', 'Hygge, cycling, and Nyhavn.', 5, 83, '1549918864-48ac978761a4', 55.6761, 12.5683],
  ['Hanoi', 'Vietnam', 'Asia', 'Old Quarter chaos and pho stalls.', 2, 86, '1508009603885-50cf7c579365', 21.0285, 105.8542],
  ['Kuala Lumpur', 'Malaysia', 'Asia', 'Petronas Towers and street markets.', 3, 85, '1508009603885-50cf7c579365', 3.139, 101.6869],
];

const categories = ['sightseeing', 'food', 'adventure', 'culture', 'shopping'];

const activityTemplates = [
  ['Old Town Walking Tour', 'sightseeing', 25, 3],
  ['Sunset Viewpoint Hike', 'adventure', 35, 4],
  ['Street Food Crawl', 'food', 45, 3],
  ['Museum Pass Day', 'culture', 40, 5],
  ['Local Cooking Class', 'food', 65, 4],
  ['Kayak & Coastal Ride', 'adventure', 55, 3],
  ['Guided History Tour', 'culture', 30, 2],
  ['Night Market Visit', 'shopping', 20, 2],
];

async function seed() {
  await connectDB();
  await Stop.deleteMany({});
  await Trip.deleteMany({});
  await Budget.deleteMany({});
  await Activity.deleteMany({});
  await City.deleteMany({});
  await User.deleteMany({});

  const cities = [];
  for (const row of citySeeds) {
    const [name, country, region, description, costIndex, popularity, imgId, lat, lng] = row;
    const c = await City.create({
      name,
      country,
      region,
      description,
      costIndex,
      popularity,
      coverImage: unsplash(imgId),
      coordinates: { lat, lng },
      tags: ['travel', region.toLowerCase()],
    });
    cities.push(c);
  }

  let activityCount = 0;
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    const perCity = 4;
    for (let j = 0; j < perCity; j++) {
      const tpl = activityTemplates[(i + j) % activityTemplates.length];
      const cat = categories[(i + j) % categories.length];
      await Activity.create({
        cityId: city._id,
        name: `${tpl[0]} — ${city.name}`,
        description: `Curated experience in ${city.name} focusing on ${cat}.`,
        category: cat,
        estimatedCost: tpl[2] + (j % 3) * 5,
        duration: tpl[3],
        image: city.coverImage,
        rating: 3.5 + (j % 3) * 0.5,
      });
      activityCount++;
    }
  }

  const admin = await User.create({
    name: 'Colombiator Admin',
    email: 'admin@colombiator.com',
    password: 'Admin@123',
    role: 'admin',
    city: 'Bogotá',
    country: 'Colombia',
  });

  const demoUsers = [];
  for (let i = 1; i <= 5; i++) {
    demoUsers.push(
      await User.create({
        name: `Demo Traveler ${i}`,
        email: `demo${i}@colombiator.com`,
        password: 'Demo@123',
        phone: `+1000000000${i}`,
        city: cities[i * 5].name,
        country: cities[i * 5].country,
        savedDestinations: [cities[0]._id, cities[1]._id],
      })
    );
  }

  const trip1 = await Trip.create({
    userId: demoUsers[0]._id,
    title: 'Euro Highlights',
    description: 'Week across iconic European hubs.',
    startDate: new Date(Date.now() + 86400000 * 10),
    endDate: new Date(Date.now() + 86400000 * 24),
    coverPhoto: cities[0].coverImage,
    isPublic: true,
    totalBudget: 3200,
    publicSlug: 'demo-euro-' + Date.now().toString(36),
  });
  await Budget.create({
    tripId: trip1._id,
    transport: 600,
    accommodation: 1200,
    activities: 700,
    meals: 500,
    miscellaneous: 200,
    dailyLimit: 250,
  });

  const actsParis = await Activity.find({ cityId: cities[0]._id }).limit(3);
  const stop1 = await Stop.create({
    tripId: trip1._id,
    cityId: cities[0]._id,
    cityName: cities[0].name,
    country: cities[0].country,
    arrivalDate: trip1.startDate,
    departureDate: new Date(new Date(trip1.startDate).getTime() + 86400000 * 3),
    activities: actsParis.map((a) => a._id),
    order: 0,
    stopBudget: 900,
  });
  const actsBarca = await Activity.find({ cityId: cities[5]._id }).limit(2);
  const stop2 = await Stop.create({
    tripId: trip1._id,
    cityId: cities[5]._id,
    cityName: cities[5].name,
    country: cities[5].country,
    arrivalDate: new Date(new Date(trip1.startDate).getTime() + 86400000 * 4),
    departureDate: trip1.endDate,
    activities: actsBarca.map((a) => a._id),
    order: 1,
    stopBudget: 800,
  });
  trip1.stops = [stop1._id, stop2._id];
  await trip1.save();

  console.log(`Seeded ${cities.length} cities, ${activityCount} activities.`);
  console.log(`Admin: admin@colombiator.com / Admin@123`);
  console.log(`Demo: demo1@colombiator.com / Demo@123 (demo2...demo5)`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
