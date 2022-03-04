import { DefaultTheme } from "@react-navigation/native";

import colors from "../config/colors";

// navigation theme of complete app.
export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },
};
