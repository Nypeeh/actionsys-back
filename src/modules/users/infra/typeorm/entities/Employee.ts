import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ length: 200 })
  name: string

  @Column({ length: 100 })
  email: string

  @Column()
  password: string

  @Column()
  birthday_date: Date

  @Column()
  admission_date: Date

  @Column({ length: 100 })
  sector: string

  @Column({ length: 100 })
  office: string

  @Column({ length: 100 })
  level: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
