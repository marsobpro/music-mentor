# MusicMentor
🎹 Find your Music Mentor and develop your instrument skills! 🎻 
Live demo [_here_](https://clever-rolypoly-d6ccde.netlify.app/).

**Demo Account**

💡 To make it easy for you to evaluate my project, I have set up a demo account that you can use to access it without having to register using your email. 

To access the demo account, please follow these steps:

- Go to the Sign In page

- Enter the following login details:

        Email: demoaccount@test.com
        Password: Password123!
    
- Click the "Login" button


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)


## General Information

- 🎹 I have been playing the piano since I was 7 years old, and I wanted my project to be related to music. 

- 👩‍🎓 On the MusicMentor website, students have the opportunity to find Music Mentor - more specifically, an instrument teacher. They can search according to the instrument they want to play, the city in which they want to study as well as find those teachers who teach online. They can choose from several instruments (piano, guitar, violin) and cities (Poznan, Szczecin and Gdansk).

- 🧑🏽‍🏫 The teachers, on the other hand, can add an announcement about their lessons, providing various details such as price, duration and location. They can also add a video, on which they present their skills or invite to the classes.



## Technologies Used
- vite: ^4.1.0
- firebase: ^9.17.2
- tailwindcss: ^3.2.7
    - @tailwindcss/forms: ^0.5.3
- react: ^18.2.0
    - react-dom: ^18.2.0
    - react-router-dom : ^6.8.2,
- react-hot-toast: ^2.4.0
- react-icons: ^4.7.1,
 - uuid: 9.0.0
- emailjs/browser: ^3.10.0,
- url-parse: ^1.5.10,
- HTML5
- JavaScript


## Features
- User registration
- User login
- Password reset functionality
- Creating new lessons
- Editing existing lessons
- Deleting lessons
- Viewing lessons added by user on their profile
- Search functionality
- Ability to search for lessons based on instrument and location, or instrument and "online" option
- Displaying search results in order of most recently added lessons
- Clicking on a lesson tile displays the lesson details on a separate page
- Form validation with specified error description display
- 404 page

## Screenshots
Home page

![mm-screen-home](https://user-images.githubusercontent.com/79658548/228241767-685c1f30-09fd-43b0-9c96-11d3debd86ea.png)

Home page - mobile view

![mm-screen-home-mobile](https://user-images.githubusercontent.com/79658548/228237351-84f6d950-07d3-4927-b186-63651792fed9.png)

All lessons found
![mm-screeen-lessons](https://user-images.githubusercontent.com/79658548/228237329-6dd997a9-1508-4617-b8a2-b9bae7d1e37e.png)

A single lesson


![mm-screen-singlelesson](https://user-images.githubusercontent.com/79658548/228241189-1b8564cd-6041-4a97-a0d4-80b645701590.png)

Sing in
![mm-screen-signin](https://user-images.githubusercontent.com/79658548/228237361-be889eca-f807-4207-a059-b08d304ef769.png)

Profile
![mm-screen-profile](https://user-images.githubusercontent.com/79658548/228237358-e94fc5ae-b9d1-4510-97b5-7e958f755340.png)

Adding a lesson
![mm-screen-addalesson](https://user-images.githubusercontent.com/79658548/228237341-8755f7e5-045a-475e-bb1d-5ebd300cc9af.png)

Editing a lesson
![mm-screen-editalesson](https://user-images.githubusercontent.com/79658548/228237348-2505e71c-69c9-4a3a-89a6-ce69fdd80dbf.png)

How it works
![mm-screen-howitworks](https://user-images.githubusercontent.com/79658548/228237352-115efec6-8ebf-4eb1-859a-1808b68737c6.png)

Contact
![mm-screen-contact](https://user-images.githubusercontent.com/79658548/228237345-6bff642a-0dfa-4980-8f0c-20af2faeafb6.png)


## Setup
**Requirements**

- Node.js (version 16 or later)
- NPM (version 7 or later)

The project dependencies are listed in the package.json file, including both the production dependencies and development dependencies. The production dependencies ("dependencies" in package.json) are required for running the application, while the development dependencies ("devDependencies" in package.json) are required for building and testing the application.

**Installation**

- Clone the repository to your local machine 
`git clone https://github.com/marsobpro/music-mentor.git`
- Navigate to the project directory in your terminal.
- Run npm install to install the required dependencies.

**Running the Application**

- Start the development server by running npm run dev.
- Open your web browser and navigate to the URL where the application can be accessed. The URL should be displayed in the terminal output after running the npm run dev command.
- If the application does not open, try checking the terminal output for any error messages that might indicate a problem with the development server.

**Building the Application**

- Run npm run build to build the production-ready application.
- The built files will be located in the dist directory.


## Project Status
Project is in progress.


## Room for Improvement
As part of further work on the application, I would like to add or improve the following functionalities:

- Adding different types of accounts ( Mentor and Student)
- Adding pagination or a button to load further announcements on Lessons page
- Adding an Edit Account section, with the possibility of changing the user's personal data
- Adding the ability for students to rate mentors


## Acknowledgements
In creating the design, I was inspired by the look and/or functionality of:
**https://buki.org.pl/** and **https://www.superprof.pl/**



## Contact
**Created by Marcin Sobieraj.**

Don't hesitate to contact me:

<marsobpro@gmail.com>

You can also find me on [LinkedIn](https://www.linkedin.com/in/marcin-sobieraj/
)
