import { useSnackbar } from "notistack";
import { Observer } from "rxjs";
import { AjaxError } from "rxjs/ajax";

export function useLexiconAdditionObserver<T>(): Observer<T> {
  const { enqueueSnackbar } = useSnackbar();

  return {
    next: () => {},
    error: (error: AjaxError) => {
      if (error.status === 400)
        enqueueSnackbar("Error: " + error.response, {
          variant: "error",
          preventDuplicate: true,
        });
    },
    complete: () => {
        enqueueSnackbar("Successfully added a new unit", {
            variant: "success",
            preventDuplicate: true,
        })
    },
  };
}