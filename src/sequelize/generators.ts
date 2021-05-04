import { isArray, isObject, keys } from 'lodash';
import { Op, WhereOptions, Order } from 'sequelize';
import { isLogicalOperators } from './helpers';

const deepFilterGenerator = (filter: { [key: string]: any }, key: string) => {
  if (isArray(filter)) {
    return isLogicalOperators(key)
      ? filter.map((currentFilter) => filterGenerator(currentFilter))
      : ({ [Op.in]: filter } as WhereOptions);
  } else {
    const filterKeys = keys(filter);
    const deepWhere = filterKeys.reduce((deepWhereObject: { [key: string]: any }, filterKey) => {
      const filterValue = filter[filterKey];
      const deepWhereKey = Op[filterKey] || filterKey;
      const deepWhereValue = isLogicalOperators(filterKey) ? deepFilterGenerator(filterValue, filterKey) : filterValue;
      deepWhereObject[deepWhereKey] = deepWhereValue;
      return deepWhereObject;
    }, {}) as WhereOptions;
    return deepWhere;
  }
};

export const orderGenerator = (orderObject: { [key: string]: any } = {}): Order => {
  const orderKeys = keys(orderObject);
  const order = orderKeys.map((key) => [key, orderObject[key]]) as Order;
  return order;
};

export const filterGenerator = (filter: { [key: string]: any }): WhereOptions => {
  const filterKeys = keys(filter);
  const where = filterKeys.reduce((whereObject: { [key: string]: any }, filterKey) => {
    const key = isLogicalOperators(filterKey) ? Op[filterKey] : filterKey;
    const value = filter[filterKey];
    whereObject[key] = isObject(value) ? deepFilterGenerator(filter[filterKey], filterKey) : value;
    return whereObject;
  }, {}) as WhereOptions;
  return where;
};
