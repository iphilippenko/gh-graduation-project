export default async () => {
  await require('./dependencyInjector').default;
  require('./mongoose');
};
