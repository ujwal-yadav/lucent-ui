import { useState, useCallback, useRef, Dispatch, SetStateAction } from 'react';

/**
 * Hook to manage both controlled and uncontrolled state
 * @param defaultValue - Default value for uncontrolled mode
 * @param controlledValue - Value for controlled mode
 * @param onChange - Callback when value changes
 */
export function useControllableState<T>(
  defaultValue: T,
  controlledValue?: T,
  onChange?: (value: T) => void
): [T, Dispatch<SetStateAction<T>>] {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  // Track if we've called onChange to prevent infinite loops
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (nextValue: SetStateAction<T>) => {
      const newValue =
        typeof nextValue === 'function' ? (nextValue as (prevState: T) => T)(value) : nextValue;

      if (!isControlled) {
        setUncontrolledValue(newValue);
      }

      onChangeRef.current?.(newValue);
    },
    [isControlled, value]
  );

  return [value, setValue];
}
