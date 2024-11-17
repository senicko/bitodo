import { useEffect } from "react";

/** Shows an alert with error message when error changes. */
export function useErrorAlert(error: Error | null) {
  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);
}
