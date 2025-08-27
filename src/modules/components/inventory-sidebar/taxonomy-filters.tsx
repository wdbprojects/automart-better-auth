"use client";

import { useEffect, useState } from "react";
import {
  AwaitedPageProps,
  FilterOptions,
  TaxonomyFilterProps,
} from "@/config/types";
import { endpoints } from "@/config/endpoints";
import { api } from "@/lib/api-client";
import SelectCompOrig from "@/components/shared/select-comp-orig";

const TaxonomyFilters = (props: TaxonomyFilterProps) => {
  const { searchParams, handleChange } = props;
  const [makes, setMakes] = useState<FilterOptions<string, string>>([]);
  const [models, setModels] = useState<FilterOptions<string, string>>([]);
  const [modelVariants, setModelVariants] = useState<
    FilterOptions<string, string>
  >([]);

  useEffect(() => {
    (async function fetchMakesOptions() {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(
        searchParams as Record<string, string>,
      )) {
        if (value) {
          params.set(key, value as string);
        }
      }
      const url = new URL(endpoints.taxonomy, window.location.href);
      url.search = params.toString();

      const data = await api.get<{
        makes: FilterOptions<string, string>;
        models: FilterOptions<string, string>;
        modelVariants: FilterOptions<string, string>;
      }>(url.toString());
      setMakes(data.makes);
      setModels(data.models);
      setModelVariants(data.modelVariants);
    })();
  }, [searchParams]);

  return (
    <div className="space-y-4">
      {/* MAKE */}
      <SelectCompOrig
        label="Make"
        name="make"
        value={searchParams?.make as string}
        options={makes}
        placeholder="Select a car make"
        noDefault={true}
        onChange={handleChange}
      />
      <SelectCompOrig
        label="Model"
        name="model"
        value={searchParams?.model as string}
        options={models}
        placeholder="Select a car model"
        noDefault={true}
        onChange={handleChange}
        disabled={!models.length}
      />
      <SelectCompOrig
        label="Model Variant"
        name="modelVariant"
        value={searchParams?.modelVariant as string}
        options={modelVariants}
        placeholder="Select a car model variant"
        noDefault={true}
        onChange={handleChange}
        disabled={!modelVariants.length}
      />
    </div>
  );
};

export default TaxonomyFilters;
