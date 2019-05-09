module.exports = {
  client: {
    service: {
      name: 'darksky',
      // URL to the GraphQL API
      url: process.env.VUE_APP_WEATHER_API,
    },
  },
}