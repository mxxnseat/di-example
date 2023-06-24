import { FactoryProvider } from '../../lib';
import { TestConstructorProvider } from './test-constructor.provider';

class TestFactoryProvider {
  constructor(
    private readonly _testConstructorProvider: TestConstructorProvider,
  ) {
    this.log();
  }

  public log(v?: string) {
    console.log(this);
    this._testConstructorProvider.log();
    if (v) {
      console.log(v);
    }
  }
}

export const testFactoryProvider: FactoryProvider = {
  inject: [TestConstructorProvider],
  provide: 'TEST_FACTORY_PROVIDER',
  useFactory: (testConstructorProvider: TestConstructorProvider) => {
    return new TestFactoryProvider(testConstructorProvider);
  },
};
