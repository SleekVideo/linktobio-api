import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({
    unique: true,
  })
  slug: string;

  @Column({
    default: null,
  })
  facebook: string;
  @Column({
    default: null,
  })
  instagram: string;
  @Column({
    default: null,
  })
  youtube: string;
  @Column({
    default: null,
  })
  spotify: string;

  @Column({
    default: null,
  })
  twitter: string;
  @Column({
    default: null,
  })
  tiktok: string;
}
