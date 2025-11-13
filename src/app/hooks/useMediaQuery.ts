import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [value, setValue] = useState<boolean>(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const onChange = (event: MediaQueryListEvent) => {
      setValue(event.matches);
    };

    setValue(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", onChange);

    return () => mediaQueryList.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
