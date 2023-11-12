import { useReducer, useState } from "react";
import { ArtistCreationForm } from "../components/ArtistCreationForm";
import { ArtistTable } from "../components/ArtistTable";
import { search } from "../utils/utils";

const SEARCH_STATUS = {
  INITIAL: "INITIAL",
  LOADING: "LOADING",
  HAS_RESULTS: "HAS_RESULTS",
  HAS_ERRORS: "HAS_ERRORS",
};

const ACTIONS = {
  SEARCH: "SEARCH",
  CLEAR: "CLEAR",
  RESULT: "RESULT",
  ERROR: "ERROR",
};

const INITIAL_SEARCH_STATE = {
  status: SEARCH_STATUS.INITIAL,
  results: [],
  error: undefined,
};
function searchReducer(status, action) {
  switch (action.type) {
    case ACTIONS.SEARCH:
      return { error: undefined, results: [], status: SEARCH_STATUS.LOADING };
    case ACTIONS.CLEAR:
      return { error: undefined, results: [], status: SEARCH_STATUS.INITIAL };
    case ACTIONS.RESULT:
      return {
        error: undefined,
        results: action.results,
        status: SEARCH_STATUS.HAS_RESULTS,
      };
    case ACTIONS.ERROR:
      return {
        error: action.error,
        results: [],
        status: SEARCH_STATUS.HAS_ERRORS,
      };
  }
}

export function Search() {
  const [{ status, results, error }, dispatch] = useReducer(
    searchReducer,
    INITIAL_SEARCH_STATE
  );
  const [creating, setCreating] = useState(false);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <label>
          Search an artist
          <input
            type="text"
            onChange={(e) => {
              const value = e.target.value;
              if (value?.length > 1) {
                dispatch({ type: ACTIONS.SEARCH });
                search(value)
                  .then((res) => {
                    dispatch({ type: ACTIONS.RESULT, results: res });
                  })
                  .catch((err) => {
                    dispatch({ type: ACTIONS.ERROR, error: err });
                  });
              } else {
                dispatch({ type: ACTIONS.CLEAR });
              }
            }}
          />
        </label>
      </div>

      {status === SEARCH_STATUS.HAS_ERRORS && (
        <span className="error">{error?.message ?? "An error occured"}</span>
      )}
      {status === SEARCH_STATUS.HAS_RESULTS && (
        <ArtistTable artists={results} />
      )}
      {status === SEARCH_STATUS.INITIAL && "No results to display yet"}
      {status === SEARCH_STATUS.LOADING && <span className="loader" />}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button onClick={() => setCreating(true)}>Add an artist</button>
      </div>
      {creating && <ArtistCreationForm close={() => setCreating(false)} />}
    </>
  );
}
