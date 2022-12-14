import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BotsService } from './bots.service';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { NlpManager } from 'node-nlp';


@Controller('bots')
export class BotsController {
  constructor(private readonly botsService: BotsService) { }

  @Post()
  create(@Body() createBotDto: CreateBotDto) {
    return this.botsService.create(createBotDto);
  }

  @Get()
  findAll() {
    const languages = 'pt';
    const manager = new NlpManager({ languages, forceNER: true });
    this.botsService.trainNaturalLanguage(languages, manager);
    this.botsService.waitMessageFromWhatsapp(languages, manager);

    return true;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return '';
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBotDto: UpdateBotDto) {
    return this.botsService.update(+id, updateBotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.botsService.remove(+id);
  }
}
