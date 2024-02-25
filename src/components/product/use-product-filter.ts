import { useMemo, useReducer } from "react";
import qs from "qs";
type ProductFilterAction =
  | {
      type: "setFilters";
      payload: ProductFilterState;
    }
  | {
      type: "setQuery";
      payload: string | null;
    }
  | {
      type: "setLimit";
      payload: number;
    }
  | {
      type: "setOffset";
      payload: number;
    }
  | {
      type: "setBrand";
      payload: null | string;
    }
  | { type: "reset"; payload: ProductFilterState }
  | {
      type: "setPrice";
      payload: number | null;
    };

interface ProductFilterState {
  query?: string | null;

  limit: number;
  offset: number;
  brand?: string | null;
  price?: number | null;
}

const reducer = (
  state: ProductFilterState,
  action: ProductFilterAction
): ProductFilterState => {
  switch (action.type) {
    case "setFilters": {
      return {
        ...state,
        brand: action.payload.brand,
        limit: action.payload.limit,
        offset: action.payload.offset,
        price: action.payload.price,
        query: action.payload.query,
      };
    }
    case "setOffset": {
      return {
        ...state,
        offset: action.payload,
      };
    }
    case "setBrand": {
      return {
        ...state,
        brand: action.payload,
      };
    }
    case "setLimit": {
      return {
        ...state,
        limit: action.payload,
      };
    }
    case "setPrice": {
      return {
        ...state,
        price: action.payload,
      };
    }
    case "setQuery": {
      return {
        ...state,
        query: action.payload,
      };
    }
    case "reset": {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export const useProductFilter = (existing?: string) => {
  if (existing && existing[0] == "?") {
    existing = existing.substring(1);
  }
  const initial = useMemo(() => parseQueryString(existing), [existing]);
  const [state, dispatch] = useReducer(reducer, initial);

  const setQuery = (queryString: string | null) => {
    dispatch({ type: "setQuery", payload: queryString });
  };

  const setLimit = (limit: number) => {
    dispatch({ type: "setLimit", payload: limit });
  };

  const setOffset = (offset: number) => {
    dispatch({ type: "setOffset", payload: offset });
  };

  const setBrand = (brand: string | null) => {
    dispatch({ type: "setBrand", payload: brand });
  };

  const setPrice = (price: number | null) => {
    dispatch({ type: "setPrice", payload: price });
  };
  const paginate = (direction: 1 | -1) => {
    if (direction > 0) {
      const nextOffset = state.offset + state.limit;

      dispatch({ type: "setOffset", payload: nextOffset });
    } else {
      const nextOffset = Math.max(state.offset - state.limit, 0);
      dispatch({ type: "setOffset", payload: nextOffset });
    }
  };

  const jump = (page: number) => {
    dispatch({ type: "setOffset", payload: page * state.limit });
  };

  const getRepresentationString = () => {
    return qs.stringify(state, {
      skipNulls: true,
    });
  };

  const getRepresentationObject = () => {
    const objToUse = state;
    const toQuery: any = {};
    for (const [key, value] of Object.entries(objToUse)) {
      if (key === "query") {
        if (value && typeof value === "string") {
          toQuery[key] = value;
        }
      } else if (key === "offset" || key === "limit") {
        toQuery[key] = value;
      } else if (key == "brand") {
        toQuery[key] = value;
      } else if (key == "price") {
        toQuery[key] = value;
      }
    }

    return { ...toQuery };
  };

  const representationString = useMemo(
    () => getRepresentationString(),
    [state]
  );
  const representationObject = useMemo(
    () => getRepresentationObject(),
    [state]
  );

  return {
    setQuery,
    setLimit,
    setOffset,
    state,
    representationString,
    setBrand,
    setPrice,
    representationObject,
    paginate,
    jump,
  };
};

const parseQueryString = (queryString?: string): ProductFilterState => {
  const defaultVal: ProductFilterState = {
    limit: 50,
    offset: 0,
  };

  if (queryString) {
    const filters = qs.parse(queryString);
    for (const [key, value] of Object.entries(filters)) {
      switch (key) {
        case "offset": {
          if (typeof value === "string") {
            defaultVal.offset = parseInt(value);
          }
          break;
        }
        case "limit": {
          if (typeof value === "string") {
            defaultVal.limit = parseInt(value);
          }
          break;
        }
        case "query": {
          if (typeof value === "string") {
            defaultVal.query = value;
          }
          break;
        }
        case "brand": {
          if (typeof value === "string") {
            defaultVal.brand = value;
          }
          break;
        }
        case "price": {
          if (typeof value === "number") {
            defaultVal.price = value;
          }
          break;
        }
      }
    }
  }

  return defaultVal;
};
