export interface ISurveyOptionPrimitive {
  id: string
  surveyId: string
  text: string
  countVotes: number
}

export class SurveyOption {
  constructor(
    public readonly id: string,
    public readonly surveyId: string,
    public readonly text: string,
    public countVotes: number,
  ) {
    this.ensureIsValid()
  }

  newVote(): void {
    this.countVotes++
  }

  private ensureIsValid() {
    if (this.id.length < 5 || typeof this.id != 'string') {
      throw new Error('id must be a string of at least 5 characters')
    }

    if (this.surveyId.length < 5 || typeof this.surveyId != 'string') {
      throw new Error('surveyId must be a string of at least 5 characters')
    }

    if (this.text.length < 5 || typeof this.text != 'string') {
      throw new Error('text must be a string of at least 5 characters')
    }

    if (this.countVotes < 0 || typeof this.countVotes != 'number') {
      throw new Error('countVotes must be a number greater than or equals 0')
    }
  }

  static fromPrimivites({
    countVotes,
    id,
    surveyId,
    text,
  }: ISurveyOptionPrimitive): SurveyOption {
    return new SurveyOption(id, surveyId, text, countVotes)
  }

  static fromPrimiviteArray(array: ISurveyOptionPrimitive[]): SurveyOption[] {
    return array.map((o) => SurveyOption.fromPrimivites(o))
  }
}
