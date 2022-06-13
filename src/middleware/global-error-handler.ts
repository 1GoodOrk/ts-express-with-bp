import { ErrorMiddlewareInterface, MiddlewareGlobalAfter, HttpError } from 'routing-controllers';
import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

@MiddlewareGlobalAfter()
export class GlobalErrorHandler implements ErrorMiddlewareInterface {
  public error(error: any, _req: Request, res: Response, _next: NextFunction) {
    const responseObject = {} as any;
    // if its an array of ValidationError
    if (Array.isArray(error) && error.every((element) => element instanceof ValidationError)) {
      res.status(400);
      responseObject.message = "You have an error in your request's body. Check 'errors' field for more details!";
      responseObject.errors = error;
    } else {
      // set http status
      if (error instanceof HttpError && error.httpCode) {
        res.status(error.httpCode);
      } else {
        res.status(500);
      }

      if (error instanceof Error) {
        const developmentMode: boolean = process.env.NODE_ENV === "development";
        // set response error fields
        if (error.name && (developmentMode || error.message)) { // show name only if in development mode and if error message exist too
          responseObject.name = error.name;
        }
        if (error.message) {
          responseObject.message = error.message;
        }
        if (error.stack && developmentMode) {
          responseObject.stack = error.stack;
        }
      } else if (typeof error === "string") {
        responseObject.message = error;
      }
    }
    res.json(responseObject);

    //   protected processJsonError(error: any) {
    //     if (!this.isDefaultErrorHandlingEnabled)
    //         return error;
    
    //     let processedError: any = {};
    //     if (error instanceof Error) {
    //         const name = error.name && error.name !== "Error" ? error.name : error.constructor.name;
    
    //         if (name && (this.developmentMode || error.message)) // show name only if in debug mode and if error message exist too
    //             processedError.name = name;
    //         if (error.message)
    //             processedError.message = error.message;
    //         if (error.stack && this.developmentMode)
    //             processedError.stack = error.stack;
    
    //         Object.keys(error)
    //             .filter(key => key !== "stack" && key !== "name" && key !== "message" && (!(error instanceof HttpError) || key !== "httpCode"))
    //             .forEach(key => processedError[key] = (error as any)[key]);
    
    //         if (this.errorOverridingMap)
    //             Object.keys(this.errorOverridingMap)
    //                 .filter(key => name === key)
    //                 .forEach(key => processedError = this.merge(processedError, this.errorOverridingMap[key]));
    
    //         return Object.keys(processedError).length > 0 ? processedError : undefined;
    //     }
    
    //     return error;
    // }
    
    //   protected processTextError(error: any) {
    //     if (!this.isDefaultErrorHandlingEnabled)
    //       return error;
    //     if (error instanceof Error) {
    //       if (this.developmentMode && error.stack) {
    //         return error.stack;
    //       } else if (error.message) {
    //         return error.message;
    //       }
    //     }
    //     return error;
    //   }
  }  
}