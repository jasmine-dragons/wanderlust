// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next';

'use strict';
const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey =
  'bw4T14RxsIYD8I_GEHOQF6LgLYPcAUokJC61WvJPIkwLLbWYdVsyTJMTcuE2XFlK0BLds-KBXbeAczCnjuYKrrpjE23nTsKSi76kWKbt51tsBx1vxFql5cpAlsBDZHYx';

const searchRequest = {
  term: 'the lazy daisy cafe',
  location: 'ucla',
};

const client = yelp.client(apiKey);

client
  .search(searchRequest)
  .then((response: any) => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  })
  .catch((e: any) => {
    console.log(e);
  });
