import React, { useEffect, useRef, useState } from "react";
import {
  interval,
  Subject,
  takeUntil,
  buffer,
  fromEvent,
  filter,
  tap,
  map,
  debounceTime,
} from "rxjs";
import { Controls } from "./components/Controls";

function useObservable(ref, event) {
  const [subject$, setSubject$] = useState();
  useEffect(() => {
    if (!ref.current) return;
    setSubject$(fromEvent(ref.current, event));
  }, [ref, event]);
  return subject$;
}

function useClick(mouseClicks$, setState) {
  useEffect(() => {
    if (!mouseClicks$) return;
    const subject$ = mouseClicks$
      .pipe(
        buffer(mouseClicks$.pipe(debounceTime(300))),
        tap((e) => console.log(e)),
        map((e) => e.length),
        filter((e) => e === 2)
      )
      .subscribe((e) => setState(false));
    return () => subject$.unsubscribe();
  }, [mouseClicks$, setState]);
}

const App = () => {
  const [state, setState] = useState(false);
  const [time, setTime] = useState(0);

  const ref = useRef(null);
  const mouseClicks$ = useObservable(ref, "click");
  useClick(mouseClicks$, setState, state);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const unsubscribe$ = new Subject();
  const timer$ = interval(1000).pipe(takeUntil(unsubscribe$));

  useEffect(() => {
    timer$.subscribe(() => {
      if (state) {
        setTime((val) => val + 1);
      }
    });

    return () => {
      unsubscribe$.next();
      unsubscribe$.complete();
    };
  }, [state, timer$, unsubscribe$]);

  function start() {
    setState(true);
  }

  function stop() {
    setTime(0);
    setState(false);
  }

  function reset() {
    setTime(0);
  }

  return (
    <>
      <Controls
        time={time}
        start={start}
        stop={stop}
        reset={reset}
        wait={ref}
      />
    </>
  );
};

export default App;
