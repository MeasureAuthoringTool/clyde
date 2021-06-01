export const SingleLineCommentRegEx: RegExp = /\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm;
export const KeyWordRegEx: RegExp = /\b(define|library|using|include|version|called|parameter|default|valueset|codesystems?|display|public|private)(?=[^"]*(?:"[^"]*"[^"]*)*$)\b/g;
export const TickRegEx: RegExp = /'(.*?)'/g;
export const DefineNameRegEx: RegExp = /\b(?<=define)\s"(.*?)":/g
export const ConstantLanguageRegEx: RegExp = /\b(true|false|null)\b/g;
export const DateRegEx: RegExp =   /@[0-2][0-9][0-9][0-9]-[0-1][0-9]-[0-9][0-9]/g;
export const TimeRegEx: RegExp =/T[0-2][0-9]:[0-5][0-9](:[0-9][0-9])?(.[0-9])?/g;
export const LogicalRegEx: RegExp = /\b(and|or|xor|not)(?=[^"]*(?:"[^"]*"[^"]*)*$)\b/g;
export const OperatorRegEx: RegExp = /\b(cast|as|convert|to|is|ToBoolean|ToConcept|ToDateTime|ToDecimal|ToInteger|ToQuantity|ToString|ToTime)(?=[^"]*(?:"[^"]*"[^"]*)*$)\b/g;
export const ComparisonRegEx: RegExp =  /=|<|>|matches/g
export const ArithmeticRegEx: RegExp =  /[+\-*/^]/g
export const ControlQueryRegEx: RegExp = /\b(with|without|where|return|such that|sort( +asc(ending)?|desc(ending)?)?( +by)|asc(ending)|desc(ending))(?=[^"]*(?:"[^"]*"[^"]*)*$)\b/g;
export const TemporalOperatorsRegEx: RegExp = /\b(starts|ends|occurs|meets|overlaps|contains|includes|during|before|after|start|endyear|month|day|hour|minute|second|millisecond)(?=[^"]*(?:"[^"]*"[^"]*)*$)\b/g;
export const ListOperatorsRegEx: RegExp = /\b(contains|except|in|intersect|union|all|distinct|exists|expand|First|IndexOf|Last|Length|singleton +from)(?=[^"]*(?:"[^"]*"[^"]*)*$)\b/g;
export const TypesRegEx: RegExp = /\b(Any|Boolean|Code|Concept|DateTime|Decimal|Integer|Interval|List|Quantity|String|Time|Tuple)(?=[^"]*(?:"[^"]*"[^"]*)*$)\b/g;
export const NumericRegEx: RegExp = /\s([0-9]+)(?=[^"]*(?:"[^"]*"[^"]*)*$)/g;
export const ContextRegEx: RegExp = /\bcontext (Patient|Population)/g;
