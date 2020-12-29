import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: "cats",
    underscored: true,
    paranoid: true,
    deletedAt: "deleted_at",
    createdAt: "created_at",
    updatedAt: "updated_at"
})
export class CatEntity extends Model<CatEntity> {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    })
    id: number;

    @Column({ type: DataType.STRING(100) })
    name: string;

    @Column({ type: DataType.INTEGER })
    age: number;
}
