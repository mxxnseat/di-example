import { Constructor } from '../types';

export const isConstructor = (
  maybeConstructor: any,
): maybeConstructor is Constructor => {
  return (
    !!maybeConstructor.prototype &&
    !!maybeConstructor.prototype.constructor.name
  );
};
