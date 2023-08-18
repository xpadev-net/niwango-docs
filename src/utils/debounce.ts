const debounce = <T extends (...args: never[]) => unknown>(
  callback: T,
  delay = 250
): ((...args: Parameters<T>) => void) => {
  let timeoutId: number; // Node.jsの場合はNodeJS.Timeout型にする
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
};

export { debounce };
