import RegExUtil from "./RegExUtil";
import {DecoCallBackType} from "./CqlDecorator";
import {
    ContextRegEx,
    ControlQueryRegEx,
    DateRegEx,
    DefineNameRegEx,
    KeyWordRegEx,
    LogicalRegEx, NumericRegEx,
    OperatorRegEx, TemporalOperatorsRegEx,
    TimeRegEx
} from "./RegExDefinitions";

beforeEach(() => {
    jest.setTimeout(50);
});

test("TimeRegEx finds many matches", () => {
    const text = "default Interval[@2019-01-01T00:00:00.0, @2020-01-01T00:00:00.0)";
    const calledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, TimeRegEx, calledCallBack);
    expect(calledCallBack.mock.calls.length).toBe(2);
});

test("TimeRegEx finds many matches verify changes over iterations", () => {
    const text = "default Interval[@2019-01-01T00:00:00.0, @2020-01-01T00:00:00.0)";

    let wasCallbackCalledCount = 0;
    let lastStart = 0;
    let lastEnd = 0;

    const callBack: DecoCallBackType = (start: number, end: number) => {
        wasCallbackCalledCount++;
        expect(lastStart).toBeLessThan(start);
        expect(lastEnd).toBeLessThan(end);
        lastStart = start
        lastEnd = end;
    };

    RegExUtil.matchRegEx(text, TimeRegEx, callBack);
    expect(2).toEqual(wasCallbackCalledCount);
});

test("DateRegEx finds many matches", () => {
    const text = "default Interval[@2019-01-01T00:00:00.0, @2020-01-01T00:00:00.0)";
    const calledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, DateRegEx, calledCallBack);
    expect(calledCallBack.mock.calls.length).toBe(2);
});

test("DateRegEx finds no matches", () => {
    const text = "default Interval[2019-01-01T00:00:00.0, 2020-01-01T00:00:00.0)";
    const calledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, DateRegEx, calledCallBack);
    expect(calledCallBack.mock.calls.length).toBe(0);
});

test("DefineNameRegEx finds a match", () => {
    const text = "define \"Antithrombotic Not Given at Discharge\":";
    let wasCallbackCalled = false;

    const callBack: DecoCallBackType = (start: number, end: number) => {
        expect(6).toEqual(start);
        expect(47).toEqual(end);
        wasCallbackCalled = true;
    };

    RegExUtil.matchRegEx(text, DefineNameRegEx, callBack);
    expect(wasCallbackCalled).toBe(true);
});

test("DefineNameRegEx does not match simple case", () => {
    const text = "where NoAntithromboticDischarge.doNotPerform is true";
    const neverCalledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, DefineNameRegEx, neverCalledCallBack);
    expect(neverCalledCallBack.mock.calls.length).toBe(0);
});

test("DefineNameRegEx does not match with colon", () => {
    const text = "\t[\"MedicationRequest\": medication in \"Antithrombotic Therapy\"] Antithrombotic";
    const neverCalledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, DefineNameRegEx, neverCalledCallBack);
    expect(neverCalledCallBack.mock.calls.length).toBe(0);
});

test("LogicalRegEx does not find a match", () => {
    const text = "     band Antithrombotic.status in { 'active', 'completed' } also bor";
    const neverCalledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, LogicalRegEx, neverCalledCallBack);
    expect(neverCalledCallBack.mock.calls.length).toBe(0);
});

test("LogicalRegEx finds a match", () => {
    const text = "     and Antithrombotic.status in { 'active', 'completed' }";
    let wasCallbackCalled = false;

    const callBack: DecoCallBackType = (start: number, end: number) => {
        expect(5).toEqual(start);
        expect(8).toEqual(end);
        wasCallbackCalled = true;
    };

    RegExUtil.matchRegEx(text, LogicalRegEx, callBack);
    expect(wasCallbackCalled).toBe(true);
});

test("LogicalRegEx find a match with embedded or", () => {
    const text = "  exists (NoAntithromboticDischarge.category C where FHIRHelpers.ToConcept(C) ~ Global.\"Community\" or FHIRHelpers.ToConcept(C) ~ Global.\"Discharge\")\n";
    const oneTimeCallBack = jest.fn();
    RegExUtil.matchRegEx(text, LogicalRegEx, oneTimeCallBack);
    expect(oneTimeCallBack.mock.calls.length).toBe(1);
});

test("LogicalRegEx does not find a match with embedded or", () => {
    const text = "  valueset \"Discharged to Home or Hospice Care\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.117.1.7.1.209'\n";
    const neverCalledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, LogicalRegEx, neverCalledCallBack);
    expect(neverCalledCallBack.mock.calls.length).toBe(0);
});


test("OperatorRegEx  does not find a match with embedded to", () => {
    const text = "  valueset \"Discharged to Home for Hospice Care\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.117.1.7.1.209'\n";
    const neverCalledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, OperatorRegEx, neverCalledCallBack);
    expect(neverCalledCallBack.mock.calls.length).toBe(0);
});

test("OperatorRegEx  does not find a match within quotes and find match outside of quotes", () => {
    const text = "\"to\"  cast  \"to my home\" \n";
    let wasCallbackCalled = false;

    const callBack: DecoCallBackType = (start: number, end: number) => {
        expect(6).toEqual(start);
        expect(10).toEqual(end);
        wasCallbackCalled = true;
    };

    RegExUtil.matchRegEx(text, OperatorRegEx, callBack);
    expect(wasCallbackCalled).toBe(true);
});


test("KeyWordRegEx does not find a match with embedded define", () => {
    const text = "  badvalueset \"Discharged to Home define Hospice Care\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.117.1.7.1.209'\n";
    const neverCalledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, KeyWordRegEx, neverCalledCallBack);
    expect(neverCalledCallBack.mock.calls.length).toBe(0);
});


test("ControlQueryRegEx find a match with embedded with", () => {
    const text = "     with \"Ticagrelor Therapy at Discharge\" DischargeTicagrelor\n";
    let wasCallbackCalled = false;

    const callBack: DecoCallBackType = (start: number, end: number) => {
        expect(5).toEqual(start);
        expect(9).toEqual(end);
        wasCallbackCalled = true;
    };

    RegExUtil.matchRegEx(text, ControlQueryRegEx, callBack);
    expect(wasCallbackCalled).toBe(true);
});

test("TemporalOperatorsRegEx does not find a match with embedded starts", () => {
    const text = " valueset \"Discharged to Home to starts Hospice Care\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.117.1.7.1.209'\n";
    const neverCalledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, TemporalOperatorsRegEx, neverCalledCallBack);
    expect(neverCalledCallBack.mock.calls.length).toBe(0);
});

test("TemporalOperatorsRegEx find a match with embedded during", () => {
    const text = " such that DischargeTicagrelor.authoredOn during IschemicStrokeEncounter.period";
    let wasCallbackCalled = false;

    const callBack: DecoCallBackType = (start: number, end: number) => {
        expect(42).toEqual(start);
        expect(48).toEqual(end);
        wasCallbackCalled = true;
    };

    RegExUtil.matchRegEx(text,TemporalOperatorsRegEx, callBack);
    expect(wasCallbackCalled).toBe(true);
});

test("NumericRegEx find a match with embedded 123", () => {
    const text = " such that 123 > IschemicStrokeEncounter.period";
    let wasCallbackCalled = false;

    const callBack: DecoCallBackType = (start: number, end: number) => {
        expect(10).toEqual(start);
        expect(14).toEqual(end);
        wasCallbackCalled = true;
    };

    RegExUtil.matchRegEx(text, NumericRegEx, callBack);
    expect(wasCallbackCalled).toBe(true);
});

test("NumericRegEx does not find a match", () => {
    const text = " valueset \"Discharged to Home 22 to starts Hospice Care\": 'http://cts.nlm.nih.gov/fhir/ValueSet/2.16.840.1.113883.3.117.1.7.1.209'\n";
    const neverCalledCallBack = jest.fn();
    RegExUtil.matchRegEx(text, TemporalOperatorsRegEx, neverCalledCallBack);
    expect(neverCalledCallBack.mock.calls.length).toBe(0);
});

test("Context Patient not found", () => {
    const text = " context Person";
    let wasCallbackCalled = false;
    const neverCalledCallBack = jest.fn();

    RegExUtil.matchRegEx(text, ContextRegEx, neverCalledCallBack);
    expect(neverCalledCallBack.mock.calls.length).toBe(0);
});

test("Context Patient found", () => {
    const text = " context Patient";
    let wasCallbackCalled = false;

    const callBack: DecoCallBackType = (start: number, end: number) => {
        expect(1).toEqual(start);
        expect(16).toEqual(end);
        wasCallbackCalled = true;
    };

    RegExUtil.matchRegEx(text, ContextRegEx, callBack);
    expect(wasCallbackCalled).toBe(true);
});