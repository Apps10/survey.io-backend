import { Survey } from 'src/domain/entities'
import { SurveyNotFoundException } from 'src/domain/exceptions/survey.exception'
import { SurveyCache } from 'src/domain/interfaces'
import { SurveyRepository } from 'src/domain/repositories/survey.repository'

export class GetSurveyByIdUseCase {
  constructor(
    private readonly surveyRepo: SurveyRepository,
    private readonly surveyCache: SurveyCache,
  ) {}

  async execute(id: string): Promise<Survey> {
    const isSurveyCached = await this.surveyCache.get(id)
    if (isSurveyCached) {
      console.log('GetSurveyByIdUseCase from 💾')
      return Survey.fromPrimitives(isSurveyCached)
    }

    const survey = await this.surveyRepo.findById(id)
    if (!survey) {
      throw new SurveyNotFoundException()
    }

    console.log('GetSurveyByIdUseCase from 🛢️')
    await this.surveyCache.set(survey.id, { ...survey })
    return survey
  }
}
