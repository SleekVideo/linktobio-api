import { DataSource } from 'typeorm';
import { Profile } from './src/profile/entities/profile.entity';
import { User } from './src/users/entities/user.entity';

export default new DataSource({
  type: 'mysql',
  host: 'database-1.cwx06git3hfq.eu-central-1.rds.amazonaws.com',
  port: 3306,
  username: 'admin',
  password: '12345678',
  database: 'linktobio',
  entities: [User, Profile],
});
