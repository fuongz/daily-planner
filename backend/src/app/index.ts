import { KindeModule } from './Kinde/Kinde.module';
import { TaskModule } from './Task/Task.module';

// Finance Tracker
import { WalletModule } from './Wallet/Wallet.module';
import { TransactionModule } from './Transaction/Transaction.module';
import { CategoryModule } from './Category/Category.module';

export const AppModules = [
  TaskModule,
  KindeModule,
  WalletModule,
  TransactionModule,
  CategoryModule,
];
