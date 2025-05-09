import { SurveyRepository } from 'src/domain/repositories'
import { SurveyNotifierService } from 'src/domain/services'
import { ISurveyVote } from '../dtos'
import { SurveyMapper } from 'src/domain/mappers'
import { SurveyCache } from 'src/domain/interfaces'
import {
  SurveyNotFoundException,
  SurveyOptionNotFoundException,
} from 'src/domain/exceptions'

export class VoteSurveyUseCase {
  constructor(
    private readonly SurveyRepo: SurveyRepository,
    private readonly notifier: SurveyNotifierService,
    private readonly surveyMapper: SurveyMapper,
    private readonly surveyCache: SurveyCache,
  ) {}

  async execute({ surveyId, optionId, userId }: ISurveyVote): Promise<void> {
    const survey = await this.SurveyRepo.findById(surveyId)

    if (!survey) {
      throw new SurveyNotFoundException()
    }

    const surveyOption = survey.options.find((o) => o.id === optionId)
    if (!surveyOption) {
      throw new SurveyOptionNotFoundException()
    }

    survey.addVoteToOption(optionId)
    await this.SurveyRepo.save(survey)
    await this.SurveyRepo.saveUserVote(userId, optionId)

    const surveyOptionsPrimitive = this.surveyMapper.SurveyOptionsToPrimitive(
      survey.options,
    )

    await this.surveyCache.set(surveyId, { ...survey })
    this.notifier.NotifyVote(surveyId, surveyOptionsPrimitive)
  }
}
