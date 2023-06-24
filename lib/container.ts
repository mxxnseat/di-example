import { MODULE_TOKEN } from './constants';
import { IsNotModuleError, NotValidProviderError } from './errors';
import {
  Constructor,
  FactoryProvider,
  ModuleOptions,
  ProviderType,
  ProvidersType,
  ValueProvider,
} from './types';
import { isConstructor, validateModule } from './utils';

export class ApplicationFactory {
  private readonly _container = new Container();

  public get container() {
    return this._container;
  }

  public create(module: Constructor) {
    const isModule = Reflect.hasOwnMetadata(MODULE_TOKEN, module);
    if (!isModule) {
      throw new IsNotModuleError(module);
    }
    this._container.run(module);
  }
}

export class Container {
  private readonly _map = new Map<ProviderType, any>();

  public get(provider: ProviderType): any {
    return this._map.get(provider);
  }

  public run(constructor: Constructor) {
    const {
      imports: importsMetadata = [],
      providers: providersMetadata = [],
    }: ModuleOptions = Reflect.getMetadata(MODULE_TOKEN, constructor);
    importsMetadata.forEach((metadata) => {
      validateModule(metadata);
      this._map.set(metadata, this.initializeClass(metadata));
    });
    providersMetadata.forEach((metadata) => {
      if (this.isClassProvider(metadata)) {
        const maybeInMap = this._map.get(metadata);
        if (maybeInMap) {
          return;
        }
        this._map.set(metadata, this.initializeClass(metadata));
      } else if (this.isValueProvider(metadata)) {
        const maybeInMap = this._map.get(metadata.provide);
        if (maybeInMap) {
          return;
        }
        this._map.set(
          metadata.provide,
          this.initializeClass(metadata.useValue),
        );
      } else if (this.isFactoryProvider(metadata)) {
        const maybeInMap = this._map.get(metadata.provide);
        if (maybeInMap) {
          return;
        }
        const injects = metadata.inject.map((inject) => this._map.get(inject));
        this._map.set(metadata.provide, metadata.useFactory(...injects));
      } else {
        throw new NotValidProviderError(metadata);
      }
    });
  }
  private initializeClass(constructor: Constructor): unknown {
    const constructorDependencies =
      (Reflect.getMetadata('design:paramtypes', constructor) as unknown[]) ??
      [];
    const initInstances = constructorDependencies.map(
      (constructorDependency) => {
        if (!isConstructor(constructorDependency)) {
          return constructorDependency;
        }
        return this.initializeClass(constructorDependency);
      },
    );
    return new constructor(...initInstances);
  }
  private isFactoryProvider(
    metadata: ProvidersType,
  ): metadata is FactoryProvider {
    return 'useFactory' in metadata;
  }
  private isClassProvider(metadata: ProvidersType): metadata is Constructor {
    return isConstructor(metadata) && !('provide' in metadata);
  }
  private isValueProvider(metadata: ProvidersType): metadata is ValueProvider {
    return 'useValue' in metadata;
  }
}
