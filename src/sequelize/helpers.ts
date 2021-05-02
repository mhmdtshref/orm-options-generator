import { sequelizeLogicalOperators } from './constants';

export const isLogicalOperators = (operator: string) => {
    return sequelizeLogicalOperators.includes(operator);
}
