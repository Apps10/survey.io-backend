import { customExceptionMaker } from 'src/shared/exceptions/exceptionMaker'

export const UserNotFoundException = customExceptionMaker(
  'UserNotFoundException',
  'user not found',
)

export const UserAlreadyExistException = customExceptionMaker(
  'UserAlreadyExistException',
  'user already exist',
)

export const UserUnAuthorizedException = customExceptionMaker(
  'UserUnAuthorizedException',
  'credentials are invalid',
)
