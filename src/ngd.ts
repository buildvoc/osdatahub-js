// src/handlers/ngd.ts

import { request } from "./utils/ngd/request.js";
import { get } from "./utils/ngd/request.js";
import { Feature, type FeatureCollection } from "geojson";
import { buildUrl } from "./utils/ngd/url.js";
import { validateParams } from "./utils/validate.js";
import { BBox, Config } from "./types.js";
import { initialiseConfig } from "./utils/config.js";
import fetch from "node-fetch";
import { getCRS } from "./utils/crs.js";

export { ngd };

// Types
interface NGDExtent {
  spatial: {
    bbox: number[][];
    crs: string;
  };
  temporal: {
    interval: string[][];
    trs: string;
  };
}

interface NGDLink {
  href: string;
  rel: string;
  type: string;
  title: string;
}

interface NGDCollection {
  id: string;
  title: string;
  description: string;
  crs: string[];
  storageCrs: string;
  itemType: string;
  extent: NGDExtent;
  links: NGDLink[];
}

interface NGDCollections {
  links: NGDLink[];
  collections: NGDCollection[];
}

interface NGDQueryables {
  $schema: string;
  $id: string;
  type: string;
  title: string;
  description: string;
  properties: any;
}

interface NGDSchema {
  $schema: string;
  $id: string;
  type: string;
  title: string;
  description: string;
  extent: NGDExtent;
  properties: any;
}

async function requestNGD(config: Config): Promise<FeatureCollection> {
  return await request(config);
}

const ngd = {
  /**
   * Get NGD features.
   *
   * @param {string} apiKey - A valid OS Data Hub key
   * @param {string} collectionId - A known collection ID
   * @param {Object} options - Optional arguments
   * @param {number} [options.offset] - The starting value for the offset
   * @param {number} [options.limit] - The max number of features to return
   * @param {string} [options.crs] - CRS of return geoJSON (epsg number or full string e.g. "epsg:27700") [default WGS84]
   * @param {number[]} [options.bbox] - Bounding box [left, bottom, right, top]
   * @param {string | number} [options.bboxCRS] - CRS of bounding box (epsg number or full string e.g. "epsg:27700") [default WGS84]
   * @param {string} [options.filter] - CQL filter string
   * @param {string} [options.filterCRS] - CRS used if filter contains spatial operation (epsg number or full string e.g. "epsg:27700") [default WGS84]
   * @param {string} [options.datetime] -  A valid date-time with UTC time zone (Z) or an open or closed interval e.g. 2021-12-12T13:20:50Z
   * @return {Promise<OSFeatureCollection>} - A GeoJSON Feature Collection
   */
  features: async (
    apiKey: string,
    collectionId: string,
    {
      offset = 0,
      limit = 1000,
      bbox = null,
      datetime = null,
      filter = null,
      crs = null,
      bboxCRS = null,
      filterCRS = null,
    }: {
      offset?: number;
      limit?: number;
      bbox?: null | BBox;
      datetime?: null | string;
      filter?: null | string;
      crs?: null | string | number;
      bboxCRS?: null | string | number;
      filterCRS?: null | string | number;
    } = {}
  ): Promise<FeatureCollection> => {
    validateParams({
      apiKey,
      collectionId,
      offset,
      limit,
    });
    const config = initialiseConfig(apiKey, offset, limit);
    config.url = buildUrl(collectionId, {
      bbox,
      datetime,
      filter,
      crs,
      bboxCRS,
      filterCRS,
    });
    return await requestNGD(config);
  },

  /**
   * Get information about a specific collection - if no collection ID is given
   * function returns a list of all available collections!
   *
   * @param {string} collectionId - A known collection ID
   * @return {Promise<NGDCollection | NGDCollection[]>} - Collection information
   */
  collections: async (
    collectionId: string = ""
  ): Promise<NGDCollection | NGDCollections> => {
    const endpoint = `https://api.os.uk/features/ngd/ofa/v1/collections/${collectionId}`;
    return (await fetch(endpoint).then((response) =>
      response.json()
    )) as Promise<NGDCollection | NGDCollections>;
  },

  /**
   * Get details of the feature attributes (properties) in a given collection
   *
   * @param {string} collectionId - A known collection ID
   * @return {Promise<NGDSchema>} - Labelled schema / feature attirbutes
   */
  schema: async (collectionId: string): Promise<NGDSchema> => {
    const endpoint = `https://api.os.uk/features/ngd/ofa/v1/collections/${collectionId}/schema`;
    return (await fetch(endpoint).then((response) =>
      response.json()
    )) as Promise<NGDSchema>;
  },

  /**
   * Get all queryable attributes in a given collection
   *
   * @param {string} collectionId - A known collection ID
   * @return {Promise<NGDQueryables>} - JSON containing querable properties
   */
  queryables: async (collectionId: string): Promise<NGDQueryables> => {
    const endpoint = `https://api.os.uk/features/ngd/ofa/v1/collections/${collectionId}/queryables`;
    return (await fetch(endpoint).then((response) =>
      response.json()
    )) as Promise<NGDQueryables>;
  },

  /**
   * Get GeoJSON feature with specific feature ID
   *
   * @param {string} collectionId - A known collection ID
   * @param {string} featureId - A known feature ID
   * @param {Object} options - Optional arguments
   * @param {string} [options.crs] - CRS of return geoJSON (epsg number or full string e.g. "epsg:27700") [default WGS84]
   * @return {Feature} - GeoJSON Feature
   */
  feature: async (
    apiKey: string,
    collectionId: string,
    featureId: string,
    {
      crs = null,
    }: {
      crs?: null | string | number;
    } = {}
  ): Promise<Feature> => {
    const endpoint = buildUrl(collectionId, { featureId, crs });
    return (await get(endpoint, apiKey).then((response) =>
      response.json()
    )) as Promise<Feature>;
  },
};
