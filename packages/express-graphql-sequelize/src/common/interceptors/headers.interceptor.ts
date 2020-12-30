import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TransformHeadersInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<any> {

        return next.handle().pipe(
            map((data) => {

                const ctx = GqlExecutionContext.create(context);

                // pipe call to add / modify header(s) after remote method
                // let req = ctx.switchToHttp().getRequest();

                let req = ctx.getContext().req

                req.res.header('Keep-Alive',"timeout=60")
                return data;
            }),
        );
    }
}