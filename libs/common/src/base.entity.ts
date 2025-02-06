import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity as TypeOrmBaseEntity,
} from 'typeorm';

/**
 * Base entity class that provides common columns for all entities
 * Implements soft delete pattern and automatic timestamp management
 */
export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone' })
  deletedAt: Date | null;

  // Helper method for soft delete
  async softDelete(): Promise<void> {
    this.deletedAt = new Date();
    await this.save();
  }

  // Helper method to restore soft deleted entity
  async restore(): Promise<void> {
    this.deletedAt = null;
    await this.save();
  }
}
