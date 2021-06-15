import {asyncScheduler, Subject} from "rxjs";
import {debounceTime, observeOn} from "rxjs/operators";
import {CqlAntlr, CqlResult} from "cql-antlr-parser";

const inputSubject = new Subject<string>();

inputSubject
    .pipe(debounceTime(500), observeOn(asyncScheduler))
    .subscribe({
        next: (cqlText: string) => outputSubject.next(parseAntlr(cqlText)),
        error: (e) => console.error("inputSubject subscription error: " + e),
        complete: () => console.info("inputSubject subscription is complete")
    });

const outputSubject = new Subject<CqlResult>();

function parseAntlr(text: string): CqlResult {
    const start = new Date().getTime();
    const result: CqlResult = new CqlAntlr(text).parse();
    console.info("CqlAntlr parse Execution time: " + (new Date().getTime() - start));
    return result;
}

export const antlrService = {
    sendContents: (message: string) => inputSubject.next(message),
    getResults: () => outputSubject.asObservable()
};



