/**
 * @info Backend API Swagger
 */
export const HOST = {
  base:
    process.env.NODE_ENV === 'development' ?
      'localhost:3001' :
      'ec2-15-164-215-34.ap-northeast-2.compute.amazonaws.com:3000',
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
