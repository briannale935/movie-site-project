# Project Deliverable 3

## Due: August 2, 2024, 11:59PM

## GitHub Classroom link: TBA

## Summary: 
Implement the final React/NodeJS/MySQL app.

## Development Tips:
- Use CodeSpaces for this project.
- In VSCode terminal on CodeSpaces start a new branch:
```git checkout -b d3```
- As you code, push daily changes to your GitHub repo's `d3` branch:
```
git add .
git commit -m "done feature xyz"
git push origin d3
```

## Deliverable 3 Guidelines

1. Write the NodeJS part of your code in node-react-app/server.js 

2. D3 must have the following main React components: App, Review, Search, MyPage. You may create as many auxiliary components as needed (e.g., ReviewTitle).

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Four components (Landing, Search, Review, MyPage) correspond to four pages in your rendered app. You must use React client-side routing (follow the example covered in Lect10-2) to navigate between these pages. The pages must have the following paths:

| Component | Path      |
|---------- |---------- |
| Landing   | /         |
| Search    | /Search   |
| Review    | /Review   |
| MyPage    | /MyPage   |

  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Here, `Path` represents the affix that will appear at the end of the URL when you navigate to that page. For example, when you use client-side routing to navigate to Search, you will see:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `http://myURL.com/Search`

3. All four pages in your application must have a Material UI Appbar (https://mui.com/material-ui/react-app-bar/) at the top of the page with four buttons routing the user to `Landing`, `Search`, `Review`, and `MyPage`. Use MUI Button element for each route navigation. The App bar must be visible and fully-functional on all pages described in points 5-8. The following id tags must be assigned to the navigation buttons present in the App bar:
   
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `Landing` MUI Button: id="nav-landing"
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `Search` MUI Button: id="nav-search"
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `Review` MUI Button: id="nav-review"
  
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - `MyPage` MUI Button: id="nav-myPage"

4. `App` component: The App component in your application must have the same content as App/index.js in Lect10-2 example.


5. ### Landing page
   
  &nbsp;&nbsp;&nbsp;&nbsp;a. Place the code for the landing page in client/src/components/Landing/index.js
  
  &nbsp;&nbsp;&nbsp;&nbsp;c. Design your own content for the Landing page related to your movie app.

6. ### Search page
  &nbsp;&nbsp;&nbsp;&nbsp;a. This is a page for searching for movies by title, actor and director. The results must show the movie title, director, texts of user-entered reviews (if any) and average user review scores.

&nbsp;&nbsp;&nbsp;&nbsp;b.	The page must contain three MUI text fields for searching by:

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i.	Movie title. This MUI TextField must have the id tag "search-title".

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii.	Actor's first name + last name (as one field). This MUI TextField must have the id tag "search-actor".

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii.	Director's first name + last name (as one field). This MUI TextField must have the id tag "search-director".

&nbsp;&nbsp;&nbsp;&nbsp;c.	The user may specify multiple or any one of the search criteria at a time. If multiple search criteria are entered, use AND (not OR) when composing your SQL statement. For example, if user entered a Director's name and an Actor's name, then the retrieved movies must satisfy BOTH of these criteria.

&nbsp;&nbsp;&nbsp;&nbsp;d.	One `Search` button, which is an MUI Button with id tag "search-button". Upon clicking this button, the React code would send all of the search criteria to the NodeJS server. The server will send them as MySQL SELECT statement(s) to your MySQL database, and return back the retrieved data.

&nbsp;&nbsp;&nbsp;&nbsp;e.	Specifically, the retrieved data about each movie must consist of the following:  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i.	Movie Title: the movie title

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii.	Movie Director(s): director's first + last name. If there are multiple directors for a given movie, show all of their names, separated by commas.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii. Average Rating: the average user review rating from your Review table. If no ratings exist for a given movie, show N/A.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iv.	Reviews: the list of all texts of user-entered reviews (if any). Note: it is sufficient to just list the content of the review (omitting the userID and review title). Show each review on a new line.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Here is an example of the layout of search results:

![image](/img/searchResultsExample.png)

7.	### Review page

&nbsp;&nbsp;&nbsp;&nbsp;a.	This page must be adapted based on your D2 app page, and must contain all the functionality of D2, including reading movies from MySQL and writing user-entered reviews into your MySQL tables.

&nbsp;&nbsp;&nbsp;&nbsp;b.	Under client/src/components/ create a new directory `Review` and save this page as index.js under that directory.


8.	### MyPage 

&nbsp;&nbsp;&nbsp;&nbsp;a.	This must be a new page of your own choice. The page must read and write data from/to your copy of the IMDB database. You can add new tables and/or new attributes to existing tables to your MySQL database as needed. Examples of functionalities supported by the additional page include: 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i.	browse/search/view embedded videos of movie trailers and write your comments on them.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ii.	view recommendations of movies to watch based on your reviews, and add your comments about these recommendations.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;iii.	read news articles about movie releases, awards, actors, etc. and write your comments on them.

&nbsp;&nbsp;&nbsp;&nbsp;Note: if the functionality of your page requires additional data, it is sufficient to just include a few samples in your database, e.g. a few links to movie trailers (for point #i) or a few articles  (for point #iii). Include a short description on this page of your app, telling us which movies have this additional data, so that we use them to test your app.

&nbsp;&nbsp;&nbsp;&nbsp;b.	Under client/src/components/ create a new directory MyPage and save this page as index.js under that directory.

&nbsp;&nbsp;&nbsp;&nbsp;c.	Include the MUI Appbar in the `MyPage` page with the links to `Landing`, `Review` and `Search`.

&nbsp;&nbsp;&nbsp;&nbsp;d.	Note: `MyPage` must have substantially different functionality from both `Search` and `Review` pages.

9.	Visual design

&nbsp;&nbsp;&nbsp;&nbsp;a.	You entire app must use visually consistent MUI styling (see Lecture_5-2 slides and code examples). 


10.	After you finish your development, make sure that the app renders in the browser and functions according to the specifications.

11.	Push changes to the GitHub:

```
git add .
git commit -m "completed"
git push origin d2
```

12.	In your GitHub repo, create new pull request and merge `d3` branch with the `main` branch.




