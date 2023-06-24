import { MODULE_TOKEN } from '../constants';
import { IsNotModuleError } from '../errors';
import { Constructor } from '../types';

export const validateModule = (maybeModule: Constructor) => {
  const isModule = Reflect.hasOwnMetadata(MODULE_TOKEN, maybeModule);
  if (!isModule) {
    throw new IsNotModuleError(maybeModule);
  }
};
