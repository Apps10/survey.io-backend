import { SurveyRepository } from 'src/domain/repositories/survey.repository'
import { ISurveyVote } from '../dtos/survey.dto'
import {
  SurveyNotFoundException,
  SurveyOptionNotFoundException,
} from 'src/domain/exceptions/survey.exception'

export class VoteSurveyUseCase {
  constructor(private readonly SurveyRepo: SurveyRepository) {}

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
  }
}
