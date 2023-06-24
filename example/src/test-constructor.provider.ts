import { Injectable } from '../../lib';

@Injectable()
export class InnerClass {
  public log() {
    console.log(this);
  }
}

@Injectable()
export class TestConstructorProvider {
  constructor(private readonly _innerClass: InnerClass) {
    this.log();
  }

  public log(v?: string) {
    console.log(this);
    this._innerClass.log();
    if (v) {
      console.log(v);
    }
  }
}
