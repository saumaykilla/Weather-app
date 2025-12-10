

"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Check } from "lucide-react";

interface City {
  id: number;
  name: string;
  countryCode: string;
}

interface WeatherFormProps {
  onSearch: (city: string) => void;
  loading: boolean;
  isDarkMode: boolean;
}

const WeatherForm: React.FC<WeatherFormProps> = ({
  onSearch,
  loading,
  isDarkMode,
}) => {

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const [cities, setCities] = useState<City[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  const { handleSubmit } = useForm();

  useEffect(() => {
    async function fetchCities() {
      if (!debouncedQuery || debouncedQuery.length < 3) {
        setCities([]);
        return;
      }

      setSearching(true);
      try {
        const response = await axios.get(
          `/api/city?namePrefix=${debouncedQuery}`
        );
        setCities(response.data?.data || []);
      } catch {
        // console.error("Failed to fetch cities", error); // remove unused error
        setCities([]);
      } finally {
        setSearching(false);
      }
    }

    fetchCities();
  }, [debouncedQuery]);

  const handleSelect = (currentValue: string) => {
    setSelectedCity(currentValue);
    setQuery(currentValue);
    setOpen(false);
  };

  const handleValueChange = (value: string) => {
    setQuery(value);
    setOpen(!!value);
  };

  const onSubmit = () => {
    if (selectedCity) {
      onSearch(selectedCity);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block text-sm font-medium">Select a City:</label>

      <div className="relative">
        <Popover open={open && query.length > 0} onOpenChange={setOpen}>
          <Command
            shouldFilter={false}
            className={`rounded-lg border shadow-md ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <PopoverTrigger asChild>
              <CommandInput
                placeholder="Search for a city..."
                value={query}
                onValueChange={handleValueChange}
                onFocus={() => {
                  if (query) setOpen(true);
                }}
                className={`border-none focus:ring-0 ${
                    isDarkMode ? "text-gray-100 placeholder:text-gray-400" : "text-gray-900 placeholder:text-gray-500"
                }`}
              />
            </PopoverTrigger>
            <PopoverContent
              className="p-0 w-(--radix-popover-trigger-width)"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <CommandList>
                {searching && (
                  <div className="py-6 text-center text-sm">Searching...</div>
                )}
                {!searching && cities.length === 0 && (
                  <CommandEmpty>No city found.</CommandEmpty>
                )}
                {!searching &&
                  cities.map((city) => (
                    <CommandItem
                      key={city.id}
                      value={city.name}
                      onSelect={handleSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCity === city.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {city.name}, {city.countryCode}
                    </CommandItem>
                  ))}
              </CommandList>
            </PopoverContent>
          </Command>
        </Popover>
      </div>

      <Button
        type="submit"
        disabled={loading || !selectedCity}
        className={`w-full py-2 rounded-md font-semibold transition-colors duration-200
                    ${
                      isDarkMode
                        ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-300 dark:hover:bg-blue-400 dark:text-gray-900"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }
                    ${
                      (loading || !selectedCity) &&
                      "opacity-70 cursor-not-allowed"
                    }`}
      >
        {loading ? (
          <>
            <i className="fa-solid fa-spinner fa-spin mr-2 dark:text-gray-900"></i>{" "}
            Fetching...
          </>
        ) : (
          <>
            <i
              className={`fa-solid fa-cloud-arrow-down mr-2 ${
                isDarkMode ? "text-gray-900" : "text-white"
              }`}
            ></i>{" "}
            Get Weather
          </>
        )}
      </Button>
    </form>
  );
};

export default WeatherForm;
