# Willow Bank


## 📐 Project Setup

```
git clone https://github.com/Mwpereira/Willow-Bank.git
cd Willow-Bank
npm install
```

## 🖥 Developing

### Client

Develop using a Desktop Application _(Recommended)_

```
npm run electron:serve
```

Develop using a Web Browser Build

```
npm run serve
```

### Server

Running aws serverless locally

```
serverless offline
```

## 📚 Frameworks

-   _Vue.js_ - for building user interfaces and connecting Javascript/Typescript code
-   _Bulma_ - for UI components and styling

## 🔐 Back-End

### Dependencies

-   _Serverless_ - for hosting AWS resources including API Gateway, Lambdas, and DynamoDB
-   _Dynamoose_ - for modeling and executing according to database schema's
-   _Webpack_ - for bundling serverless file and uploading them to AWS
-   _bcrypt_ - for hashing functionality

## 🎨 Front-End

### Dependencies

-   _Buefy_ - for using UI components for Vue.js based on Bulma
-   _ChartJS_ - for creating and presenting data in a modern chart
-   _axios_ - for the promise based HTTP client to handle requests

## 🧪 Testing

### Run Cypress e2e tests

```
npm run test:e2e
```

### Gallery

<img src="/dist/screenshots/home.PNG" width="750x50">
<img src="/dist/screenshots/login.PNG" width="750x50">
<img src="/dist/screenshots/dashboard.PNG" width="750x50">
<img src="/dist/screenshots/accounts.PNG" width="750x50">
