application purpose 
-------------------------
 - This application is built per OIT Portland-Metro customer requirements of IT department and Peer Consulting (Tutoring) Department. 
 - This application is purposed to allow for an easy way for OIT students to sign into the Peer consulting center, and for the manager to extract the sign-in data easily.
 - This application was built to be on brand with OIT design.
 - please email me if you have any questions: shantahuja@gmail.com

utilize application
---------------------------------------------------------------------------------------------------
1) BEFORE CLONING, be sure to install MongoDB Community Edition. use all default settings when installing.
https://www.mongodb.com/download-center/community

2) after this, please start "mongod.exe" in the bin folder of the MongoDB folder.
 - C:\Program Files\MongoDB\Server\4.2\bin
3) at this point, please check your services. Mongo DB should be running as a service.
 - RESTART your computer. please check that Mongo DB is still running as a service (should start with computer)
 - after restarting your computer, you must add an admin user, as this program utilizes authentication to access database. navigate to the bin folder, and open "mongo.exe" (different from "mongod.exe")!
 - db.createUser({
	user: "myUserAdmin",
	pwd: "OITAdmin",
	roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
})
 ```
> use test
switched to db test
> use admin
switched to db admin
> db.createUser(
... {
... user: "myUserAdmin",
... pwd: "OITAdmin",
... roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
... }
... )
Successfully added user: {
        "user" : "myUserAdmin",
        "roles" : [
                {
                        "role" : "userAdminAnyDatabase",
                        "db" : "admin"
                },
                "readWriteAnyDatabase"
        ]
}
```

4) also, please install node.js. this is needed so the system can recognize the .bat file commands to start the application. again, use all default settings when installing.
    https://nodejs.org/en/download/

5) At this point, you can clone the repository. Please run the "FIRST INSTALL BACKEND/FRONTEND - peer consulting sign-in" bat files.
6) then run the "start peer consulting sign-in.bat" file.

create an admin:
1) use any REST API client, while application is running
2) POST "http://localhost:5000/userAdminCollection/add"
3) body is:
{
	"username": "<your username here>",
	"password": "<your password here>"
}

create-react-app boiler plate information
------------------------------------------------------------------------------------------------------------
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
