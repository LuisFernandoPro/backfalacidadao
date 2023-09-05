import "reflect-metadata";
import { Entity, CreateDateColumn, UpdateDateColumn, Column, PrimaryColumn, } from "typeorm";

@Entity()
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    cpf: string;

    @Column({nullable: true})
    funcao: string;

    @Column({nullable: true})
    imageUrl: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

}

export default User

// CSV