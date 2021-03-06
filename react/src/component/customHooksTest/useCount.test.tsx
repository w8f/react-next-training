import { renderHook, act } from "@testing-library/react-hooks";
import { useCount, CounterStepProvider } from "./useCount";

describe("useCountフックのテスト", () => {
  test("should use counter", () => {
    const { result } = renderHook(() => useCount());

    expect(result.current.count).toBe(0);
    expect(typeof result.current.increment).toBe("function");
    expect(typeof result.current.decrement).toBe("function");
  });

  test("should increment count", () => {
    const { result } = renderHook(() => useCount());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  test("should decrement count", () => {
    const { result } = renderHook(() => useCount());

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });

  test("should increment count from custom initial value", () => {
    const { result } = renderHook(() => useCount(3000));

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(3001);
  });

  /**
   * Propsが多い場合だと、それらをすべて追跡する変数を持つのは難しい。。
   */
  test("should reset count to updated initial value", () => {
    let initialValue = 0;
    const { result, rerender } = renderHook(() => useCount(initialValue));

    initialValue = 10;
    rerender();

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });

  /**
   * rerenderのinitialPropsオプションを利用した例。こっちのほうが、スマートな感じ？
   */
  test("should reset count to updated initial value2", () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useCount(initialValue),
      {
        initialProps: {
          initialValue: 0,
        },
      }
    );

    rerender({ initialValue: 10 });

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(10);
  });

  test("should use custom step when incrementing", () => {
    const wrapper = ({ children }: { children: JSX.Element }) => (
      <CounterStepProvider step={2}>{children}</CounterStepProvider>
    );
    /**
     * renderHookのwrapperオプションは、レンダリング時にテストコンポーネントをラップするための React コンポーネントです。
     * これは通常、フックが useContext でアクセスするために
     * React.createContext からコンテキストプロバイダを追加するために使用されます。
     *
     * 要はuseContextを利用したhookの場合、wrapperオプションを利用する。
     */
    const { result } = renderHook(() => useCount(), { wrapper });

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(2);
  });

  test("should use custom step when incrementing2", () => {
    const wrapper = ({
      step,
      children,
    }: {
      step: number;
      children: JSX.Element;
    }) => <CounterStepProvider step={step}>{children}</CounterStepProvider>;

    const { result, rerender } = renderHook(() => useCount(), {
      wrapper,
      initialProps: {
        step: 2,
        children: <></>,
      },
    });

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(2);

    rerender({ step: 8, children: <></> });

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(10);
  });

  test("should increment count after delay", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCount());

    // 状態の更新は await waitForNextUpdate() の間に非同期に行われるので、
    // act() で incrementAsync をラップする必要はない。
    result.current.incrementAsync();

    // test対象の関数が非同期の場合、waitForNextUpdateを利用することで、
    // 関数の実行が完了するまで、後続処理を待ってくれる
    await waitForNextUpdate();

    expect(result.current.count).toBe(1);
  });

  test("should throw error when over 9000", () => {
    const { result } = renderHook(() => useCount(9000));

    act(() => {
      result.current.increment();
    });

    // errorがthrowされることを確認する
    expect(result.error).toEqual(Error("It's over 9000!"));
  });
});
