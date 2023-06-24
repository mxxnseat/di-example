import { Module } from '../../lib';

class TestProvider {
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

@Module({ providers: [TestProvider] })
export class TestModule {}
