import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage", () => {
    test("ローカルストレージからkeyを元に値を取得", () => {
        const { result } = renderHook(() => useLocalStorage("testNumber", 0));
        expect(result.current[0]).toBe(0);

        act(() => {
            result.current[1](2);
        });
        expect(result.current[0]).toBe(2);
    });

    // test("値を更新", )
});
