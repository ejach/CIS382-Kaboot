# CIS382-Kaboot

### Project Specification v1.2
#### CIS-382 Database Programming
Design and implement a system for managing multiple-choice tests. Your
system should support:
- addition of new questions;
- editing of questions;
- and creation of tests from the available set of questions.
User must also be able to:
- take tests;
- and the system should give students feedback on their scores and
save it in the database.
There must be a graphical user interface (it must not be a simple console
application). You could make it a desktop, web or mobile app for example.
- Use PostgreSQL as your DBMS.
- Your project should be hosted on GitHub.
- The database should be at least in the third normal form.
- At least one stored procedure/function must be used.
- At least one trigger must be used not using the function previously mentioned.
- Your application must access the database using the DAO pattern.
- You must also create an E-R diagram of your database.
This project should be accomplished in groups of three.
This project should follow code guidelines (see syllabus)
Important note: More content may be added to this project specification as we progress in our
classes. If any modification is made to this document, I will inform you by e-mail.

### Heroku Deployment
This requires two Heroku apps, one for the [frontend](https://github.com/ejach/CIS382-Kaboot/blob/main/app/static/README.md) and one for the backend.
1. Create a Heroku app with a PostgreSQL database setup 
2. CD into the current working directory and run
```bash
$ heroku container:push web --app <your_app_name>
```
3. Once the image is done pushing run
```bash
$ heroku container:release web --app <your_app_name>
```
4. Add the environment variables to Heroku by navigating to `Settings > Config Vars` and adding the following `Key:Value` pairs for the Database:
```bash
dbname=xxx
password=xxx
host=xxx
user=xxx
```