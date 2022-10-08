import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { create, Whatsapp } from 'venom-bot';

@Injectable()
export class BotsService {
  create(createBotDto: CreateBotDto) {
    return 'This action adds a new bot';
  }

  waitMessageFromWhatsapp(languages, manager) {
    create("Bot-Whatsapp")
      .then((client: Whatsapp) => {
        client.onMessage(async (message) => {
          console.log(message.from);
          if (message.isGroupMsg === false && message.from !== 'Adriana') {

            const response = await manager.process(languages, message.body.toLocaleLowerCase());

            console.log(response);
            client
              .sendText(message.from, response.answer)
              .then(result => console.log(result))
              .catch(erro => console.log(erro));
          }
        });
      })
      .catch((erro) => {
        console.log(erro);
      });
    return `This action returns all bots`;
  }

  trainNaturalLanguage(languages, manager) {
    // SAUDACAO
    manager.addDocument(languages, "Olá", "SAUDACAO");
    manager.addDocument(languages, "Oi", "SAUDACAO");
    manager.addDocument(languages, "Bom dia", "SAUDACAO");
    manager.addDocument(languages, "Boa tarde", "SAUDACAO");
    manager.addDocument(languages, "Boa noite", "SAUDACAO");
    manager.addDocument(languages, "Iai", "SAUDACAO");
    manager.addDocument(languages, "Eae", "SAUDACAO");
    manager.addDocument(languages, "E ae", "SAUDACAO");
    manager.addDocument(languages, "Salve", "SAUDACAO");
    manager.addDocument(languages, "Preciso de ajuda", "SAUDACAO");
    manager.addDocument(languages, "Opa", "SAUDACAO");

    // CLIENTE NOVO
    manager.addDocument(languages, "Marcio", "NOME");
    manager.addDocument(languages, "André", "NOME");
    manager.addDocument(languages, "Brenda", "NOME");
    manager.addDocument(languages, "Tatiane", "NOME");
    manager.addDocument(languages, "Henry", "NOME");
    manager.addDocument(languages, "Adriana", "NOME");
    manager.addDocument(languages, "João", "NOME");

    // CLIENTE NOVO
    manager.addDocument(languages, "Quero fazer um emprestimo", "CADASTRO");
    manager.addDocument(languages, "Preciso um emprestimo", "CADASTRO");
    manager.addDocument(languages, "Como faço para pegar um emprestimo", "CADASTRO");
    manager.addDocument(languages, "Quero fazer um emprestimo", "CADASTRO");
    manager.addDocument(languages, "Quero fazer um emprestimo", "CADASTRO");
    manager.addDocument(languages, "Quero fazer um emprestimo", "CADASTRO");

    // CLIENTE JÁ CADASTRADO
    manager.addDocument(languages, "Quero acompanhar meu emprestimo", "CLIENTE");
    manager.addDocument(languages, "Como está meu emprestimo", "CLIENTE");
    manager.addDocument(languages, "Quando tenho que pagar", "CLIENTE");
    manager.addDocument(languages, "Qual valor do meu emprestimo", "CLIENTE");
    manager.addDocument(languages, "Já sou cliente", "CLIENTE");

    // RESPOSTAS

    // RESPOSTAS PARA SAUDACAO
    manager.addAnswer(languages, "SAUDACAO", "Olá, tudo bem? me chamo Pedro, primeiramente, qual seu nome ?");
    manager.addAnswer(languages, "SAUDACAO", "Olá, tudo bem? me chamo Jonas, qual seu nome ?");
    manager.addAnswer(languages, "SAUDACAO", "Olá, tudo bem? me chamo Brenda, qual seu nome ?");
    manager.addAnswer(languages, "SAUDACAO", "Olá, tudo bem? me chamo Tati, como posso te ajudar ?");
    manager.addAnswer(languages, "SAUDACAO", "Olá, tudo bem? me chamo André, como posso te ajudar hoje ?");


    // RESPOSTAS PARA NOME
    manager.addAnswer(languages, "NOME", "Prazer, você já é nosso cliente ou deseja fazer um novo emprestimo?");
    manager.addAnswer(languages, "NOME", "Muito bom falar contigo, o que posso fazer por ti hoje?");

    // RESPOSTA PARA CADASTRO 
    manager.addAnswer(languages, "CADASTRO", "Qual seu nome completo ?");
    manager.addAnswer(languages, "CADASTRO", "Agora preciso saber seu nome completo:");
    manager.addAnswer(languages, "CADASTRO", "Vamos começar seu cadastro, qual seu nome completo?");

    // RESPOSTA CLIENTE
    manager.addAnswer(languages, "CLIENTE", "Para prosseguir precisamos confirmar seu CPF:");
    manager.addAnswer(languages, "CLIENTE", "Que bom falar com você novamente, para prosseguir preciso confirmar seu CPF:");
    manager.addAnswer(languages, "CLIENTE", "Para que não haja quebra de sigilo preciso confirmar seu CPF:");



    (async () => {
      await manager.train();
      manager.save();
    })();
    return true;
  }

  update(id: number, updateBotDto: UpdateBotDto) {
    return `This action updates a #${id} bot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bot`;
  }
}
