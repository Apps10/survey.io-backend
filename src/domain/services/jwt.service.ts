export interface JWTService {
  sign(payload: object): string
  verify(token: string): object
}
