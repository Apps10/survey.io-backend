import { Survey, SurveyOption } from 'src/domain/entities'
import { SurveyRepository } from 'src/domain/repositories/survey.repository'
import { ISurveyCreateDto } from '../dtos/survey.dto'

export class CreateSurveyUseCase {
  INITIAL_TOTAL_VOTES = 0
  constructor(private readonly surveyRepository: SurveyRepository) {}

  async execute(dto: ISurveyCreateDto): Promise<void> {
    const optionsInstances = dto.options.map(
      (o) =>
        new SurveyOption(o.id, o.surveyId, o.text, this.INITIAL_TOTAL_VOTES),
    )
    const survey = new Survey(
      dto.id,
      dto.question,
      this.INITIAL_TOTAL_VOTES,
      dto.isActive,
      optionsInstances,
      new Date(),
    )

    await this.surveyRepository.save(survey)
  }
}
