import { Survey } from 'src/domain/entities'
import { SurveyRepository } from 'src/domain/repositories/survey.repository'
import { ISurveyCreateDto } from '../dtos/survey.dto'

export class CreateSurveyUseCase {
  INITIAL_VOTES = 0
  constructor(private readonly surveyRepository: SurveyRepository) {}

  async execute(surveyDto: ISurveyCreateDto): Promise<void> {
    const options = surveyDto.options.map((o) => ({
      ...o,
      countVotes: this.INITIAL_VOTES,
      surveyId: surveyDto.id,
    }))

    const survey = Survey.fromPrimitives({
      ...surveyDto,
      totalVotes: this.INITIAL_VOTES,
      createdAt: new Date(),
      options,
    })

    await this.surveyRepository.save(survey)
  }
}
