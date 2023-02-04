# CRUD-RTK-SAGA

This is a simple CRUD application, implemented using React + Redux Toolkit + Redux Saga(Middleware) + JSON-Server.

# Initial Step

npm install - to install all the dependencies.

npm start - to start the application.

npm run server - to start internal JSON-Serve which is acting like a db.

# Info

## Functionality

- Fetch users functionality is there which will fetch data from the JSON-Server.
- Add and Update functionality is also there, once a user is successfully added/Updated it will redirect to the home page(i.e. Fetch page).
- Persist user on update page after refresh is also persent with the help of `localStorage` of the browser.
- Error is handled in Fetch, Add, Update & delete functionality, it will appear in toast.
- Loader is there for better UI experience.
- react-toastify is also used to show success and error messages.

## Libraries

- `React` for view part.
- `Redux Toolkit` as an central store for the application for state management.
- `Rega Saga` as middleware to achieve async behaviour.
- `JSON-Server` as internal db.
- `react-toastify` for success and error message.
- `Formik` to create form with `yup` for the validation schema.
- `Axios` as HTTP client.
