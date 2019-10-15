/**
 * @info Backend API Swagger
 */
export const HOST = {
  base: 'localhost:3001',
  protocol: 'http',
  apiModule: 'api',
  version: 'v1',
  api: {
    markers: 'markers',
    geocoding_query: 'geocoding/query',
    geocoding_reverse: 'geocoding/reverse',
  },
};

export const getAPIUrl: (
  ...path: Array<string | number>
) => string = (
  ...path
) => `${HOST.protocol}://${HOST.base}/${HOST.apiModule}/${HOST.version}/${path.join('/')}`;
