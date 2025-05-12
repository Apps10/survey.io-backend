import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ISurveyOptionPrimitive, ISurveyPrimivite } from 'src/domain/entities'

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SurveyGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server

  afterInit() {
    console.log('WebSocket Server Initialized')
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`)
  }

  handleVote(
    @MessageBody()
    data: {
      surveyId: string
      totalVotes: number
      options: ISurveyOptionPrimitive[]
    },
  ) {
    this.server.emit('survey:newVote', {
      surveyId: data.surveyId,
      totalVotes: data.totalVotes,
      options: data.options,
    })
  }

  handleNewSurvey(
    @MessageBody()
    survey: ISurveyPrimivite,
  ) {
    this.server.emit('survey:new', {
      ...survey,
    })
  }
}
