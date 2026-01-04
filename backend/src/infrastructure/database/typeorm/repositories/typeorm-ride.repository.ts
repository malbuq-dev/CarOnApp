import { Injectable } from "@nestjs/common";
import { Ride } from "src/domain/entities/ride.entity";
import { RidesRepository } from "src/domain/repositories/ride.repository";
import { Repository } from "typeorm";
import { TypeormRideEntity } from "../entities/typeorm-ride.entity";
import { RideMapper } from "../mappers/ride.mapper";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TypeormRideRepository implements RidesRepository {
    
    constructor(
        @InjectRepository(TypeormRideEntity)
        private readonly repository: Repository<TypeormRideEntity>
    ) {}
        
    async findByIdAndAuthorId(id: string, authorId: string): Promise<Ride | null> {
        const entity = await this.repository.findOne({
            where: {
                id,
                driver: { id: authorId }
            },
            relations: ['driver'],
        });

        if (!entity) {
            return null;
        }

        return RideMapper.toDomain(entity);
    }

    async deleteByIdAndAuthorId(id: string, authorId: string): Promise<void> {
        await this.repository.delete({
            id,
            driver: { id: authorId }
        })
    }

    async save(ride: Ride): Promise<void> {
        const entity = RideMapper.toPersistence(ride);
        await this.repository.save(entity);
    }

}