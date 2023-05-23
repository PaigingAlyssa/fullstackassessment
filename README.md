# ✅  Create a Simple Todo List Application

![](todo.png)

## FAQ

Complete a full-stack implementation in Spring Boot and React to support the following functionality.

An ideal submission would have a:

1.  Minimally complete an API implementation to facilitate the requirements of the client 
2.  Minimally complete a Todo List view to support the functionality listed below.
3.  Add reasonable test coverage on both the API and UI

We'd prefer not to take up more than 2 hours of your time, so no need for:
- any CSS styling 
- configuration or tooling of any type 
    - **Caveat**: Unless your solution or tests require an external dependency your familiar with

we are **more concerned with the foundational criteria mentioned above**. 

_If you aren't able to finish everything, no problem, we can discuss how you'd finish when we review it together_ 🙂

## Functional Requirements

### Add a Todo

New todos are entered in the input at the top of the app.

### Edit & Delete a Todo

A todo item has three possible interactions:

1. Clicking the checkbox marks the todo as complete 

2. Double-clicking input activates editing mode

3. Hovering over the todo shows the remove button

### Counter

Displays the number of active todos

## Submissions

When you are finished, push your commits to the remote.

## Extra

1. Since its such an enjoyable experience to have a todo list, think how would you share it with your friends - so all 
   of you can update it at the same time. 
    > Since this application has no AuthN currently, this could be as simple a share
   button that sends a link to the hosted domain. If you wanted to share the local instance a tool such as ngrok could 
   be used to route incoming requests to the local instance. If multiple people are editing a specific todo at the same 
   time, there could be race conditions encountered that create a very awkward UX. Using a versioning/hashing/timestamp
   field could help to manage simultaneous edits of the same item. A websocket connection with an event subscription for
   todo CRUD operations could also be established between the frontend/backend to offer a more "live" view of tasks.

2. Your friends like the todo list a lot! Everyone shared it with their friends. Now your application is bottleneck. 
   Also, everyone edits at the same time just once a day for an hour. How would you accommodate your users? 
    > An application of this complexity would likely scale for a significant number of users. To handle more bursty 
   traffic at a specific time during each day, one could implement some form of time bound/scheduled autoscaling to 
   pre-emptively upscale the backend to handle additional load. Since this is an SPA a CDN would be helpful in delivering 
   the client to end users. A load balancer would be helpful in this situation to distribute the load across multiple 
   instances of the backend. Profiling the application to identify any specific
   bottlenecks would be the first step in determining where the most impact would be to scale the application.
