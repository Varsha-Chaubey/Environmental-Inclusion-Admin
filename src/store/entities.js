import { combineReducers } from "redux";
import signInReducer from "./signin";
import regionsReducer from "./region";
import speciesReducer from "./species";
import zoosAndwildlifeReducers from "./zoosAndWildLife";
import apisForDropdownReducers from "./apisForDropdown";
import organizationReducer from "./organization";
import settingReducer from "./setting";
import wetMarketReducer from "./wetMarket";
import blogReducer from "./blog";
import usersReducer from "./users";
import newsReducer from "./news";
import scienceAndEducationReducer from "./scienceAndEducation";
import environmentalistReducer from "./environmentalists";
import donationsReducer from "./donationlList";

export default combineReducers({
  signIn: signInReducer,
  regions: regionsReducer,
  species: speciesReducer,
  apisForDropdown: apisForDropdownReducers,
  zoosAndwildlife: zoosAndwildlifeReducers,
  organization: organizationReducer,
  setting: settingReducer,
  wetMarket: wetMarketReducer,
  blogs: blogReducer,
  users: usersReducer,
  news: newsReducer,
  scienceAndEducation:scienceAndEducationReducer,
  environmentalist:environmentalistReducer,
  donationList:donationsReducer,
});
