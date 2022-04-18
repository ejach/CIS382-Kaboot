### Heroku Deployment Instructions
After deploying the frontend, you must create another app through Heroku to support the frontend.


1. CD into this directory and run
```bash
$ heroku container:push web --app <your_app_name>
```
2. After the deployment is complete, run 
```bash
$ heroku container:release web --app <your_app_name>
```
3. Add the URL for the backend to the environment variables by navigating to `<your_heroku_app> > Settings > Config Vars` and add the following `Key:Value` pair
```bash
REACT_APP_URL=<your_backend_app_url>
```
