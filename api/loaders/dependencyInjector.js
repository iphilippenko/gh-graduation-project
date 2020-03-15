import { Container } from 'typedi';
import path from 'path';
import fs from 'fs';

export default new Promise((resolve, reject) => {
  try {
    const servicesDir = path.resolve(__dirname, '../services');
    const services = fs.readdirSync(servicesDir);
    const replaceName = string => string.replace('.js', '');

    // DI services
    services.forEach(service => {
      Container.set(
        `${replaceName(service)}Service`,
        require(`../services/${service}`).default,
      );
    });
    resolve();
  } catch (e) {
    console.error('🔥 Error on dependency injector loader', e);
    reject(e);
  }
});
