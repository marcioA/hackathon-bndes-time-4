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
    const cpfsCadastrados = ['11111111111', '33333333333', '44444444444'];
    let cpfFlag = false;

    create("Bot-Whatsapp")
      .then((client: Whatsapp) => {
        client.onMessage(async (message) => {
          if (message.isGroupMsg === false) {
            const response = await manager.process(languages, message.body.toLocaleLowerCase());
            if (response.intent === 'None')
              client.sendText(message.from, "Desculpe, não entendi, tenta enviar de outra forma ou com poucas palavras")

            if (response.intent === 'JAEXISTE')
              client.sendContactVcard(message.from, '5511953974323', 'Consultora Brenda')
                .catch(erro => console.log(erro));

            if (response.intent === 'LOCALIDADE') {
              client.sendText(message.from, "Vamos te ajudar a criar um plano de uso para o dinheiro, de acordo com os dados informados").catch(erro => console.log(erro));
              client.sendText(message.from, "Em até 3 dias retornaremos por telefone para prosseguir com seu pedido").catch(erro => console.log(erro));
            }

            if (response.intent === 'CPF') {
              client.sendText(message.from, "A parcela do seu emprestimo vence no dia 01/11/2022 no valor de R$ 250,00").catch(erro => console.log(erro));
              client.sendText(message.from, "Para conseguir pagar sua conta recomendamos que você guarde o valor de R$ 8,50 por dia").catch(erro => console.log(erro));
              response.intent = 'CPF';
            }

            // await client.sendListMenu(message.from, 'Title', 'subTitle', 'Description', 'menu', list)
            //   .catch((erro) => {
            //     console.error('Error when sending: ', erro); //return object error
            //   });

            client
              .sendText(message.from, response.answer)
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

    // // NOME
    manager.addDocument(languages, "Marcio", "NOME");
    manager.addDocument(languages, "Henry", "NOME");
    manager.addDocument(languages, "Brenda", "NOME");
    manager.addDocument(languages, "Tatiane", "NOME");
    manager.addDocument(languages, "Haziel", "NOME");
    manager.addDocument(languages, "André", "NOME");
    manager.addDocument(languages, "Adriana", "NOME");
    manager.addDocument(languages, "Georgia", "NOME");
    manager.addDocument(languages, "Luiz", "NOME");
    manager.addDocument(languages, "Felipe", "NOME");
    manager.addDocument(languages, "Murilo", "NOME");

    // // MOMENTO
    manager.addDocument(languages, "Nova", "NOVA");
    manager.addDocument(languages, "Abrir", "NOVA");
    manager.addDocument(languages, "já existe", "JAEXISTE");

    // // LOCAL
    manager.addDocument(languages, "endereço", "LOCALIDADE");

    // DOCS
    manager.addDocument(languages, "11111111111", "CPF");
    manager.addDocument(languages, "33333333333", "CPF");
    manager.addDocument(languages, "44444444444", "CPF");
    manager.addDocument(languages, "111.111.111-11", "CPF");
    manager.addDocument(languages, "333.333.333-33", "CPF");
    manager.addDocument(languages, "444.444.444-44", "CPF");

    // FINALIZAÇÃO
    manager.addDocument(languages, "Tchau", "FINALIZAÇÃO");
    manager.addDocument(languages, "Sair", "FINALIZAÇÃO");
    manager.addDocument(languages, "xau", "FINALIZAÇÃO");
    manager.addDocument(languages, "até mais", "FINALIZAÇÃO");

    // RESPOSTAS

    // RESPOSTAS PARA SAUDACAO
    manager.addAnswer(languages, "SAUDACAO", "Olá, tudo bem? me chamo Bob, seu assistente virtual. como posso te ajudar ?");
    manager.addAnswer(languages, "SAUDACAO", "Olá, tudo bem? me chamo Bob,sou um assistente virtual. Como posso te ajudar ?");
    manager.addAnswer(languages, "SAUDACAO", "Olá, tudo bem? me chamo Bob, como posso te ajudar hoje ?");

    // RESPOSTA PARA CADASTRO 
    manager.addAnswer(languages, "CADASTRO", "Qual seu nome completo ?");
    manager.addAnswer(languages, "CADASTRO", "Agora preciso saber seu nome completo:");
    manager.addAnswer(languages, "CADASTRO", "Vamos começar seu cadastro, qual seu nome completo?");

    // RESPOSTA CLIENTE
    manager.addAnswer(languages, "CLIENTE", "Para prosseguir precisamos confirmar seu CPF:");
    manager.addAnswer(languages, "CLIENTE", "Que bom falar com você novamente, para prosseguir preciso confirmar seu CPF:");
    manager.addAnswer(languages, "CLIENTE", "Para que não haja quebra de sigilo preciso confirmar seu CPF:");

    // RESPOSTA NOME
    manager.addAnswer(languages, "NOME", "Sua empresa já existe ou você abrir uma ?");

    // RESPOSTA MOMENTO
    manager.addAnswer(languages, "NOVA", "O que você quer abrir ?");
    manager.addAnswer(languages, "JAEXISTE", "Você já pode solicitar seu emprestimo direto em um dos parceiros");

    // LOCALIDADE
    manager.addAnswer(languages, "LOCALIDADE", "Legal, já estamos salvando esses dados no nosso sistema e vamos te enviar um resumo no final");

    // CPF
    manager.addAnswer(languages, "CPF", "Boa, vou consultar seu contrato, só um minuto.");

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
