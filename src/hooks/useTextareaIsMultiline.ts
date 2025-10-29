import * as React from "react";

/**
 * Optimized hook to detect if textarea content spans multiple lines.
 * Uses debounced measurements to minimize CPU usage during typing.
 */
export function useTextareaIsMultiline<T extends HTMLTextAreaElement>(
  threshold = 4,
  releaseThreshold = 12
) {
  const ref = React.useRef<T | null>(null);
  const baseHeightRef = React.useRef<number | null>(null);
  const debounceTimerRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const [isMultiline, setIsMultiline] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => {
      if (!el) return;

      // Treat empty value as single-line state
      if (!el.value) {
        baseHeightRef.current = null;
        if (isMultiline) {
          setIsMultiline(false);
        }
        return;
      }

      const { scrollHeight, clientHeight } = el;

      // Capture baseline height when single-line
      // If baseline is not set, we need to establish it
      if (baseHeightRef.current == null) {
        // If content is already overflowing on first measurement (e.g., after paste),
        // use clientHeight as baseline instead of scrollHeight
        if (scrollHeight > clientHeight + threshold) {
          baseHeightRef.current = clientHeight;
        } else {
          baseHeightRef.current = scrollHeight;
        }
      }

      const baseHeight = baseHeightRef.current;
      const overflowHeight = scrollHeight - baseHeight;

      // Determine if should be multiline
      const shouldBeMultiline = overflowHeight > threshold;
      const shouldBeSingleLine = overflowHeight < -releaseThreshold;

      // Only update state if actually changed
      if (shouldBeMultiline && !isMultiline) {
        setIsMultiline(true);
      } else if (shouldBeSingleLine && isMultiline) {
        setIsMultiline(false);
        baseHeightRef.current = scrollHeight; // Reset baseline
      }
    };

    const clearPendingTimers = () => {
      if (debounceTimerRef.current != null) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // Debounced measure to reduce CPU spikes during rapid typing
    const debouncedMeasure = () => {
      if (debounceTimerRef.current != null) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = window.setTimeout(measure, 16); // ~60fps
    };

    // Immediate measure for paste events to keep layout in sync
    // Using setTimeout(0) after RAF to ensure paste content is in DOM
    const measureAfterFrame = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        setTimeout(() => {
          measure();
          rafRef.current = null;
        }, 0);
      });
    };

    const handleInput = (event: Event) => {
      const inputEvent = event as InputEvent;
      if (inputEvent?.inputType === 'insertFromPaste') {
        clearPendingTimers();
        measureAfterFrame();
      } else {
        debouncedMeasure();
      }
    };

    const handlePaste = () => {
      clearPendingTimers();
      measureAfterFrame();
    };

    // Initial measurement
    measure();

    // Listen for typing and paste events
    el.addEventListener("input", handleInput);
    el.addEventListener("paste", handlePaste);

    return () => {
      clearPendingTimers();
      el.removeEventListener("input", handleInput);
      el.removeEventListener("paste", handlePaste);
    };
  }, [isMultiline, threshold, releaseThreshold]);

  return { ref, isMultiline };
}

