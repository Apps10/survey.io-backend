import { Survey } from 'src/domain/entities'
import { SurveyNotFoundException } from 'src/domain/exceptions/survey.exception'
import { SurveyRepository } from 'src/domain/repositories/survey.repository'

export class GetSurveyByIdUseCase {
  constructor(private readonly surveyRepo: SurveyRepository) {}

  async execute(id: string): Promise<Survey> {
    const survey = await this.surveyRepo.findById(id)
    if (!survey) {
      throw new SurveyNotFoundException()
    }
    return survey
  }
}
