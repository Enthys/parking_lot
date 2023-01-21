import { Module } from '@nestjs/common';
import typeormProvider from './shared/providers/typeorm.provider';

@Module({
  imports: [typeormProvider],
})
export class AppModule {}
