import {
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common'
import {
  SurveyNotFoundException,
  SurveyOptionNotFoundException,
  SurveysNotExistException,
  UserAlreadyExistException,
  UserNotFoundException,
  UserUnAuthorizedException,
} from 'src/domain/exceptions'

export function mapDomainErrorToHttp(error: Error): HttpException {
  if (
    error instanceof UserNotFoundException ||
    error instanceof SurveyNotFoundException ||
    error instanceof SurveyOptionNotFoundException ||
    error instanceof SurveysNotExistException
  ) {
    return new NotFoundException(error.errorMessage)
  } else if (error instanceof UserAlreadyExistException) {
    return new BadRequestException(error.errorMessage)
  } else if (error instanceof UserUnAuthorizedException) {
    return new UnauthorizedException(error.errorMessage)
  }

  console.error(`💣 Error UnHandled: ${error}`)
  return new InternalServerErrorException()
}
