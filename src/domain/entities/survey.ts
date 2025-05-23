import { ISurveyOptionPrimitive, SurveyOption } from './surveyOption'

export interface ISurveyPrimivite {
  id: string
  question: string
  totalVotes: number
  isActive: boolean
  options: ISurveyOptionPrimitive[]
  createdAt: Date
}
export class Survey {
  constructor(
    public readonly id: string,
    public readonly question: string,
    public totalVotes: number,
    public readonly isActive: boolean,
    public readonly options: SurveyOption[] = [],
    public readonly createdAt: Date,
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
      this.options.length < 2 ||
      !this.options.every((opt) => opt instanceof SurveyOption)
    ) {
      throw new Error(
        'options must be least 2 in length and an array of SurveyOption instances',
      )
    }
  }

  static fromPrimitives({
    id,
    createdAt,
    isActive,
    options,
    question,
    totalVotes,
  }: ISurveyPrimivite) {
    return new Survey(
      id,
      question,
      totalVotes,
      isActive,
      SurveyOption.fromPrimiviteArray(options),
      createdAt,
    )
  }

  static fromPrimitiveArray(array: ISurveyPrimivite[]) {
    return array.map((a) => Survey.fromPrimitives(a))
  }

  addVoteToOption(optionId: string): void {
    const option = this.options.find((o) => o.id === optionId)

    if (!option) {
      throw new Error('Option not found')
    }

    option.newVote()
    this.totalVotes++
  }
}
