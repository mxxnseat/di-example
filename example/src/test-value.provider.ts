import { ValueProvider } from '../../lib';

class TestValue {
  constructor() {
    this.log();
  }
  public log(v?: string) {
    console.log(this);
    if (v) {
      console.log(v);
    }
  }
}

export const testValueProvider: ValueProvider = {
  provide: 'TEST_VALUE_PROVIDER',
  useValue: TestValue,
};
