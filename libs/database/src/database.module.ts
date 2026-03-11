import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from 'ormconfigs';
console.log(options);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...options,
      autoLoadEntities: true,
    }),
  ],
})
export class DatabaseModule {}
