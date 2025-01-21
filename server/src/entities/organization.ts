import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { Staff } from "./staff";

@Entity("organizations")
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => Staff, (staff) => staff.organization)
  staffMembers!: Staff[];
}
