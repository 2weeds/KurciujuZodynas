import { useSnackbar } from "notistack";
import { Observer } from "rxjs";
import { AjaxError } from "rxjs/ajax";

export function useRetrievalObserver<T>(callback: (param: T) => void): Observer<T> {
  const { enqueueSnackbar } = useSnackbar();

  return {
    next: (param: T) => callback(param),
    error: (error: AjaxError) => {
      if (error.status === 500)
        enqueueSnackbar("Error: " + error.response, {
          variant: "error",
          preventDuplicate: true,
        });
    },
    complete: () => {}
    }
};