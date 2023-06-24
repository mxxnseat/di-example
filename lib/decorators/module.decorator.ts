import { MODULE_TOKEN } from '../constants';
import { ModuleOptions } from '../types';

export const Module = (options: ModuleOptions): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(MODULE_TOKEN, options, target);
    return target;
  };
};
