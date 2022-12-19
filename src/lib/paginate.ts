import { Model } from "sequelize-typescript";

function paginate<T extends Model[]>(data: T, currentPage: number = 1, total: number = 0, limit: number = 10) {
    return {
        data,
        currentPage:Number(currentPage),
        total,
        totalPate: Math.ceil(total / limit),
        limit:Number(limit)
    }
}

export default paginate;