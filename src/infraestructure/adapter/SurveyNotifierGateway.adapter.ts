import { SurveyNotifierService } from 'src/domain/services'
import { SurveyGateway } from '../gateway'
import { ISurveyOptionPrimitive, ISurveyPrimivite } from 'src/domain/entities'
import { InjectableCustom } from 'src/shared/decorators'

@InjectableCustom()
export class SurveyNotifierGatewayAdapter implements SurveyNotifierService {
  constructor(private readonly surveyGateway: SurveyGateway) {}

  NotifyVote(surveyId: string, surveyOptions: ISurveyOptionPrimitive[]): void {
    const totalVotes = surveyOptions.reduce(
      (accumulator, currentValue) => accumulator + currentValue.countVotes,
      0,
    )
    this.surveyGateway.handleVote({
      surveyId,
      totalVotes: totalVotes,
      options: surveyOptions,
    })
  }

  NotifyNewSurvey(Survey: ISurveyPrimivite): void {
    this.surveyGateway.handleNewSurvey({
      ...Survey,
    })
  }
}
