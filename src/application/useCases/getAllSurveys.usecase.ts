import { Survey } from 'src/domain/entities'
import { SurveyRepository } from 'src/domain/repositories/survey.repository'

export class GetAllSurveysUseCase {
  constructor(private readonly surveyRepo: SurveyRepository) {}

  async execute(): Promise<Survey[]> {
    const surveys = await this.surveyRepo.findAll()

    if (!surveys) {
      throw new Error('there arent avaliable surveys')
    }

    return surveys
  }
}
