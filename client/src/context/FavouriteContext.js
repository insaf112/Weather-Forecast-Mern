import { createContext, useReducer } from "react";
// import { DataContext } from "./DataContext";
export const FavouriteContext = createContext();

export const favouriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVOURITE":
      return { favourites: [action.payload, ...state.favourites] };

    case "GET_FAVOURITE":
      return { favourites: action.payload };

    case "DELETE_FAVOURITE":
      return {
        favourites: state.favourites.filter(
          (item) => item._id !== action.payload._id
        ),
      };
    case "UPDATE_FAVOURITE":
      let index = state.favourites.findIndex(
        (city) => city.city === action.payload.city
      );
      state.favourites[index] = action.payload;
      return { favourites: [...state.favourites] };
    default:
      return state;
  }
};

const FavouriteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouriteReducer, { favourites: [] });

  return (
    <FavouriteContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteContextProvider;
