import { isArray, isObject, keys } from 'lodash';
import { isLogicalOperators } from './helpers';

  
const filterValidator = (filter: any) => {
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
  
export const optionsValidator = (query: { [key: string]: any }) => {
    const { filter } = query;
    filterValidator(filter);
}