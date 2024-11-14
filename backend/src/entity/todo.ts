import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/** Todo is a TypeORM todo entity. */
@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    finished: boolean;

    @Column({ default: false })
    archived: boolean;
}
