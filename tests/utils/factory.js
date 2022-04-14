import faker from '@faker-js/faker';
import factory from 'factory-girl';

factory.define(
  'Dataset',
  {},
  {
    id: () => faker.date.past().getTime(),
    category: faker.commerce.department,
    color: faker.vehicle.color,
    title: faker.commerce.productName,
  }
);

export default factory;
