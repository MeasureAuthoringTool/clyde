import {antlrService} from "./AnltrService";

test("Verify antlrService debounce", async () => {
    let nextExecutionCount: number = 0;

    antlrService.getResults().subscribe({
        next: value => {
            expect("Good").toEqual(value.library?.name);
            nextExecutionCount++;
        }
    });

    antlrService.sendContents("library BAD version '8.2.000'"); // debounceTime should make it skip
    antlrService.sendContents("library Good version '8.2.000'");
    await new Promise((r) => setTimeout(r, 600));
    antlrService.sendContents("library Good version '8.2.000'");
    await new Promise((r) => setTimeout(r, 600));
    expect(2).toEqual(nextExecutionCount);
});
