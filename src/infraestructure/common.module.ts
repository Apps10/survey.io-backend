import { Module } from '@nestjs/common'
import {
  CreateSurveyController,
  GetAllSurveyController,
} from './api/controllers'
import { PrismaService } from 'src/shared/services/prisma.service'
import { LoginUserUseCase } from 'src/application/useCases'
import { SurveyPrismaRepository } from './repositories'
import { SurveyUseCaseFactoryImp } from './factories'
import { SURVEY_USE_CASE_FACTORY } from '../application/factories'
import { SURVEY_REPOSITORY } from 'src/domain/repositories'

@Module({
  imports: [PrismaService],
  controllers: [CreateSurveyController, GetAllSurveyController],
  providers: [
    PrismaService,
    LoginUserUseCase,
    SurveyPrismaRepository,
    SurveyUseCaseFactoryImp,
    {
      provide: SURVEY_REPOSITORY,
      useClass: SurveyPrismaRepository,
    },
    {
      provide: SURVEY_USE_CASE_FACTORY,
      useClass: SurveyUseCaseFactoryImp,
    },
  ],
  exports: [SURVEY_USE_CASE_FACTORY],
})
export class CommonModule {}
