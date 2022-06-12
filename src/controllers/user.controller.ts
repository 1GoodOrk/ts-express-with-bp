import { 
  Controller, 
  UseBefore, 
  UseAfter, 
  UseInterceptor, 
  Get, 
  Post,
  Param,
  OnUndefined,
  Action,
  Body
} from 'routing-controllers';
import 'reflect-metadata';
import log4js from 'log4js';
import { Info } from '../models/info';
const logger = log4js.getLogger();
logger.level = 'info';

@Controller()
// @UseBefore(loggingBefore)
// @UseAfter(loggingAfter)
@UseInterceptor(function (action: Action, content: any) {
  console.log('change response...');
  return content;
})
export class UserController {
  @Get('/users/:id')
  getOne (@Param('id') id: number) {
    logger.info('log4js log debug');
    return 'This action returns user wadaw #' + id;
  }

  @Post('/users/:id')
  @OnUndefined(204)
  postOne (@Param('id') id: number, @Body() info: Info) {
    console.log(JSON.stringify(info));
  }
}
