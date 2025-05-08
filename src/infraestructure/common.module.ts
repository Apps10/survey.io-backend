import { JwtModule, JwtService as NestJwtService } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { LoginUserUseCase, RegisterUserUseCase } from 'src/application/useCases'
import { SurveyPrismaRepository, UserPrismaRepository } from './repositories'
import { SURVEY_REPOSITORY, USER_REPOSITORY } from 'src/domain/repositories'
import { JWT_SECRET } from 'src/shared/config'
import { HASH_SERVICE, JWT_SERVICE } from 'src/domain/services'
import { JwtServiceAdapter } from './services'
import { BcryptService, PrismaService } from 'src/shared/services'
import { BcryptHashServiceAdapter } from './adapter'
import { JwtAuthGuard, RolesGuard } from './guards'
import { SurveyGateway } from '../infraestructure/gateway'
import { SurveyUseCaseFactoryImp, UserUseCaseFactoryImp } from './factories'
import {
  CreateSurveyController,
  GetAllSurveyController,
  LoginUserController,
  RegisterUserController,
  VoteSurveyController,
} from './api/controllers'
import {
  USER_USE_CASES_FACTORY,
  SURVEY_USE_CASE_FACTORY,
} from 'src/application/factories'

@Module({
  imports: [
    PrismaService,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    CreateSurveyController,
    GetAllSurveyController,
    RegisterUserController,
    LoginUserController,
    VoteSurveyController,
  ],
  providers: [
    PrismaService,
    LoginUserUseCase,
    SurveyPrismaRepository,
    SurveyUseCaseFactoryImp,
    UserPrismaRepository,
    RegisterUserUseCase,
    LoginUserUseCase,
    BcryptService,
    BcryptHashServiceAdapter,
    JwtAuthGuard,
    RolesGuard,
    SurveyGateway,
    {
      provide: SURVEY_REPOSITORY,
      useClass: SurveyPrismaRepository,
    },
    {
      provide: SURVEY_USE_CASE_FACTORY,
      useClass: SurveyUseCaseFactoryImp,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
    {
      provide: JWT_SERVICE,
      useFactory: (jwt: NestJwtService) => new JwtServiceAdapter(jwt),
      inject: [NestJwtService],
    },
    {
      provide: HASH_SERVICE,
      useFactory: (bcryptService: BcryptService) =>
        new BcryptHashServiceAdapter(bcryptService),
      inject: [BcryptService],
    },
    {
      provide: USER_USE_CASES_FACTORY,
      useClass: UserUseCaseFactoryImp,
    },
  ],
  exports: [SURVEY_USE_CASE_FACTORY, USER_USE_CASES_FACTORY],
})
export class CommonModule {}
