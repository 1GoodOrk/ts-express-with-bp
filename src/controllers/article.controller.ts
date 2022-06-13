import { 
	Controller, 
	Get, 
	Post,
  Put,
  Delete,
	Param,
	Body
} from 'routing-controllers';
import 'reflect-metadata';
import { Info } from '../models/info';

@Controller()
// @UseInterceptor(function (action: Action, content: any) {
// 	console.log('change response...');
// 	return content;
// })
export class ArticleController {
  @Get('/articles/')
	getAll () {
		return 'This action returns user wadaw #';
	}

  @Get('/articles/:id')
	getOne (@Param('id') id: number) {
		return 'This action returns user wadaw #' + id;
	}

  @Post('/articles/')
  create (@Body() data: Info) {
  	console.log(JSON.stringify(data));
  }

  @Put('/articles/:id')
  update (@Param('id') id: number, @Body() data: Info) {
  	console.log(JSON.stringify(data));
  }

  @Delete('/articles/:id')
  remove (@Param('id') id: number) {
  	console.log();
  }
}
