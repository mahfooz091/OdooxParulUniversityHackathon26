import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Compass, MapPin, RefreshCw } from 'lucide-react';
import Input from '../common/Input.jsx';
import Loader from '../common/Loader.jsx';
import Card from '../common/Card.jsx';
import TravelImage from '../common/TravelImage.jsx';
import EmptyState from '../common/EmptyState.jsx';
import * as cityService from '../../services/cityService.js';
import { debounce } from '../../utils/helpers.js';
import { REGIONS } from '../../utils/constants.js';
import { FALLBACK_DESTINATIONS } from '../../data/landingContent.js';

export default function CitySearch({ onPickCity, mode = 'page' }) {
  const [q, setQ] = useState('');
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('All');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('popularity');

  const debounced = useMemo(() => debounce((v) => setSearch(v), 300), []);

  useEffect(() => {
    debounced(q);
  }, [q, debounced]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['cities', { search, region, page, sort }],
    queryFn: () =>
      cityService.fetchCities({
        search: search || undefined,
        region: region === 'All' ? undefined : region,
        page,
        limit: 12,
        sort: sort === 'popularity' ? undefined : sort,
      }),
  });

  const rawCities = data?.cities || [];
  // If the remote database has no cities seeded yet, use fallback destinations for initial inspiration
  const displayedCities =
    rawCities.length > 0
      ? rawCities
      : !isLoading && !search && region === 'All' && !isError
        ? FALLBACK_DESTINATIONS.map((d) => ({
            _id: d.id,
            name: d.name,
            country: d.country,
            region: d.region,
            coverImage: d.image,
            costIndex: 3,
            description: d.description,
          }))
        : rawCities;

  return (
    <div className={mode === 'page' ? 'space-y-6 max-w-7xl mx-auto' : 'space-y-4 max-h-[65vh] overflow-y-auto pr-1'}>
      {mode === 'page' && (
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neu-navy font-heading">
            Explore Destinations
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Search worldwide cities, filter by continent, and discover curated highlights.
          </p>
        </div>
      )}

      {/* Neumorphic Search Bar */}
      <div className="relative">
        <Input
          autoFocus={mode !== 'page'}
          placeholder="Search by city name or country (e.g., Tokyo, Greece, Paris)..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
          className="text-base pl-11"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      </div>

      {/* Region Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1">
          Region:
        </span>
        {REGIONS.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => {
              setRegion(r);
              setPage(1);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              region === r
                ? 'neu-pill-active'
                : 'neu-pill'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Sort Controls */}
      <div className="flex flex-wrap gap-4 text-xs items-center text-slate-600 bg-white/70 border border-[#E2EBEB] p-2.5 rounded-xl shadow-neu-raised-sm">
        <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
          Sort By:
        </span>
        <button
          type="button"
          className={`transition-colors ${
            sort === 'popularity'
              ? 'font-bold text-teal-700 underline underline-offset-4'
              : 'hover:text-teal-700'
          }`}
          onClick={() => setSort('popularity')}
        >
          Most Popular
        </button>
        <button
          type="button"
          className={`transition-colors ${
            sort === 'cost'
              ? 'font-bold text-teal-700 underline underline-offset-4'
              : 'hover:text-teal-700'
          }`}
          onClick={() => setSort('cost')}
        >
          Cost (Low → High)
        </button>
        <button
          type="button"
          className={`transition-colors ${
            sort === 'name'
              ? 'font-bold text-teal-700 underline underline-offset-4'
              : 'hover:text-teal-700'
          }`}
          onClick={() => setSort('name')}
        >
          Alphabetical (A–Z)
        </button>
      </div>

      {/* Content Grid / States */}
      {isLoading ? (
        <div className="py-12">
          <Loader />
        </div>
      ) : isError ? (
        <div className="neu-card p-8 text-center space-y-3">
          <p className="text-sm font-semibold text-red-600">
            Unable to retrieve destinations right now.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="neu-button inline-flex items-center gap-2 text-xs font-semibold text-teal-800"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Request
          </button>
        </div>
      ) : displayedCities.length === 0 ? (
        <EmptyState
          icon={Compass}
          title="No Destinations Found"
          description={`We couldn't find any destinations matching "${search || region}". Try broadening your search or switching to another continent.`}
          action={
            <button
              type="button"
              onClick={() => {
                setQ('');
                setSearch('');
                setRegion('All');
              }}
              className="neu-button text-xs font-semibold text-teal-800"
            >
              Clear Filters
            </button>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {displayedCities.map((city) => (
            <Card
              key={city._id || city.name}
              className="overflow-hidden group hover:shadow-neu-raised-lg hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                <TravelImage
                  src={city.coverImage}
                  alt={`${city.name}, ${city.country}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111B30]/80 via-[#111B30]/25 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-teal-800 shadow-sm">
                    {city.region || 'Global'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-teal-800 shadow-sm">
                    {'$'.repeat(city.costIndex || 2)}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-bold text-lg font-heading leading-tight">{city.name}</p>
                  <p className="text-xs text-teal-200 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {city.country}
                  </p>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between gap-2 border-t border-[#E2EBEB]">
                <p className="text-xs text-slate-500 line-clamp-1 flex-1">
                  {city.description || 'Scenic routes and curated local highlights.'}
                </p>
                {onPickCity ? (
                  <button
                    type="button"
                    className="neu-button-primary text-xs px-3.5 py-2 font-semibold min-h-[36px]"
                    onClick={() => onPickCity(city)}
                  >
                    Select City
                  </button>
                ) : (
                  <button
                    type="button"
                    className="neu-button text-xs px-3.5 py-1.5 font-semibold text-teal-800"
                    onClick={() => {
                      setQ(city.name);
                    }}
                  >
                    Filter Stops
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {data?.pages > page && (
        <button
          type="button"
          className="w-full py-3 rounded-2xl bg-white border border-[#E2EBEB] shadow-neu-btn text-sm font-semibold text-teal-800 hover:bg-[#F8FCFC] active:shadow-neu-btn-pressed transition-all"
          onClick={() => setPage((p) => p + 1)}
        >
          Load More Destinations
        </button>
      )}
    </div>
  );
}
