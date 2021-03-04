import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('produtos')
class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    nome: string;
    
    @Column('decimal')
    preco: number;

    @Column('int')
    quantidade: number;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;
}

export default Product
