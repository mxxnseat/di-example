import { INJECTABLE_TOKEN } from '../constants';

export const Injectable = (): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(INJECTABLE_TOKEN, true, target);
    return target;
  };
};
