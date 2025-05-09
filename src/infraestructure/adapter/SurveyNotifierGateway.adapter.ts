import { SurveyNotifierService } from 'src/domain/services'
import { SurveyGateway } from '../gateway'
import { ISurveyOptionPrimitive } from 'src/domain/entities'
import { InjectableCustom } from 'src/shared/decorators'

@InjectableCustom()
export class SurveyNotifierGatewayAdapter implements SurveyNotifierService {
  constructor(private readonly surveyGateway: SurveyGateway) {}

  NotifyVote(surveyId: string, surveyOptions: ISurveyOptionPrimitive[]): void {
    this.surveyGateway.handleVote({
      surveyId,
      options: surveyOptions,
    })
  }
}
