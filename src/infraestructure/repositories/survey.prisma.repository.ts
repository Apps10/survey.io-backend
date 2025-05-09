import { Injectable } from '@nestjs/common'
import { Survey } from 'src/domain/entities'
import { SurveyRepository } from 'src/domain/repositories/survey.repository'
import { PrismaService } from 'src/shared/services/prisma.service'

@Injectable()
export class SurveyPrismaRepository implements SurveyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(survey: Survey): Promise<void> {
    const existingSurvey = await this.prisma.survey.findUnique({
      where: { id: survey.id },
    })

    if (existingSurvey) {
      await this.prisma.survey.update({
        where: { id: survey.id },
        data: {
          ...survey,
          options: {
            updateMany: survey.options.map(({ surveyId, ...o }) => ({
              data: { ...o },
              where: { id: o.id },
            })),
          },
        },
      })
      return
    }

    await this.prisma.survey.create({
      data: {
        ...survey,
        options: {
          create: survey.options.map((o) => ({
            id: o.id,
            text: o.text,
            countVotes: o.countVotes,
          })),
        },
      },
    })
  }

  async deactivateSurvey(surveyId: string): Promise<void> {
    await this.prisma.survey.update({
      data: {
        isActive: false,
      },
      where: { id: surveyId },
    })
  }

  async findAll(): Promise<Survey[] | []> {
    const surveys = await this.prisma.survey.findMany({
      where: {
        isActive: true,
      },
      include: {
        options: true,
      },
    })
    return Survey.fromPrimitiveArray(surveys)
  }

  async findById(id: string): Promise<Survey | null> {
    const survey = await this.prisma.survey.findUnique({
      where: {
        id,
      },
      include: {
        options: true,
      },
    })

    if (!survey) {
      return null
    }

    return Survey.fromPrimitives(survey)
  }

  async saveUserVote(userId: string, optionId: string): Promise<void> {
    await this.prisma.vote.create({
      data: {
        userId,
        optionId,
      },
    })
  }
}
