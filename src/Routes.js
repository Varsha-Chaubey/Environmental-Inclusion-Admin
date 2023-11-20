import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import Signin from "./pages/signin";
import ListingRegions from "./components/regions/listingRegions";
import DangerLevelSpecies from "./components/species/dangerLevelSpecies";
import SpeciesCategory from "./components/species/speciesCategory";
import Species from "./components/species/species";
import ListingZoosAndWildLife from "./components/zoosAndWildLife/listingZoosAndWildLife";
import ListingOrganizations from "./components/organization/organizations";
import HomePageSettings from "./components/settings/homePageSettings";
import WetMarketListing from "./components/wetMarket/wetMarket";
import ListingBlog from "./components/blog/listingBlog";
import BlogCategoryListing from "./components/blog/blogCategory";
import Users from "./components/users/users";
import ListingNews from "./components/news/listingNews";
import NewsCategoryListing from "./components/news/newsCategory";
import EnvironmentalistsListing from "./components/environmentalists/environmentalists";
import ScienceAndEducations from "./components/scienceAndEducation/scienceAndEducations";
import ScienceAndEducationCategory from "./components/scienceAndEducation/scienceAndEducationCategory";
import SubscriberListing from "./components/settings/subscriberListing";
import DonationList from "./components/donation/donationList";
import ListingOurWork from "./components/organization/ourWork";
import ListingOurPartner from "./components/organization/ourPartner";
import ListingOurTeam from "./components/organization/ourTeam";
import ListingOurProgram from "./components/organization/ourProgram";
import ListingReports from "./components/organization/Reports";
import ListingMedia from "./components/organization/addMedia";
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <ListingRegions />
        </Route>
        <Route exact path="/signin">
          <Signin />
        </Route>
        <Route exact path="/species">
          <Species />
        </Route>
        <Route exact path="/species/species-category">
          <SpeciesCategory />
        </Route>
        <Route exact path="/species/danger-level">
          <DangerLevelSpecies />
        </Route>
        <Route exact path="/zoos-and-wildlife">
          <ListingZoosAndWildLife />
        </Route>         
        {/* <Route exact path="/newsletter-subscriptions">
          <SubscriberListing />
        </Route> */}
        
        {/* <Route exact path="/blogs">
          <ListingBlog />
        </Route>
        <Route exact path="/blog-category">
          <BlogCategoryListing />
        </Route> */}      
        {/* <Route exact path="/news">
          <ListingNews />
        </Route>
        <Route exact path="/news-Categories">
          <NewsCategoryListing />
        </Route> */}
         <Route exact path="/wet-market">
          <WetMarketListing />
        </Route>
        <Route exact path="/users">
          <Users />
        </Route>
        <Route exact path="/science-and-educations">
          <ScienceAndEducations />
        </Route>
        <Route exact path="/science-and-educations/science-and-educations-Categories">
          <ScienceAndEducationCategory />
        </Route>
        <Route exact path="/environmentalists">
          <EnvironmentalistsListing />
        </Route>
        <Route exact path="/setting/home-page-setting">
          <HomePageSettings />
        </Route>
        <Route exact path="/setting/donations">
          <DonationList />
        </Route>
        <Route exact path="/organization">
          <ListingOrganizations />
        </Route>
        <Route exact path="/organization/work">
          <ListingOurWork />
        </Route>
        <Route exact path="/organization/partners">
          <ListingOurPartner />
        </Route>
        <Route exact path="/organization/team">
          <ListingOurTeam />
        </Route>
        <Route exact path="/organization/programs">
          <ListingOurProgram />
        </Route>
        <Route exact path="/organization/reports">
          <ListingReports />
        </Route>
        <Route exact path="/organization/media">
          <ListingMedia />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
