import { FindOptions } from 'sequelize';
import { optionsValidator } from './validators';
import { filterGenerator, orderGenerator } from './generators';

export const sequelizeFindOptionsGenerator = (query: { [key: string]: any }): FindOptions => {
  optionsValidator(query);
  const options: FindOptions = {};
  options.where = filterGenerator(query.filter);
  options.order = orderGenerator(query.order);
  return options;
};
