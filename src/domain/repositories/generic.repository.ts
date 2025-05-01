export interface GenericRepository <T> {
  save(t: T): Promise<void>
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
}