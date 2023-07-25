import { isDateInRange } from "../src/client/js/dateChecker.js";

const dateValueFuture = 33295374245000

test('Testing isDateInRange', () => {
    expect(isDateInRange(dateValueFuture)).toBe(false)
});
