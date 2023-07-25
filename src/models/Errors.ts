import { USERS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/status'

type ErrorTypes = Record<string, { msg: string; [key: string]: string }>
// normal error
export class ErrorWithStatus {
  private message: string
  private status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
  public get Message() {
    return this.message
  }
  public set Message(message: string) {
    this.message = message
  }
  public get Status() {
    return this.status
  }
  public set Status(status: number) {
    this.status = status
  }
}
// validation
export class ValidationError extends ErrorWithStatus {
  private errors: ErrorTypes
  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorTypes }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
  public set Errors(errors: any) {
    this.errors = errors
  }
}
