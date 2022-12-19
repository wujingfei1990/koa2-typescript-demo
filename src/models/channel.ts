import { Column, Model ,Table} from "sequelize-typescript";

@Table({timestamps: false})
export default class channel extends Model{
    @Column
    name!:string
}