## Task-management-ui
This task manager application helps users efficiently track and manage tasks within a defined timeline. It allows for seamless creation, modification, and deletion of tasks through an intuitive interface. With built-in Firebase authentication, users can securely log in to access their personalized dashboard. The app leverages local storage to save data for future use, providing a responsive and easy-to-navigate experience. Users can add new tasks, update their status, and remove completed or unnecessary tasks with ease, all while ensuring tasks are well-organized and managed in real-time.

You can create tasks at https://task-flow-ui.vercel.app/

## Setup Instructions:
First, Clone the repo:
``` 
git clone https://github.com/ashiskumar-1999/task-management-ui.git
```
Install the Dependecies:
```
yarn
```
Run your local server:
```
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For Build, Run:
```
yarn build
```

## Usage Guide
- Log In:
  - Users can log in using Firebase authentication.
  - Upon successful login, you will be redirected to the Dashboard page.

- Create a Task:
  - On the Dashboard page, click the "Add Task" button.
  - A Form Modal will open, allowing you to enter the task details.
  - Click the "Submit" button to save the task.
  - The newly created task will be displayed in the Task Card section.
- Delete a Task:
  - Click on the delete icon next to the task name.
  - A menu will appear with the option to delete the task.
  - Confirm your action, and the task will be removed.

## Tech Stack
- Next.js
- TailwindCSS
- Shadcn
- Firebase
