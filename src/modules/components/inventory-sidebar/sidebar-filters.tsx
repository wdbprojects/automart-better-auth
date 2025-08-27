"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import SearchInput from "./search-input";
import TaxonomyFilters from "./taxonomy-filters";
import { MinMaxResultType, TaxonomyFilterProps } from "@/config/types";
import RangeFilters from "./range-filters";
import { MAX_SAFE_INTEGER_PG } from "@/config/constants";

import {
  BodyType,
  Color,
  CurrencyCode,
  FuelType,
  OdometerUnit,
  Transmission,
} from "@prisma/client";
import { capitalizeFirstLetter, formatTransmission } from "@/lib/format-data";
import SelectCompOrig from "@/components/shared/select-comp-orig";

interface SidebarFilterProps extends TaxonomyFilterProps {
  minMaxResult: MinMaxResultType;
  queryStates: any;
}

const SidebarFilters = (props: SidebarFilterProps) => {
  const { searchParams, handleChange, minMaxResult, queryStates } = props;
  const { _min, _max } = minMaxResult;

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupLabel className="font-semibold">
        Search by keyword
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="px-2 block">
          <SearchInput
            placeholder="Search classifieds"
            className="pl-8 rounded-full "
          />
        </div>
      </SidebarGroupContent>
      <hr className="mx-2 mt-4 mb-1" />
      <SidebarGroupLabel className="font-semibold">
        Search by taxonomy
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="px-2 bock">
          <TaxonomyFilters
            handleChange={handleChange}
            searchParams={searchParams}
          />
        </div>
      </SidebarGroupContent>
      <hr className="mx-2 mt-4 mb-1" />
      <SidebarGroupLabel className="font-semibold">
        Search by range
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="px-2 block space-y-4">
          <RangeFilters
            label="Year"
            minName="minYear"
            maxName="maxYear"
            defaultMin={_min.year || 1925}
            defaultMax={_max.year || new Date().getFullYear()}
            handleChange={handleChange}
            searchParams={searchParams}
          />
          <RangeFilters
            label="Price"
            minName="minPrice"
            maxName="maxPrice"
            defaultMin={_min.price || 0}
            defaultMax={_max.price || Number(MAX_SAFE_INTEGER_PG / 100)}
            handleChange={handleChange}
            searchParams={searchParams}
            increment={1000000}
            thousandSeparator
            currency={{ currencyCode: "USD" }}
          />
          <RangeFilters
            label="Odometer Reading"
            minName="minReading"
            maxName="maxReading"
            defaultMin={_min.odometerReading || 0}
            defaultMax={_max.odometerReading || 1000000}
            handleChange={handleChange}
            searchParams={searchParams}
            increment={5000}
            thousandSeparator
          />
        </div>
      </SidebarGroupContent>
      <hr className="mx-2 mt-4 mb-1" />
      <SidebarGroupLabel className="font-semibold">
        Search by other filters
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="px-2 block space-y-4">
          <div className="mt-1 flex items-center gap-2 justify-between">
            <SelectCompOrig
              label="Currency"
              name="currency"
              value={queryStates.currency || ""}
              onChange={handleChange}
              options={Object.values(CurrencyCode).map((value) => {
                return { label: value, value: value };
              })}
            />
            <SelectCompOrig
              label="Odometer Unit"
              name="odometerUnit"
              value={queryStates.odometerUnit || ""}
              onChange={handleChange}
              options={Object.values(OdometerUnit).map((value) => {
                return { label: capitalizeFirstLetter(value), value: value };
              })}
            />
          </div>
          <div className="mt-1 flex items-center gap-2 justify-between">
            <SelectCompOrig
              label="Transmission"
              name="transmission"
              value={queryStates.transmission || ""}
              onChange={handleChange}
              options={Object.values(Transmission).map((value) => {
                return { label: formatTransmission(value), value: value };
              })}
            />
            <SelectCompOrig
              label="Fuel Type"
              name="fuelType"
              value={queryStates.fuelType || ""}
              onChange={handleChange}
              options={Object.values(FuelType).map((value) => {
                return { label: capitalizeFirstLetter(value), value: value };
              })}
            />
          </div>
          <div className="mt-1 flex items-center gap-2 justify-between">
            <SelectCompOrig
              label="Body Type"
              name="bodyType"
              value={queryStates.bodyType || ""}
              onChange={handleChange}
              options={Object.values(BodyType).map((value) => {
                return { label: capitalizeFirstLetter(value), value: value };
              })}
            />
            <SelectCompOrig
              label="Color"
              name="color"
              value={queryStates.color || ""}
              onChange={handleChange}
              options={Object.values(Color).map((value) => {
                return { label: capitalizeFirstLetter(value), value: value };
              })}
            />
          </div>
          <div className="mt-1 flex items-center gap-2 justify-between">
            <SelectCompOrig
              label="Doors"
              name="doors"
              value={queryStates.doors || ""}
              onChange={handleChange}
              options={Array.from({ length: 6 }).map((_, index) => {
                return {
                  label: Number(index + 2).toString(),
                  value: Number(index + 2).toString(),
                };
              })}
            />
            <SelectCompOrig
              label="Seats"
              name="seats"
              value={queryStates.seats || ""}
              onChange={handleChange}
              options={Array.from({ length: 6 }).map((_, index) => {
                return {
                  label: Number(index + 2).toString(),
                  value: Number(index + 2).toString(),
                };
              })}
            />
          </div>
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarFilters;
