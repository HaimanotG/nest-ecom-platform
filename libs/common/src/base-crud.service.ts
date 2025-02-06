import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  FindOneOptions,
  FindManyOptions,
  DeleteResult,
  UpdateResult,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseCrudService<T extends BaseEntity> {
  protected constructor(private readonly repository: Repository<T>) {}

  /**
   * Create a single entity
   */
  public async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  /**
   * Create multiple entities
   */
  public async createMany(data: DeepPartial<T>[]): Promise<T[]> {
    const entities = this.repository.create(data);
    return await this.repository.save(entities);
  }

  /**
   * Find one entity by id
   */
  public async findOneById(id: string | number): Promise<T> {
    const entity = await this.repository.findOneBy({
      id,
    } as FindOptionsWhere<T>);
    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return entity;
  }

  /**
   * Find one entity by custom conditions
   */
  public async findOne(options: FindOneOptions<T>): Promise<T> {
    const entity = await this.repository.findOne(options);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  /**
   * Find all entities
   */
  public async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

  /**
   * Find entities with relations
   */
  public async findWithRelations(relations: string[]): Promise<T[]> {
    return await this.repository.find({
      relations,
    });
  }

  /**
   * Update an entity
   */
  public async update(
    id: string | number,
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    return await this.repository.update(id, data);
  }

  /**
   * Delete an entity
   */
  public async delete(id: string | number): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  /**
   * Soft delete an entity (if enabled)
   */
  public async softDelete(id: string | number): Promise<UpdateResult> {
    return await this.repository.softDelete(id);
  }

  /**
   * Count entities based on conditions
   */
  public async count(options?: FindManyOptions<T>): Promise<number> {
    return await this.repository.count(options);
  }

  /**
   * Check if entity exists
   */
  public async exists(options: FindOptionsWhere<T>): Promise<boolean> {
    return await this.repository.exists({ where: options });
  }

  /**
   * Preload an entity
   */
  public async preload(entityLike: DeepPartial<T>): Promise<T> {
    return await this.repository.preload(entityLike);
  }
}
