import { Module } from '../../lib';
import { TestConstructorProvider } from './test-constructor.provider';
import { testFactoryProvider } from './test-factory.provider';
import { testValueProvider } from './test-value.provider';
import { TestModule } from './test.module';

@Module({
  imports: [TestModule],
  providers: [TestConstructorProvider, testFactoryProvider, testValueProvider],
})
export class AppModule {}
