import {
  FiltersState,
  setFilters,
  setViewMode,
  toggleFiltersFullOpen,
} from "@/state";
import { useAppSelector } from "@/state/redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { cleanParams, cn, formatPriceValue } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertyTypeIcons } from "@/lib/constants";

const FiltersBar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const filters = useAppSelector((state) => state.global.filters);
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );
  const viewMode = useAppSelector((state) => state.global.viewMode);
  const [searchInput, setSearchInput] = useState(filters.location);

  const updateURL = debounce((newFilters: FiltersState) => {
    const cleanFilters = cleanParams(newFilters);
    const updatedSearchParams = new URLSearchParams();

    Object.entries(cleanFilters).forEach(([key, value]) => {
      updatedSearchParams.set(
        key,
        Array.isArray(value) ? value.join(",") : value.toString()
      );
    });

    router.push(`${pathname}?${updatedSearchParams.toString()}`);
  });

  const handleFilterChange = (
    key: string,
    value: any,
    isMin: boolean | null
  ) => {
    let newValue = value;

    if (key === "priceRange" || key === "squareFeet") {
      const currentArrayRange = [...filters[key]];
      if (isMin !== null) {
        const index = isMin ? 0 : 1;
        currentArrayRange[index] = value === "any" ? null : Number(value);
      }
      newValue = currentArrayRange;
    } else if (key === "coordinates") {
      newValue = value === "any" ? [0, 0] : value.map(Number);
    } else {
      newValue = value === "any" ? "any" : value;
    }

    const newFilters = { ...filters, [key]: newValue };
    dispatch(setFilters(newFilters));
    updateURL(newFilters);
  };

  const handleLocationSearch = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchInput
        )}.json?access_token=${
          process.env.NEXT_PUBLIC_MAPBOX_API_ACCESS_TOKEN  
        }&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        dispatch(
          setFilters({
            location: searchInput,
            coordinates: [lng, lat],
          })
        );
      }
    } catch (err) {
      console.error("Error search location:", err);
    }
  };

  return (
  <div className="flex flex-col md:flex-row md:justify-between w-full gap-4 py-4 px-2">
    {/* Left - Filters Section */}
    <div className="flex flex-wrap items-center gap-3">
      {/* All Filters */}
      <Button
        variant="outline"
        className={cn(
          "gap-2 rounded-xl border-primary-400 hover:bg-secondary-500 hover:text-primary-100",
          isFiltersFullOpen && ""
        )}
        onClick={() => dispatch(toggleFiltersFullOpen())}
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </Button>

      {/* Location Search */}
      <div className="flex">
        <Input
          placeholder="Search location"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-28 sm:w-40 rounded-l-xl rounded-r-none border-primary-400 border-r-0"
        />
        <Button
          onClick={handleLocationSearch}
          className="rounded-r-xl rounded-l-none border-l-none border-primary-400 shadow-none border hover:bg-secondary-700 hover:text-primary-50"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Price Range */}
      <div className="flex gap-1">
        <Select
          value={filters.priceRange[0]?.toString() || "any"}
          onValueChange={(value) => handleFilterChange("priceRange", value, true)}
        >
          <SelectTrigger className="w-24 rounded-xl border">
            <SelectValue>{formatPriceValue(filters.priceRange[0], true)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Min</SelectItem>
            {[500, 1000, 1500, 2000, 3000, 5000].map((price) => (
              <SelectItem key={price} value={price.toString()}>
                ${price / 1000}k+
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.priceRange[1]?.toString() || "any"}
          onValueChange={(value) => handleFilterChange("priceRange", value, false)}
        >
          <SelectTrigger className="w-24 rounded-xl border">
            <SelectValue>{formatPriceValue(filters.priceRange[1], false)}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Max</SelectItem>
            {[1000, 2000, 3000, 5000, 10000].map((price) => (
              <SelectItem key={price} value={price.toString()}>
                &lt;${price / 1000}k
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Beds & Baths */}
      <div className="flex gap-1">
        <Select
          value={filters.beds}
          onValueChange={(value) => handleFilterChange("beds", value, null)}
        >
          <SelectTrigger className="w-24 rounded-xl border-primary-400">
            <SelectValue placeholder="Beds" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Beds</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
            <SelectItem value="4">4+</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.baths}
          onValueChange={(value) => handleFilterChange("baths", value, null)}
        >
          <SelectTrigger className="w-24 rounded-xl border-primary-400">
            <SelectValue placeholder="Baths" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Baths</SelectItem>
            <SelectItem value="1">1+</SelectItem>
            <SelectItem value="2">2+</SelectItem>
            <SelectItem value="3">3+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <Select
        value={filters.propertyType || "any"}
        onValueChange={(value) => handleFilterChange("propertyType", value, null)}
      >
        <SelectTrigger className="w-32 rounded-xl border-primary-400">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any">Any</SelectItem>
          {Object.entries(PropertyTypeIcons).map(([type, Icon]) => (
            <SelectItem key={type} value={type}>
              <div className="flex items-center">
                <Icon className="w-4 h-4 mr-2" />
                {type}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    {/* Right - View Mode */}
    <div className="flex justify-end items-center gap-3">
      <div className="flex border rounded-xl overflow-hidden">
        <Button
          variant="ghost"
          className={cn(
            "px-3 py-1 rounded-none rounded-l-xl hover:bg-secondary-400 hover:text-secondary-500",
            viewMode === "list" && "bg-primary-700 text-primary-50"
          )}
          onClick={() => dispatch(setViewMode("list"))}
        >
          <List className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "px-3 py-1 rounded-none rounded-r-xl hover:bg-secondary-400 hover:text-primary-50",
            viewMode === "grid" && "bg-primary-700 text-primary-50"
          )}
          onClick={() => dispatch(setViewMode("grid"))}
        >
          <Grid className="w-5 h-5" />
        </Button>
      </div>
    </div>
  </div>
);

};

export default FiltersBar;
