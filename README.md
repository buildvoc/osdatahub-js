[![Tests Passing](https://github.com/OrdnanceSurvey/osdatahub-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/OrdnanceSurvey/osdatahub-js/actions/workflows/node.js.yml)
![Node Version](https://img.shields.io/badge/Node-v16%2B-brightgreen)
[![Browser Compatibility](https://img.shields.io/badge/Browser%20Compatibility-Supported-brightgreen)]()

[![Top Language](https://img.shields.io/github/languages/top/OrdnanceSurvey/osdatahub-js)](https://img.shields.io/github/languages/top/OrdnanceSurvey/osdatahub-js)
[![Open Government License](https://img.shields.io/badge/license-OGL-blue)](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)
[![GitHub issues](https://img.shields.io/github/issues/OrdnanceSurvey/osdatahub-js)](https://github.com/OrdnanceSurvey/osdatahub-js/issues)

# osdatahub (JavaScript)

> Coding in Python?  
> `osdatahub` has a sibling package for Python developers with similar functionality, [check it out here](https://github.com/OrdnanceSurvey/osdatahub).

`osdatahub` is a JavaScript package from Ordnance Survey (OS) that makes it easier to interact with the OS Data Hub APIs. The package helps you get started with our data in GeoJSON format, and rapidly build prototypes, test new ideas, or collect data for analyses.

Ordnance Survey is the national mapping agency for Great Britain and produces a large variety of mapping and geospatial products. Much of OS' data is available via the [OS Data Hub](https://osdatahub.os.uk), a platform that hosts both free and premium data products. `osdatahub` provides a user-friendly way to interact with these data products.

![Ordnance Survey Logo](https://raw.githubusercontent.com/OrdnanceSurvey/osdatahub-js/main/media/os-logo.png)

## Links <!-- omit in toc -->

- GitHub repo: [https://github.com/OrdnanceSurvey/osdatahub-js](https://github.com/OrdnanceSurvey/osdatahub-js)
- Documentation: [https://ordnancesurvey.github.io/osdatahub-js/docs/index.html](https://ordnancesurvey.github.io/osdatahub-js/docs/index.html)
- NPM: [https://www.npmjs.com/package/osdatahub](https://www.npmjs.com/package/osdatahub)
- Data Hub Explorer: [https://labs.os.uk/prototyping/data-hub-explorer/](https://labs.os.uk/prototyping/data-hub-explorer/)
- Free Software: [Open Government License](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/)

**Note:** This package is under active development.

## Contents <!-- omit in toc -->

- [osdatahub (JavaScript)](#osdatahub-javascript)
  - [Supported APIs](#supported-apis)
  - [Features](#features)
  - [Installation](#installation)
    - [NodeJS (via NPM)](#nodejs-via-npm)
    - [Browser](#browser)
  - [Getting Started](#getting-started)
    - [OS NGD API](#os-ngd-api)
      - [**Features (Collection Items)**](#features-collection-items)
      - [**Feature (Single Collection Item)**](#feature-single-collection-item)
      - [**Collections**](#collections)
      - [**Schema**](#schema)
      - [**Queryables**](#queryables)
    - [OS Places API](#os-places-api)
      - [**GeoJSON Polygon**](#geojson-polygon)
      - [**Point-Based Radius**](#point-based-radius)
      - [**Nearest Feature**](#nearest-feature)
      - [**Bounding Box**](#bounding-box)
      - [**UPRN (Unique Property Reference Number)**](#uprn-unique-property-reference-number)
      - [**Postcode (Full or Partial)**](#postcode-full-or-partial)
      - [**Find (Plain Text Search)**](#find-plain-text-search)
    - [OS Names API](#os-names-api)
      - [**Nearest Feature**](#nearest-feature-1)
      - [**Find (Plain Text Search)**](#find-plain-text-search-1)
  - [Authors](#authors)
  - [Contribute](#contribute)
    - [Support](#support)

## Supported APIs

`osdatahub` (JavaScript) supports the following Ordnance Survey APIs:

- OS Names API
- OS Places API
- OS NGD Features API

## Features

- **Access to Ordnance Survey data in 2 lines of code**  
  This wrapper abstracts the HTTP request process, so you can get to work on your geospatial project without configuring API endpoints.

- **Find features via geospatial and textual queries**  
  Use all available geospatial and textual search methods supported by each OS API to find and return data.

- **Request as much data as you need with automatic API paging**  
  By default, `osdatahub` will attempt to return a maximum of 1000 features. You can customise this by setting custom start (`offset`) and end (`limit`) values. Where multiple requests are required, `osdatahub` will merge these into a single response object. _Please note that requesting a large amount of data may have cost implications._

- **Developer-Friendly GeoJSON Responses**  
  The `osdatahub` package exclusively uses GeoJSON and lng/lat (`ESPG:4326`) coordinates for returning data, please note that British National Grid coordinates (`ESPG:27700`) **are not supported**. You can use tools such as [bboxfinder.com](http://bboxfinder.com/) or [geojson.io](https://geojson.io/) to collect input geometry for use in `osdatahub`. Responses from non-GeoJSON APIs are returned in specification-compliant GeoJSON format.

- **Pre- and Post- Request Error Handing**  
  `osdatahub` will handle some types of error prior to sending a request, such as invalid geometry, or a missing API key. Errors on the server (`HTTP 5**`/`4**` codes) are also handled.

## Installation

You'll need to sign-up for an account on the [OS Data Hub](https://osdatahub.os.uk) to create an API key:

1. Navigate to the _API Dashboard_ located on the top navigation bar
2. Go to _My Projects_
3. Click _Create a new project_, give your project a name, then click _Create project_
4. Select _Add an API to this project_
5. Choose the APIs you would like to use and click _Done_

### NodeJS (via NPM)

Install the `osdatahub` package into your project, via NPM:

```bash
npm install osdatahub
```

You can then import `osdatahub` into your code:

```javascript
// option 1 - import all the things (suggested)
import * as osdatahub from "osdatahub";
```

```javascript
// option 2 - import specific modules
import { placesAPI } from "osdatahub";
```

### Browser

Use directly in the browser with the following script tag:

```html
<script src="https://unpkg.com/osdatahub/dist/bundle.min.js"></script>
```

**Note:** Be wary of exposing your OS Data Hub API key when running osdatahub in the browser!

You can find an [example HTML page that uses the osdatahub-js package here](https://ordnancesurvey.github.io/osdatahub-js/examples/browser_example.html) \[[Source](https://github.com/OrdnanceSurvey/osdatahub-js/tree/main/examples/browser_example.html)\].

![osdatahub browser demo](media/browser_examples_screenshot.png)

## Getting Started

All `osdatahub` commands look something like this:

```javascript
// Securely get API key (we recommend getting the key from environment variables/.env files)
const apiKey = process.env.OS_API_KEY

// querying the places API via bbox:
osdatahub.placesAPI.bbox(apiKey, [-1.4712, 50.9381, -1.4788, 50.9419], {
    limit: 200;
})
```

In the example above, we're querying the **OS Places API** using a **Bounding Box** (bbox), and we're specifying a maximum of **200** features should be returned (a total of two requests). Specifying a `limit` value is optional - optional parameters are stored within an object, which is passed in as the final parameter.

Different APIs support different search operations. Let's explore them...

<br>

### OS NGD API

---

The OS NGD API can be accessed via `osdatahub.ngd`. For further information on using the OS NGD API and its capabilities, please refer to the [OS Data Hub](https://osdatahub.os.uk/docs/ofa/overview) documentation and technical specification.

#### [**Features (Collection Items)**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/ngd.features.html)
Examples https://labs.os.uk/public/osngd/os-ngd-api-features/examples/collections.html 

Get GeoJSON features from a specific product collection (e.g. Building Parts),
using various parameter filters and/or geospatial filters

```javascript
osdatahub.ngd.features(apiKey, collectionId, {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `collectionId` (string) - A valid collection ID e.g
  - (bld-fts-buildingpart) relativeheightroofbase >=15.5 and oslandusetiera ='Residential Accommodation' (building over 18m)
    - relativeheightroofbase The difference in height between the intersection of the external building walls and the underlying ground surface and the base of the roof of the building.
  - (lnd-fts-land-1) description = 'Construction Site'

Optional Parameters (add as named arguments e.g. `{crs: 27700}`):

- `offset` (integer, default 0) - The starting position to collect features
- `limit` (integer, default 100) - The maximum number of features to return
- `crs` (string or number, default null) - CRS return GeoJSON [null defaults to WGS84]
- `bbox` (array, default null) - Bounding-box [West, South, East, North] to search within (in `ESPG:4326`)
- `bboxCRS` (string or number, default null) - CRS of bbox [null defaults to WGS84]
- `datetime` (string, default null) - A valid date-time with UTC time zone (Z) or an open or closed interval. Only features that have a temporal geometry (versionavailablefromdate or versionavailabletodate) that intersects the value in the datetime parameter are selected. [RFC 3339 Format](https://www.rfc-editor.org/rfc/rfc3339#section-5.6)
- `filter` (string, default null) - Common Query Language (CQL) filter
- `filterCRS` (string or number, default null) - CRS of filter if a spatial operation is used [null defaults to WGS84]

#### [**Feature (Single Collection Item)**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/ngd.feature.html)

Get a single GeoJSON feature from a specific product collection and feature Id

```javascript
osdatahub.ngd.feature(apiKey, collectionId, featureId, {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `collectionId` (string) - A valid collection ID e.g. (bld-fts-buildingpart)
- `featureId` (string) - A valid feature ID e.g. (00000016-e0a2-45ca-855a-645753d72716)

Optional Parameters (add as named arguments e.g. `{crs: 27700}`):

- `crs` (string or number, default null) - CRS return GeoJSON [null defaults to WGS84]

#### [**Collections**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/ngd.collections.html)

Get information about a specific collection - if no collection ID is given
function returns a list of all available collections!

```javascript
osdatahub.ngd.collections(); // View all available collections
osdatahub.ngd.collections(collectionId); // Get info for specific collection
```

Parameters:

- `collectionId`[Optional] (string) - A valid collection ID e.g. (bld-fts-buildingpart)

#### [**Schema**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/ngd.schema.html)

Get details of the feature attributes (properties) in a given collection

```javascript
osdatahub.ngd.schema(collectionId);
```

Parameters:

- `collectionId` (string) - A valid collection ID e.g. (bld-fts-buildingpart)

#### [**Queryables**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/ngd.queryables.html)

Get all queryable attributes in a given collection

```javascript
osdatahub.ngd.queryables(collectionId);
```

Parameters:

- `collectionId` (string) - A valid collection ID e.g. (bld-fts-buildingpart)

### OS Places API

---

The OS Places API can be accessed via `osdatahub.placesAPI`. For further information on using the OS Places API and its capabilities, please refer to the [OS Data Hub](https://osdatahub.os.uk/docs/places/overview) documentation and technical specification.

#### [**GeoJSON Polygon**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/placesAPI.polygon.html)

Returns all features within the geometry up to the user-defined limit.

```javascript
osdatahub.placesAPI.polygon(apiKey, geoJson, {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `geoJson` (object) - Either a Feature or FeatureCollection as an object (in `ESPG:4326`)

Optional Parameters (add as named arguments e.g. `{crs: 27700}`):

- `offset` (integer, default 0) - The starting position to collect features
- `limit` (integrer, default 1,000) - The maximum number of features to return

#### [**Point-Based Radius**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/placesAPI.radius.html)

Returns all features within the geometry (user-defined distance from a point) up to the user-defined limit.

```javascript
osdatahub.placesAPI.radius(apiKey, [lng, lat], searchRadius, {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `[lng, lat]` (array of numbers) - Point feature (in `ESPG:4326`)
- `searchRadius` (number) - Distance (meters) to search around point (maximum 1,000)

Optional Parameters (add as named arguments e.g. `{crs: 27700}`):

- `offset` (integer, default 0) - The starting position to collect features
- `limit` (integrer, default 1,000) - The maximum number of features to return

#### [**Nearest Feature**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/placesAPI.nearest.html)

Returns a single feature, the closest to the geometry (a point).

```javascript
osdatahub.placesAPI.nearest(apiKey, [lng, lat], {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `[lng, lat]` (array of numbers) - Point feature (in `ESPG:4326`)

#### [**Bounding Box**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/placesAPI.bbox.html)

Returns all features within the bbox geometry (up to 1km<sup>2</sup> in area), up to the user-defined limit.

```javascript
osdatahub.placesAPI.bbox(apiKey, [b, b, o, x], {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `[b,b,o,x]` (array of four numbers) - Bounding-box (West, South, East, North) to search within (in `ESPG:4326`)

Optional Parameters (add as named arguments e.g. `{crs: 27700}`):

- `offset` (integer, default 0) - The starting position to collect features
- `limit` (integrer, default 1,000) - The maximum number of features to return

#### [**UPRN (Unique Property Reference Number)**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/placesAPI.uprn.html)

Returns a single feature, matching the input UPRN identifier.

```javascript
osdatahub.placesAPI.uprn(apiKey, uprnIdentifer, {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `uprnIdentifier` (integer) - A valid UPRN identifer

#### [**Postcode (Full or Partial)**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/placesAPI.postcode.html)

Returns features matching the input postcode. A full (e.g, `SO16 0AS`) or partial (e.g, `OS16`) postcode can be provided, the number of features returned (up to the user-defined limit) can vary considerably.

```javascript
osdatahub.placesAPI.postcode(apiKey, postcode, {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `postcode` (string) - Full/Partial postcode to search in

Optional Parameters (add as named arguments e.g. `{crs: 27700}`):

- `offset` (integer, default 0) - The starting position to collect features
- `limit` (integrer, default 1,000) - The maximum number of features to return

#### [**Find (Plain Text Search)**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/placesAPI.find.html)

Returns features matching the input text string provided. The number of features returned (up to the user-defined limit) can vary considerably.

```javascript
osdatahub.placesAPI.find(apiKey, query, {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `query` (string) - A plain-text search string

Optional Parameters (add as named arguments e.g. `{crs: 27700}`):

- `offset` (integer, default 0) - The starting position to collect features
- `limit` (integrer, default 1,000) - The maximum number of features to return

<br>

### OS Names API

---

The OS Names API can be accessed via `osdatahub.namesAPI`. For further information on using the OS Names API and its capabilities, please refer to the [OS Data Hub](https://osdatahub.os.uk/docs/names/overview) documentation and technical specification.

#### [**Nearest Feature**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/namesAPI.nearest.html)

Returns a single feature, the closest to the point geometry.

```javascript
osdatahub.namesAPI.nearest(apiKey, [lng, lat], {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `[lng, lat]` (array of numbers) - Point feature (in `ESPG:4326`)

#### [**Find (Plain Text Search)**](https://ordnancesurvey.github.io/osdatahub-js/docs/functions/namesAPI.find.html)

Returns features matching the input text string provided. The number of features returned (up to the user-defined limit) can vary considerably.

```javascript
osdatahub.namesAPI.find(apiKey, query, {});
```

Parameters:

- `apiKey` (string) - Your OS Data Hub API Key
- `query` (string) - A plain-text search string

Optional Parameters (add as named arguments e.g. `{crs: 27700}`):

- `offset` (integer, default 0) - The starting position to collect features
- `limit` (integrer, default 1,000) - The maximum number of features to return

## Authors

The `osdatahub` (JavaScript) package has been built by:

- [@abiddiscombe](https://github.com/abiddiscombe)
- [@dchirst](https://github.com/dchirst)
- [@jepooley](https://github.com/jepooley)
- [@fhunt-os](https://github.com/fhunt-os)
- [@BenDickens](https://github.com/BenDickens)

## Contribute

This package is still under active development and we welcome contributions from the community via issues and pull requests.

To install osdatahub, along with the tools you need to develop and run tests,
run the following in your environment:

```bash
git clone https://github.com/OrdnanceSurvey/osdatahub-js.git
cd osdatahub-js
npm i
```

### Support

For any kind of issues or suggestions please see the [OS Data Hub documention](https://osdatahub.os.uk/docs), open a **[github issue](https://github.com/OrdnanceSurvey/osdatahub/issues)** or contact us via Email **[rapidprototyping@os.uk](mailto:rapidprototyping@os.uk)**
