import { useEffect } from "react";

const DEFAULT_TITLE = "Madhav Kennal | Find Your Perfect Puppy";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE;
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
}
