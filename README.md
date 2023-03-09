
                                        Tourn it Up f
                        
Description: 
Our App allows people to create challenges among each other. they can be scientifical, Enternaining and much more.
guests can participate in a chalenge,premier Users can create and organize a challenge. one can recieve awards if he won a challenge and this prize can be  "participating in a new startUp which requires specific proffessions" .
Feel free to navigate through the Tournaments based on your interrests and location.


    404: As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
    Signup: As an anon I can sign up in the platform so that I can start saving favorite restaurants
    Login: As a user I can login to the platform 
    Logout: As a user I can logout from the platform so no one else can use it
    Add tournaments: As a premium user I can organize tournaments or participate in them if i am a free user 
    List tournaments: As a user I want to see all tournaments so that I can choose one to participate in
    Search tournaments: As a user I want to search tournaments by name based on my interrests 
    Add to interrests: As a user I want to add a tournament to my interrests and location, so that I can participate in them
    
Backlog
Forum
Messaging system

Routes

    / - Landingpage & Homepage 
    /signup - Signup form
    /login - Login form
    /post-signup - PostSignup
    /membership-options -MembershipOptions
    /profile/:username -Profile
    /profile/settings -ProfileSettings
    /tournaments/create -TournamentCreate
    /tournaments/:id/update -TournamentUpdate
   /tournaments/:id - TournamentPage
   /tournaments/search? -TournamentsSearch
   /* - ErrorPage
Pages
    landing Page (public)
    Home Page (public)
    Signun Page (anon only)
    Login Page (signed up user only )(private)
    MembershipOptions (user)
    TournamentCreate ( premium user only)(private)
    Restaurant Detail Page (public only)
    Profile Page (user only)
    TournamentUpdate
    TournamentPage
    TournamentsSearch
    404 ErrorPage (public)

Components
Auth : (requirment function)
  private
  public
ChangeMembership  (popUp)
Dates
DeleteConfirm (popUp)
Footer
InputFiel
Navbar
SortArrow
UpdateInterrests


TRELLO:
https://trello.com/b/Fv24hjnw/awesome-idea-organization

Git:
BACKEND: https://github.com/MaikSchmi/tourn-it-up-b
FRONTEND: https://github.com/MaikSchmi/tourn-it-up-f
DEPLOYED-PROJECT: https://tournitup.netlify.app

