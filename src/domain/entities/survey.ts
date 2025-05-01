import { SurveyOption } from './surveyOption'

export class Survey {
  constructor(
    public readonly id: string,
    public readonly question: string,
    public readonly totalVotes: number,
    public readonly isActive: boolean,
    public readonly options: SurveyOption[] = [], // 👈 obliga a crear al menos una opcion
    public readonly CreatedAt: Date,
  ) {
    this.ensureIsValid()
  }

  private ensureIsValid() {
    if (this.id.length < 5 || typeof this.id != 'string') {
      throw new Error('id must be a string of at least 5 characters')
    }

    if (this.question.length < 10 || typeof this.question != 'string') {
      throw new Error('question must be a string of at least 10 characters')
    }

    if (this.totalVotes < 0 || typeof this.totalVotes != 'number') {
      throw new Error('totalVotes must be a number greater than or equals 0')
    }

    if (
      !Array.isArray(this.options) ||
      this.options.length <= 2 ||
      !this.options.every((opt) => opt instanceof SurveyOption)
    ) {
      throw new Error(
        'options must be least 2 in length and an array of SurveyOption instances',
      )
    }
  }
}
