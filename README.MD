# Serverless-Outlook-API
## Outlook Proxy API in API Gateway/Lambda


## 1. Preparation
### 1-1. Install serverless
frameworkVersion: ">=1.0.0 <2.0.0"
```
$ npm install -g serverless
```

### 1-2. AWS credential configure
* ```$ aws configure --profile default```
* Make sure you have the specified profile which is used in serverless.yml
* ```$ cat ~/.aws/credentials```

### 1-3. Create an Azure Web App

create an web app on Application Registration Portal(https://apps.dev.microsoft.com)

* App name:serverless-outlook-api
* Admin Account:<admin_user>@<tenant>.onmicrosoft.com
* TokenEndpoint:https://login.microsoftonline.com/<tenant>.onmicrosoft.com/oauth2/v2.0/token
* App Admin consent, go to browser with the following link:
```
https://login.microsoftonline.com/<tenant>.onmicrosoft.com/adminconsent?client_id=<client_id>&state=12345&redirect_uri=https%3a%2f%2flocalhost
```


## 2. Local Test
### 2-1. Start serverless offline mode
```
$ sls offline
```

### 2-2. Get all the events from the user account
```
$ curl 'http://localhost:3000/event?user=<username>&tenant=<tenant>&clientId=<client_id>&clientSecret=<client_secret>'
```

```
$ curl 'http://localhost:3000/event?user=xu&tenant=cloudnativeltd&clientId=f738ac64-0b60-4eaf-8d46-9fec07e33d3c&clientSecret=Lrfvhhjv1q9nUZbeDaVOJUC'
```

### 2-3. Get a certain event from the user account
```
$ curl 'http://localhost:3000/event/<event_id>?user=<username>&tenant=<tenant>&clientId=<client_id>&clientSecret=<client_secret>'
```

```
$ curl 'http://localhost:3000/event/AAMkADFiNGY4NDNkLTQyMzYtNGVkMi1hNzFmLTBlMTA5NjQ1NTc0OQBGAAAAAABvQUD3H9TbQ7h4lEagnJEwBwBRJkKCQ9R3RITtxHO7XbsLAAAAAAENAABRJkKCQ9R3RITtxHO7XbsLAAAUgn2mAAA=?user=xu&tenant=cloudnativeltd&clientId=f738ac64-0b60-4eaf-8d46-9fec07e33d3c&clientSecret=Lrfvhhjv1q9nUZbeDaVOJUC'
```

### 2-4. Get all the mails from the user account
```
$ curl 'http://localhost:3000/mail?user=<username>&tenant=<tenant>&clientId=<client_id>&clientSecret=<client_secret>'
```

```
$ curl 'http://localhost:3000/mail?user=xu&tenant=cloudnativeltd&clientId=f738ac64-0b60-4eaf-8d46-9fec07e33d3c&clientSecret=Lrfvhhjv1q9nUZbeDaVOJUC'
```

## 3. AWS Deployment & Test
### 3-1. deploy to AWS
```$ sls deploy```

### 3-2. Get all the events from the user account
```
$ curl 'https://<api_gateway_path>/event?user=<username>&tenant=<tenant>&clientId=<client_id>&clientSecret=<client_secret>'
```

```
$ curl 'https://a5mkl153a8.execute-api.ap-northeast-1.amazonaws.com/dev/event?user=xu&tenant=cloudnativeltd&clientId=f738ac64-0b60-4eaf-8d46-9fec07e33d3c&clientSecret=Lrfvhhjv1q9nUZbeDaVOJUC'
```

### 3-3. Get a certain event from the user account
```
$ curl 'https://<api_gateway_path>/event/<event_id>?user=<username>&tenant=<tenant>&clientId=<client_id>&clientSecret=<client_secret>'
```

```
$ curl 'https://a5mkl153a8.execute-api.ap-northeast-1.amazonaws.com/dev/event/AAMkADFiNGY4NDNkLTQyMzYtNGVkMi1hNzFmLTBlMTA5NjQ1NTc0OQBGAAAAAABvQUD3H9TbQ7h4lEagnJEwBwBRJkKCQ9R3RITtxHO7XbsLAAAAAAENAABRJkKCQ9R3RITtxHO7XbsLAAAUgn2mAAA=?user=xu&tenant=cloudnativeltd&clientId=f738ac64-0b60-4eaf-8d46-9fec07e33d3c&clientSecret=Lrfvhhjv1q9nUZbeDaVOJUC'
```

### 3-4. Get all the mails from the user account
```
$ curl 'http://<api_gateway_path>/mail?user=<username>&tenant=<tenant>&clientId=<client_id>&clientSecret=<client_secret>'
```

```
$ curl 'https://a5mkl153a8.execute-api.ap-northeast-1.amazonaws.com/dev/mail?user=xu&tenant=cloudnativeltd&clientId=f738ac64-0b60-4eaf-8d46-9fec07e33d3c&clientSecret=Lrfvhhjv1q9nUZbeDaVOJUC'
```