import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity({ name: "specialist_info" })
export class SpecialistInfo {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  profession: string;

  @Column({ nullable: true })
  experienceYears: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  locationUrl: string;

  @Column({ nullable: true })
  objectName: string;

  @Column({ nullable: true, type: "integer" })
  city: number;

  @OneToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
}
