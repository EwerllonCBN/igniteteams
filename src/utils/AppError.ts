export class AppError {
  message: string
  //Ele é chamado no momento em que a classe é instanciada
  //No momen6to que a classe for instanciada vou convocar uma mensagem do tipo string
  //
  constructor(message: string) {
    this.message = message
  }
}
