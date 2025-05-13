import { Survey } from 'src/domain/entities'
import { SurveysNotExistException } from 'src/domain/exceptions/survey.exception'
import { SurveyCache } from 'src/domain/interfaces/voteCache.interface'
import { SurveyMapper } from 'src/domain/mappers/survey.mapper'
import { SurveyRepository } from 'src/domain/repositories'

export class GetAllSurveysUseCase {
  constructor(
    private readonly surveyRepo: SurveyRepository,
    private readonly surveyCache: SurveyCache,
    private readonly surveyMapper: SurveyMapper,
  ) {}

  async execute(): Promise<Survey[]> {
    const existSurveysInCache = await this.surveyCache.getAll()
    if (existSurveysInCache.length > 0) {
      console.log('GetAllSurveysUseCase from 💾')
      return Survey.fromPrimitiveArray(existSurveysInCache)
    }

    const surveys = await this.surveyRepo.findAll()

    if (surveys.length > 0) {
      throw new SurveysNotExistException()
    }
    await this.surveyCache.setMany(
      this.surveyMapper.SurveysToPrimitives(surveys),
    )
    console.log('GetAllSurveysUseCase from 🛢️')
    return surveys
  }
}
