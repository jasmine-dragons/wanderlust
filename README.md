# wanderlust
![logobanner](https://user-images.githubusercontent.com/44332326/233849097-6bc999f9-0b7c-4f0e-8320-3da81877d7ce.png)

## What is wanderlust?
Often times we find ourselves scrolling on social media platforms like Tiktok or Instagram, liking and saving various videos, only to never refer to those videos ever again. There are so many restaurants, sightseeing locations, and activities to be found through social media that are unique and trendy, but no platform to compile and display these locations for easy viewing. Thus, we build wanderlust, a website for community driven exploration.

## Here's How It Works
There are 3 main pages to wanderlust: discovery, likes, and itinerary.

The discovery page is where you go to find new places to eat and explore. You can use the search bar at the top to enter a search query with a specified location. The website returns places based on the search query and information in the Tiktok database. Each item has basic information about the location, how many likes it has on Tiktok, and links to the Yelp website and corresponding Tiktok. If you like any of the locations that were returned, you can favorite it by clicking the heart. You can also see where these places are on the map to the side, and find the specific location by clicking on the "Map" button..

The likes page is a list of all locations that you have favorited while discovering new places. Here, you can see a compiled list of all locations you have liked and where they are on the map to the side.

The itinerary page is a way to generate fun day given some of the locations in your favorites list. After selecting which locations you want to visit, Cohere AI's text generation will create a basic itinerary for you including all of the locations you selected. The corresponding locations will also show up in the map to the side, allowing you to estimate travel time between these places.

## How we built **wanderlust**
**wanterlust** was built by a mix of experienced hackers and first-time hackers in UI/UX design and full stack developer roles. It was built using a modern full-stack of cutting edge real industry technologies.

### UI/UX Design

#### User Personas
![User Persona 1](https://user-images.githubusercontent.com/44332326/233846234-18f25861-1bbc-40b0-9b5a-dabebfc8094e.png)
![User Persona 2](https://user-images.githubusercontent.com/44332326/233846240-5d56a101-48ac-4da3-9c76-9dd3669672f1.png)
![User Persona 3](https://user-images.githubusercontent.com/44332326/233846243-256529e9-8256-4e90-b581-9fba171c9efb.png)

#### Inspiration
<img width="768" alt="image" src="https://user-images.githubusercontent.com/44332326/233844617-b9d04483-3c3a-49cf-9e46-1d81b1eed7a8.png"><img width="733" alt="image" src="https://user-images.githubusercontent.com/44332326/233844630-e74a29bf-9448-4a2e-892a-38a83ba086cd.png">


#### Design System
<img width="581" alt="image" src="https://user-images.githubusercontent.com/44332326/233844689-01ccc67c-1977-4c7a-b800-4cc2eb057751.png">
<img width="449" alt="image" src="https://user-images.githubusercontent.com/44332326/233844701-1f6926d9-81f6-4a88-b512-2064f9241c91.png">
<img width="639" alt="image" src="https://user-images.githubusercontent.com/44332326/233844714-bd361587-f62c-4197-9cfd-fcc3af0fa813.png">
<img width="232" alt="image" src="https://user-images.githubusercontent.com/44332326/233844724-15335fbc-21ce-4962-8a78-77608c6cf14a.png">
<img width="441" alt="image" src="https://user-images.githubusercontent.com/44332326/233844735-52505c52-8756-4183-8ccf-9a44b111c66b.png">

#### Lo-Fi Prototypes
<img width="759" alt="image" src="https://user-images.githubusercontent.com/44332326/233844909-e7e833a6-49bd-477b-9d11-f2c1c1a4c74f.png">

#### Hi-Fi Prototypes
<img width="839" alt="image" src="https://user-images.githubusercontent.com/44332326/233844842-655ccfad-c1f7-4026-996c-c06748ed6e7f.png">
<img width="599" alt="image" src="https://user-images.githubusercontent.com/44332326/233844893-50edaac1-0aab-4029-8cc7-12c20e09ddb0.png">

### Engineering
![Tech Flow](https://user-images.githubusercontent.com/44332326/233847197-41ac9fd1-55e1-49fe-b41a-7a0705f2b9bb.png)
_Our tech flow._

#### **Frontend and Challenges**
The frontend was built in [React](https://reactjs.org/) with [Next.js](https://nextjs.org/) to offer faster loading times and enrich user interactions along with [TypeScript](https://www.typescriptlang.org/) to develop a maintainable and structured codebase. The map was built with [Mapbox](https://www.mapbox.com/), with various datasets overlayn on top of it. We also used [Sass](https://sass-lang.com/), HTML and CSS with [Material UI](https://mui.com/) to style and display the components of the frontend, as well as [Three.js](https://threejs.org/) for our 3-D models.

*Landing Page*

![wanderlust landing](https://user-images.githubusercontent.com/44332326/233846308-a96bd6eb-9da7-45ca-85b8-4d41ab5fd9c0.png)

*Discover Page*
![discovery](https://user-images.githubusercontent.com/44332326/233846413-4b0ba58c-35fd-4a85-b0fe-91e7e33667e8.png)

*Likes Page*
![likes](https://user-images.githubusercontent.com/44332326/233846436-aa86260f-4a52-40ab-8844-4160b5cc1d0c.png)

*Itinerary Page*
![itinerary](https://user-images.githubusercontent.com/44332326/233846464-04a06358-20d5-4b0c-9624-4b56c9ee000f.png)

*3D Models*
![image 17](https://user-images.githubusercontent.com/44332326/233846892-04ff604c-8701-46cd-9474-51b0dd5e353d.png)
![image 19](https://user-images.githubusercontent.com/44332326/233846893-1270c6fd-fec7-4240-b407-c0e75bd48e9c.png)
![image 20](https://user-images.githubusercontent.com/44332326/233846895-3a11e927-7b4d-4373-a5c7-06d6ac8c3c3d.png)


The biggest challenges we faced mainly revolve around getting the various APIs to work together. At first, we tried to include default models such as boxes and spheres with Three.js, which was already difficult, as the mapbox react library didn’t have native support for this. However, we soon realized that these models were far too basic, and wanted to include some more complex models. This brought with it a whole different slew of issues. Putting the 3D models on the map were hard as both the documentation for Three.js and Mapbox were originally given for vanilla javascript and not our chosen React framework. Furthermore, much of the libraries made to translate code didn't support our need for putting 3D models on the map! Eventually, we found some translation libraries that converted these complex 3D models into parts available in React, such as [GLTFJSX](https://github.com/pmndrs/gltfjsx), which let us render more models. 

This project was also the most technically challenging design implementation we’ve ever dealt with, with the animated typing and balloons on the landing, to high quality reusable components across the main application containing hover states. In each step of the process, we challenged ourself to consider responsive components and avoid rough flashes of UI change. Cohere’s API was also a challenge we faced, as it was difficult to get it to generate the appropriate response. This required us to have to prompt it multiple times in order to get a good response, and have to carefully create a very specific prompt message to get the responses we wanted. We had to feed our results from the Yelp API into Cohere, leading to some compatibility issues as well. We eventually worked through them all one by one, and produce a successful result. 



![Tech_Stack](https://user-images.githubusercontent.com/44332326/233845823-6f90342c-b84d-482e-8610-69a1fbb0fb96.png)
_Our tech stack_

#### **Backend and Challenges** [TODO]
Through our backend API and serverless edge functions, we utilized many external APIs from multiple software platforms to collect the data we needed for our application into simple and unified API routes that handle complex logic with secure API token authorization and parameters and mapping inconsistent formats to a streamlined geoJSON structure for our Mapbox overlays and flexible abilities to our API prompt handler.

Each feature on the backend was a technical challenge alone from Google Login, search using Tiktok and Yelp APIs, to persisting user accounts images, favorites, and history, and configuring the AI model instance. We started with development of many of these features in isolation before attempting to integrate into the full flow of the application. We had to fully consider the possibilities of the frontend components we were interacting with and how to process API requests that were non-blocking to speed up parallel execution. 

# Takeaways 

## Accomplishments that we're proud of
Overall, we were able to implement many interesting features for wanderlust that allow for an engaged experience with us:
- Immersive, animated landing page
- Login with Google Cloud
- Discover Search Feature
- Find Top Trending Videos for the Search Term in the given location with Tiktok
- Corresponding each video to the full details of the business to generate a map and UI card with Yelp API
- Rendering an interactive map with markers, movement, and animation correctly positioned at geographic coordinates
- Adding 3D models for map marker icons
- Favorite locations to save them to the user account
- Persist favorites and history to the user account to remain on page refresh
- Generate an AI-powered travel itinerary
- Loading animations for clear UX



## Lessons and Growth
This hackathon was a great experience to use dozens of cutting-edge technologies on a powerful product and collaborate as a team in person!

This time around, we used a lot of various tools and libraries that we've never used before, giving us many opportunities to learn new technologies! This was also our first in-person hackathon for everyone on the team, giving us a whole new environment to work with and countless chances to interact with other hackers!

For our experienced hackers, they had a chance to provide mentorship to others who are just entering the field and work together to each contribute their unique skillset. They continuously challenge themselves to step out of their comfort zone with new technologies while writing high quality code in a fast-paced environment to structure large-scale projects that have a real impact.

One of the lessons we learned was the value and how to distribute work equally on our team to have everyone helping without overlapping and slowing down to prototype features while designs are in progress. This skill translates greatly to real industry environments and will help us in future careers in engineering and design. We learned how to effectively debug any type of problem to isolate the root cause and address it using pair programming and explaining our thought process.

We also learned the value of communication on a highly detailed project where we may have different implementations for the features that need to tie in smoothly.


## What's next for wanderlust?
wanderlust has big plans for it’s future to add onto after LAHacks is over!

First, we would like to introduce speech-to-text functionality for our search feature. This gives the user flexibility on how they would like to search for places in our website and enables a more streamlined user flow straight from speaking a request to receiving the visual map.

Second, we would like to implement ChatGPT into the progress of itinerary generation. While Cohere AI was free and easy to use, we found that the language model wasn't quite powerful enough to get high quality generated itineraries. ChatGPT would allow for more interesting itineraries as well as more flexibility on the styling of the interface of the itinerary page and powerful token recognition to parse locations out of raw strings.

Third, we would like to fully integrate Tiktok and other social media platforms like Instagram Reels and Youtube shorts. Currently, we are using a subset of data from Tiktok due to the Tiktok API not being open to the public. These social media platforms have APIs that need to be requested for use, but once granted request they would greatly increase the amount of locations and content that we would be able to provide.

Finally, we would like to implement a friends list feature with live updates, letting users invite users to collaborate on building travel itineraries using a combination of their favorites list and receiving real-time notifications when a friend saved a new item to visit! This allows users to create fun hangouts with their friends, discover new locations, and explore even more in the same social setting as Tiktok.


## LAHacks Hacker IDs

Nishant Balaji: Am80tN7jDGO5zDKNEg-OrA 


Shirley Qi: ZZE8OALkOJZ0vPHFWv0syQ 


Faris Ashai: 4EcVXitN3rANYBHtLXYaSQ 


Tiffany Lee: pfzk9kWeEGlug6criZ6ZHA


