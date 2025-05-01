import { SurveyRepository } from 'src/domain/repositories/survey.repository'
import { ISurveyVote } from '../dtos/survey.dto'

export class VoiteSurveyUseCase {
  constructor(private readonly SurveyRepo: SurveyRepository) {}

  async execute({ surveyId, userId }: ISurveyVote): Promise<void> {
    await this.SurveyRepo.vote(surveyId, userId)
  }
}
