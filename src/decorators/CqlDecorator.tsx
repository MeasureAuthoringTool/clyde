import {ContentBlock} from "draft-js";
import {PropsWithChildren} from "react";
import RegExUtil from "./RegExUtil";
import {
    ArithmeticRegEx,
    ComparisonRegEx,
    ConstantLanguageRegEx,
    ContextRegEx,
    ControlQueryRegEx,
    DateRegEx,
    DefineNameRegEx,
    KeyWordRegEx,
    ListOperatorsRegEx,
    LogicalRegEx,
    NumericRegEx,
    OperatorRegEx,
    SingleLineCommentRegEx,
    TemporalOperatorsRegEx,
    TickRegEx,
    TimeRegEx,
    TypesRegEx
} from "./RegExDefinitions";

const {CompositeDecorator} = require("draft-js");

export interface DecoCallBackType {
    (start: number, end: number): void;
}

export function matchEntityStrategy(regEx: RegExp) {
    return function (contentBlock: ContentBlock, callback: DecoCallBackType) {
        RegExUtil.matchRegEx(contentBlock.getText(), regEx, callback);
    }
}

function createSpan(className: string) {
    return (props: PropsWithChildren<any>) => {
        return <span className={className}>{props.children}</span>;
    };
}

const cqlDecorator = new CompositeDecorator([
    {
        strategy: matchEntityStrategy(SingleLineCommentRegEx),
        component: createSpan("commentCql")
    },
    {
        strategy: matchEntityStrategy(KeyWordRegEx),
        component: createSpan("keywordCql")
    },
    {
        strategy: matchEntityStrategy(TickRegEx),
        component: createSpan("tickCql")
    },
    {
        strategy: matchEntityStrategy(DefineNameRegEx),
        component: createSpan("defineNameCql")
    },
    {
        strategy: matchEntityStrategy(ConstantLanguageRegEx),
        component: createSpan("constantLanguageCql")
    },
    {
        strategy: matchEntityStrategy(DateRegEx),
        component: createSpan("dateTimeCql")
    },
    {
        strategy: matchEntityStrategy(TimeRegEx),
        component: createSpan("dateTimeCql")
    },
    {
        strategy: matchEntityStrategy(LogicalRegEx),
        component: createSpan("keywordCql")
    },
    {
        strategy: matchEntityStrategy(OperatorRegEx),
        component: createSpan("defineNameCql")
    },
    {
        strategy: matchEntityStrategy(ComparisonRegEx),
        component: createSpan("keywordCql")
    },
    {
        strategy: matchEntityStrategy(ArithmeticRegEx),
        component: createSpan("keywordCql")
    },
    {
        strategy: matchEntityStrategy(ControlQueryRegEx),
        component: createSpan("keywordCql")
    },
    {
        strategy: matchEntityStrategy(TemporalOperatorsRegEx),
        component: createSpan("keywordCql")
    },
    {
        strategy: matchEntityStrategy(ListOperatorsRegEx),
        component: createSpan("keywordCql")
    },
    {
        strategy: matchEntityStrategy(TypesRegEx),
        component: createSpan("keywordCql")
    },
    {
        strategy: matchEntityStrategy(NumericRegEx),
        component: createSpan("numberCql")
    },
    {
        strategy: matchEntityStrategy(ContextRegEx),
        component: createSpan("contextCql")
    }
]);

export default cqlDecorator;