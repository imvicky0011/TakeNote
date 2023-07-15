# TakeNote
This is a minimalist version of the Note-making app, it provides the user with secure routes to store their daily chaos.
This project uses NodeJs and Express app to create robust API endpoints, and secured routes using JWT auth.
The backend stores the details of USER and TODOS in the MongoDB database.

In the frontend part, I have used React, Router, and Context to make a completely functional frontend application.
Using the router, I have implemented the dynamic routing and the re-rendering of the specific part of the application.
Using the Context, I have created a global state variable, which allows the use of that variable in the component of our choice, without having to prop drill into every component.

# Overview of the running application
1. Landing page with login and register options:
![image](https://github.com/imvicky0011/TakeNote/assets/86552305/ad43c257-927c-42e4-8cc3-072363111330)

2. If the user has account then they logs in, otherwise they register:
![image](https://github.com/imvicky0011/TakeNote/assets/86552305/ff647e0a-c29e-4589-8698-2174f1cb06ae)


3. Once the user is successfully registered, then the user can access the personalized home, with multiple options:
![image](https://github.com/imvicky0011/TakeNote/assets/86552305/301778bd-05d8-4887-afff-d19a0689e461)

4. They can view, update and delete the List.
![image](https://github.com/imvicky0011/TakeNote/assets/86552305/8f2db6a6-ba61-4e48-9417-5ce6d4520cbe)

5. Each user is provided with a cookie, stored within their browser, and any malicious attempts to access the private routes by the outsiders will be rejected.

6. User can update their account details.
![image](https://github.com/imvicky0011/TakeNote/assets/86552305/20eb15df-2d72-4dc3-b0fd-ea3d0d703132)


# Build Frontend
1. Pull the code, in the separate folder named frontend:
2. Install dependencies: npm install
3. Run: npm start
4. Frontend start running on the port 3000

# Build Backend
1. Pull the code, and create your own inctance in the mongoDB
2. Keep the secrets in the .env file, and the process.env.SECRET_KEY would take care of the hiding secrets.
3. Install dependencies, nagivate to the backend folder and run: npm install
4. Run server: npm start

# Now the backend and the frontend are running seamlessly, you can enjoy the build now.
