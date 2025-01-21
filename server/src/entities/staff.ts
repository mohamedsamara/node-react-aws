import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { Organization } from "./organization";

@Entity("staff")
export class Staff {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Organization, (organization) => organization.staffMembers)
  organization!: Organization;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column({ nullable: true })
  specialty!: string;

  @Column()
  contactNumber!: string;

  @Column({ type: "varchar", length: 100, default: "America/Los_Angeles" })
  timezone!: string;
}
