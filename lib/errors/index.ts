import { Constructor } from '../types';

export class IsNotModuleError extends Error {
  constructor(constructor: Constructor) {
    super(`Provided ${constructor.name} constructor is not a module`);
  }
}

export class NotValidProviderError extends Error {
  constructor(provider: unknown) {
    super(
      `Provider should one of 'FactoryProvider', 'ValueProvider' or 'Constructor' - was passed ${typeof provider}`,
    );
  }
}
