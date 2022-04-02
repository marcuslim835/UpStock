# UpStock
![logo](https://user-images.githubusercontent.com/77620616/160535497-b3d104d7-99c0-41a3-83f2-c35d4f71b7cb.jpg)

## Project Setup
To install modules specified in package.json, run the following in the root folder.
```
npm install
```
Create a .env file with the following content filled in the root folder.
```
VUE_APP_FIREBASE_API_KEY=YOUR_KEY
VUE_APP_FIREBASE_AUTH_DOMAIN=YOUR_KEY
VUE_APP_FIREBASE_PROJECT_ID=YOUR_KEY
VUE_APP_FIREBASE_STORAGE_BUCKET=YOUR_KEY
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_KEY
VUE_APP_FIREBASE_APP_ID=YOUR_KEY
VUE_APP_NEWS_API_KEY=YOUR_APIKEY_FROM_NEWSAPI.COM
VUE_APP_FINANCE_API_KEY=YOUR_APIKEY_FROM_RAPIDAPI_YHFINANCE
VUE_APP_RAPID_STOCK_API_KEY=SAME_AS_ABOVE
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
