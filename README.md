# task-manager

## Steps to run project

### backend ---

clone project from branch- develop-todoBackend.

open project in any IDE and

run 'npm install' under root directory.

**prerequisites for backend to run-----**

mysql should be installed in the system in which you are going to run the project.

create database named _'tododb'_ in your mysql database.

create a _' .env '_ file inside the root directory of the project.
please make sure that below things are available in .env file->
PORT=4000

DB_USERNAME='root'

DB_PASSWORD='admin@123'  (put your system's mysql password)

DB_NAME='tododb'



finally run 'npm start' to run backend.

