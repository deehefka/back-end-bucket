Team Project - Bucket List - Back-End

Besides finishing WDI, you surely have one or two things you'd love to do with your life. Let's get 'em on paper! You could integrate with a third-party location-based API to allow users to search for a location or venue to add to their bucket list items.

Live URL-

Back end URL: https://boiling-temple-34705.herokuapp.com/bucketLists

Front end URL: https://deehefka.github.io/front-end-bucket/

Link to Back-end Repo: https://github.com/deehefka/back-end-bucket

Link to Front-end Repo: https://github.com/deehefka/front-end-bucket

ERD - One to Many (One User to Many Pictures)
https://imgur.com/CZHFUhp

Catalog of routes/methods:
- Get (INDEX)
- Create (POST)
- Update (PATCH)
- Destroy (DELETE)

List of technologies used
- MongoDB
- Mongoose
- Express
- Leaflet (map)

List unsolved problems which would be fixed in future iterations
- *Stretch Goal* - Add images/use AWS
- Link map markers to each database item
- What the user sees (get rid of created at: time, crazy ID numbers, owner IDs when click SHOW)
- Only let each specific user see their own items

Document your planning, process and problem-solving strategy

- Our project is a bucket list to document items/places you'd like/you'd like to go to. We created a one to many relationship (one user to many bucket list items) in our database (we used Shawn's scaffolding to create our back-end, routes, models and curl scripts). We deployed to heroku early in the project. We had some issues with routes/name of out database. But after some digging, some researching and some help from our teachers, we were able to figure out the correct name of the database to pull from the correct location. Currently we are working on allowing each user to see their own bucket list items - we are tweaking/working with our routes in order to do so (modelling after the examples in our template). Our problem solving strategy was to research, look inside the issue queue, ask within the issue queue and brainstorm as a team/peer program.
update README