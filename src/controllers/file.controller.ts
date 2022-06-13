import { 
	Controller, 
	Get, 
	Post,
  Delete,
	Param,
	Body
} from 'routing-controllers';
import 'reflect-metadata';
import { LoggingSystem } from '../utils/logging';

@Controller()
export class FileController {

  @Get('/file/:id')
	getOne (@Param('id') id: number) {
    LoggingSystem.info('This action returns user wadaw #' + id)
	}

  @Post('/file/')
  create (@Body() data: Buffer) {
  	console.log(JSON.stringify(data));
  }

  @Delete('/users/:id')
  remove (@Param('id') id: number) {
  	console.log();
  }
}
