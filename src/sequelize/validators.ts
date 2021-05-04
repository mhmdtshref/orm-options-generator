import { isArray, isObject, isString, keys } from 'lodash';
import { isLogicalOperators } from './helpers';
import { orderValues } from './constants';
  
const filterValidator = (filter: any) => {
    if (filter === null || filter === undefined) {
      return;
    }
    if (!isObject(filter)) {
      throw new Error('Filter should be type of object');
    }
  
    if (isArray(filter)) {
      throw new Error('Filter could not be array');
    }
  
    const filterKeys = keys(filter);
    filterKeys.forEach((filterKey) => {
      if (isLogicalOperators(filterKey)) {
        if (isArray(filter[filterKey])) {
          (filter[filterKey] as any[]).forEach((logicalOperatorFilter) => filterValidator(logicalOperatorFilter));
        } else {
          filterValidator(filter[filterKey]);
        }
      } else {
        const currentFiltersKeys = keys(filter[filterKey]);
        currentFiltersKeys.forEach((currentFilterKey) => {
          if (isLogicalOperators(currentFilterKey)) { 
            if (isArray(filter[filterKey][currentFilterKey])) {
              (filter[filterKey][currentFilterKey] as any[]).forEach((logicalOperatorFilter) => filterValidator(logicalOperatorFilter));
            } else {
              filterValidator(filter[filterKey][currentFilterKey]);
            }
          } else {
            if (isObject(filter[filterKey][currentFilterKey])) {
              throw new Error('Filter properties could not be an objects');
            }
          }
        })
      }
    })
}

const orderValidator = (order: any) => {
  if (order === null || order === undefined) {
    return;
  }

  if (!isObject(order) || isArray(order)) {
    throw new Error('Order should be type of object');
  }

  const orderKeys = keys(order);
  orderKeys.forEach((orderKey) => {
    const isRightOrderValue = isString(order[orderKey]) && orderValues.includes((order[orderKey] as string).toLowerCase());
    if (!isRightOrderValue) {
      throw new Error(`Order value should be string in values: ${orderValues.join(', ')}`);
    }
  })
}

export const optionsValidator = (query: { [key: string]: any }) => {
    const { filter, order } = query;
    filterValidator(filter);
    orderValidator(order);
}