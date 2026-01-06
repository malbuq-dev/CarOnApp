import { Injectable } from "@nestjs/common";
import { Ride } from "src/domain/entities/ride.entity";
import { RidesRepository } from "src/domain/repositories/ride.repository";
import { Repository } from "typeorm";
import { TypeormRideEntity } from "../entities/typeorm-ride.entity";
import { RideMapper } from "../mappers/ride.mapper";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationFilterType } from "src/core/types/pagination-filter.type";

@Injectable()
export class TypeormRideRepository implements RidesRepository {
    
    constructor(
        @InjectRepository(TypeormRideEntity)
        private readonly repository: Repository<TypeormRideEntity>
    ) {}

    async findManyByAuthor(query: PaginationFilterType, authorId: string): Promise<Ride[] | null> {
        const limit = query.limit ?? 50; // TO-DO: fazer isso aqui sair do config file
        const offset = query.offset ?? 0;

        const findOptions: any = {
            relations: ['driver'],
            take: limit,
            skip: offset
        }

        if (query.sortBy && query.sortOrder) {
            findOptions.order = {
                [query.sortBy]: query.sortOrder.toUpperCase()
            }
        }

        const rides = await this.repository.find(findOptions);

        return rides.map((ride) => RideMapper.toDomain(ride));
    }

    async findById(id: string): Promise<Ride | null> {
        const ride = await this.repository.findOne({
            where: { id },
            relations: ['driver']
        });

        if (!ride) {
            return null;
        }

        return RideMapper.toDomain(ride);
    }
        
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