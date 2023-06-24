export interface Constructor<T = unknown> {
  new (...args: any[]): T;
}

export type ProviderType = string | symbol | Constructor;

export interface ValueProvider {
  provide: ProviderType;
  useValue: Constructor;
}

export interface FactoryProvider {
  provide: ProviderType;
  inject: ProviderType[];
  useFactory: (...args: any[]) => any;
}

export type ProvidersType = Constructor | ValueProvider | FactoryProvider;

export interface ModuleOptions {
  providers?: ProvidersType[];
  imports?: Constructor[];
}
