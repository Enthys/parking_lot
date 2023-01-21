import { TypeOrmModule } from '@nestjs/typeorm';
import TypeORMDataSource from '../../typeorm.datasource';

export default TypeOrmModule.forRoot(TypeORMDataSource.options);
