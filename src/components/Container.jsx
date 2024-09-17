import { useEffect } from "react";
import { useReducer } from "react";
import NewsComponent from "./NewsComponent";

const initialstate = {
  data: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCHING_DATA":
      return { ...state, loading: true, error: null };
    case "FETCH_DATA_SUCCESS":
      return { ...state, data: action.payload, loading: false, error: null };
    case "FETCH_DATA_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function Container() {
  const [state, dispatch] = useReducer(reducer, initialstate);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: "FETCHING_DATA" });
    try {
      const response = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftechcrunch.com%2Ffeed%2F"
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const output = await response.json();
      dispatch({ type: "FETCH_DATA_SUCCESS", payload: output });
    } catch (err) {
      dispatch({ type: "FETCH_DATA_FAILURE", payload: err.message });
    }
  };

  return (
    <div className="w-full max-w-[600px] sm:max-w-[480px] md:max-w-[720px] lg:max-w-[800px] rounded-[5px] flex flex-col mx-auto my-[20px] md:my-[40px] shadow-2xl bg-white p-[10px] md:p-[20px]">
      <h1 className="text-center text-xl md:text-4xl font-bold mt-5 underline">
        TechCrunch News
      </h1>
      {state.loading && <p className="text-center">Loading...</p>}
      {state.error && (
        <p className="text-center text-red-500">Error occurred: {state.error}</p>
      )}
      <div className="w-full py-2 px-5 md:py-5 md:px-10 flex flex-col gap-5">
        {state.data.items && state.data.items.length > 0 ? (
          state.data.items.map((item, index) => (
            <NewsComponent item={item} key={index} />
          ))
        ) : (
          !state.loading && <p className="text-center">No news items available</p>
        )}
      </div>
    </div>
  );
}
