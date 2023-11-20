import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import api from "./middleware/api";

export default function test() {
  return configureStore({
    reducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: ["payload.callback"],
        },
      }),
      api,
    ],
  });
}
