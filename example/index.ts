import { ApplicationFactory } from '../lib';
import { AppModule } from './src/app.module';
import { TestConstructorProvider } from './src/test-constructor.provider';

function bootstrap() {
  const factory = new ApplicationFactory();

  factory.create(AppModule);
  const testConstructorProvider = factory.container.get(
    TestConstructorProvider,
  );
  const testValueProvider = factory.container.get('TEST_VALUE_PROVIDER');
  const testFactoryProvider = factory.container.get('TEST_FACTORY_PROVIDER');
  testConstructorProvider.log('hello TestConstructorProvider');
  testValueProvider.log('hello TEST_VALUE_PROVIDER');
  testFactoryProvider.log('hello TEST_FACTORY_PROVIDER');
}

bootstrap();
