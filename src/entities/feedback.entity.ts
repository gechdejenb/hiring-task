import { UserEntity } from './user.entity';
import { CoreEntity } from "./core.entity";
import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne, 
    CreateDateColumn 
  } from "typeorm";
@Entity()
export class Feedback extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;  

  @Column({ type: "text" })
  text: string;

  @Column({ type: "varchar", length: 10 })
  sentiment: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => UserEntity, user => user.feedbacks)
  user: UserEntity;
}