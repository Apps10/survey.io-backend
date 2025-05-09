import { Survey } from 'src/domain/entities'
import { SurveyRepository } from 'src/domain/repositories'
import { ISurveyCreateDto } from '../dtos/survey.dto'
import { SurveyCache } from 'src/domain/interfaces'

export class CreateSurveyUseCase {
  INITIAL_VOTES = 0
  constructor(
    private readonly surveyRepository: SurveyRepository,
    private readonly surveyCache: SurveyCache,
  ) {}

  async execute(surveyDto: ISurveyCreateDto): Promise<void> {
    const options = surveyDto.options.map((o) => ({
      ...o,
      countVotes: this.INITIAL_VOTES,
      surveyId: surveyDto.id,
    }))

    const surveyPrimitive = {
      ...surveyDto,
      totalVotes: this.INITIAL_VOTES,
      createdAt: new Date(),
      options,
    }

    const survey = Survey.fromPrimitives(surveyPrimitive)

    await this.surveyRepository.save(survey)
    await this.surveyCache.set(surveyDto.id, surveyPrimitive)
  }
}
