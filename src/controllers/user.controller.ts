import { 
	Controller, 
	// UseInterceptor, 
	Get, 
	Post,
  Put,
  Delete,
	Param,
	// Action,
	Body
} from 'routing-controllers';
import 'reflect-metadata';
import { Info } from '../models/info';

@Controller()
// @UseInterceptor(function (action: Action, content: any) {
// 	console.log('change response...');
// 	return content;
// })
export class UserController {
  @Get('/users/')
	getAll () {
		return 'This action returns user wadaw #';
	}

  @Get('/users/:id')
	getOne (@Param('id') id: number) {
		return 'This action returns user wadaw #' + id;
	}

  @Post('/users/')
  create (@Body() data: Info) {
  	console.log(JSON.stringify(data));
  }

  @Put('/users/:id')
  update (@Param('id') id: number, @Body() data: Info) {
  	console.log(JSON.stringify(data));
  }

  @Delete('/users/:id')
  remove (@Param('id') id: number) {
  	console.log();
  }
}
