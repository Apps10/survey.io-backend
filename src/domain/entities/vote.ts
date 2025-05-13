export class Vote {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly optionId: string,
    public readonly createdAt: Date = new Date(),
  ) {
    this.ensureIsValid()
  }

  private ensureIsValid() {
    const now = new Date()
    if (this.id.length < 5 || typeof this.id != 'string') {
      throw new Error('id must be a string of at least 5 characters')
    }

    if (this.userId.length < 5 || typeof this.userId != 'string') {
      throw new Error('userId must be a string of at least 5 characters')
    }

    if (this.optionId.length < 5 || typeof this.optionId != 'string') {
      throw new Error('optionId must be a string of at least 5 characters')
    }

    if (this.createdAt > now) {
      throw new Error('createdAt must be in present')
    }
  }
}
