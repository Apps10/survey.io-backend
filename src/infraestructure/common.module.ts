import { JwtModule, JwtService as NestJwtService } from '@nestjs/jwt'
import { Module } from '@nestjs/common'
import { PrismaService } from 'src/shared/services'
import { LoginUserUseCase, RegisterUserUseCase } from 'src/application/useCases'
import { SurveyPrismaRepository, UserPrismaRepository } from './repositories'
import { SurveyUseCaseFactoryImp } from './factories'
import { SURVEY_USE_CASE_FACTORY } from '../application/factories'
import { SURVEY_REPOSITORY, USER_REPOSITORY } from 'src/domain/repositories'
import { JWT_SECRET } from 'src/shared/config'
import {
  CreateSurveyController,
  GetAllSurveyController,
} from './api/controllers'
import { RegisterUserController } from './api/controllers/registerUser.controller'
import { USER_USE_CASES_FACTORY } from 'src/application/factories/userUseCases.factory'
import { UserUseCaseFactoryImp } from './factories/userUseCase.factory'
import { HASH_SERVICE, JWT_SERVICE } from 'src/domain/services'
import { JwtServiceAdapter } from './services'
import { BcryptService } from 'src/shared/services/bcrypt.service'
import { BcryptHashServiceAdapter } from './adapter/BcryptHashService.adapter'

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
