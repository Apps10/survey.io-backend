const UserRolArray = ['admin', 'user'] as const
export type UserRole = (typeof UserRolArray)[number]
export enum UserRoleEnum {
  ADMIN = 'admin',
  USER = 'user',
}

export interface UserPrimitive {
  id: string
  email: string
  password: string
  role: UserRole
}

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly role: UserRole = 'user',
  ) {
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.id.length < 5 || typeof this.id != 'string') {
      throw new Error('id must be a string of at least 5 characters')
    }

    if (this.email.length < 5 || typeof this.email != 'string') {
      const emailRegex =
        /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i
      if (!emailRegex.test(this.email)) {
        throw new Error('email is Invalid')
      }
    }

    if (this.password.length < 8 || typeof this.password != 'string') {
      throw new Error('password must be a string of at least 8 characters')
    }

    if (!UserRolArray.includes(this.role)) {
      throw new Error('userRole is invalid')
    }
  }

  static fromPrimitives({ id, email, password, role }: UserPrimitive) {
    return new User(id, email, password, role)
  }
}
