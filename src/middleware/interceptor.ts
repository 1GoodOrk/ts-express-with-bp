import httpContext from 'express-http-context';
import { Request, Response, NextFunction } from 'express';

console.log('set traceId = 123');
httpContext.set('traceId', 123);

export function loggingBefore (request: Request, response: Response, next: NextFunction): any {
	console.log('do something Before...');
	next();
}

export function loggingAfter (request: Request, response: Response, next: NextFunction): any {
	console.log(`tracedId = ${httpContext.get('traceId')}`);
	next();
}