# Backend Technical Assignment II 

Functional specification Define and implement a Rest API for a Kitchen Robot that will allow a client of the API to Get menu items 
- This endpoint should return a json with some dishes (no need for a fancy model here: an id and a human readable name will be enough) 
- Send an customerOrder containing some items of the menu and an email for sending progress notifications 
- Cancel an customerOrder if it was posted no more than 30s ago Whenever an customerOrder is received, an acknowledgement notification should be sent to the mail sent when posting the customerOrder. 
When all the ordered items are ready, a notification should be sent to the mail given when posting the customerOrder. The resulting applicative, when started, should make the endpoints available in the running machine. Feel free to fill the specification gaps in the manner that you find to be the more natural one. 

### Technical requirements 
Use Java 8 for coding. Use git for source versioning. Use maven for building the application. There is no need of effectively sending the email. Use whatever design pattern that you find suitable (if any) to better structure the code and make it easier to understand and evolve. Please, add a minimal README.md file explaining at least how to run the applicative. 

### Sending your solution 
Do not publish the solution on a public repository (so, do not use Github). Along with the sources, send also the .git folder so we can also take a look to how you organize the commits. You can pack it all in a zip file and send it to us (or you can use one of the free private repos offered by Bitbucket) 
