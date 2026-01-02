import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';
import { TypeormPersistenceModule } from './database/typeorm.module';

@Module({
  imports: [
    DatabaseModule,
    TypeormPersistenceModule,
    SecurityModule,
  ],
  exports: [
    TypeormPersistenceModule,
    SecurityModule,
  ],
})
export class InfrastructureModule {}
