import { Column, Model ,Table} from "sequelize-typescript";

@Table({timestamps: false})
export default class message extends Model{
    @Column
    title!:string
    @Column
    content!:string
    @Column
    channel!:number
    @Column
    createdAt!:Date
    
}