import { ISurvey } from 'src/application/dtos/survey.dto'
import { ISurveyOptionDto } from 'src/application/dtos/surveyOption.dto'
import { Survey, SurveyOption } from 'src/domain/entities'
import { SurveyRepository } from 'src/domain/repositories/survey.repository'
import { PrismaService } from 'src/shared/services/prisma.service'

export class SurveyPrismaRepository implements SurveyRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(survey: Survey): Promise<void> {
    await this.prisma.survey.upsert({
      where: { id: survey.id },
      update: {
        question: survey.question,
        totalVotes: survey.totalVotes,
        isActive: survey.isActive,
        CreatedAt: survey.createdAt,
        options: {
          deleteMany: {}, // Limpia opciones anteriores
          create: survey.options.map((o) => ({
            id: o.id,
            text: o.text,
            countVotes: o.countVotes,
          })),
        },
      },
      create: {
        id: survey.id,
        question: survey.question,
        totalVotes: survey.totalVotes,
        isActive: survey.isActive,
        CreatedAt: survey.createdAt,
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
    })

    return surveys.map(
      (s: ISurvey) =>
        new Survey(
          s.id,
          s.question,
          s.totalVotes,
          s.isActive,
          s.options.map(
            (o: ISurveyOptionDto) =>
              new SurveyOption(o.id, s.id, o.text, o.countVotes),
          ),
          s.CreatedAt,
        ),
    )
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

    return new Survey(
      survey.id,
      survey.question,
      survey.totalVotes,
      survey.isActive,
      survey.options.map(
        (o: ISurveyOptionDto) =>
          new SurveyOption(o.id, survey.id, o.text, o.countVotes),
      ),
      survey.CreatedAt,
    )
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
