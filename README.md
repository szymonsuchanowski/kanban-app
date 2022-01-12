# Kanban Board App
![Kanban Board App screenshot](/img/kanban-board-app.png "Kanban Board app screenshot")

&nbsp;

## Overview

### What is Kanban?

In short, the Kanban Method is a means to design, manage, and improve flow systems for knowledge work. The method also allows organizations to start with their existing workflow and drive evolutionary change. For more information, see [here](https://kanbanblog.com/explained/).

### Then what is the Kanban Board App?

**Kanban Board App** is a tool that **visualizes** the Kanban method and allows for its **practical use**.

### Kanban Board App features

- **adding tasks** with the specification of:
    - name
    - assigned person (name and e-mail address)
    - deadline
    - detailed description
    - fields of the form are validated
- **moving tasks** between the columns (according to the specified limits of the columns)
- **deleting tasks**
- **saving / deleting tasks using Local Storage** (refreshing the page does not cause loss of work progress)

&nbsp;

## 👨‍💻 Built with

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=Webpack&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3E?style=for-the-badge&logo=babel&logoColor=white)

&nbsp;
## ⚙️ Run Locally

The project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/), follow the steps below to run it locally.

- Clone the project using

```bash
  git clone
```

- Go to the project directory and install dependencies

```bash
  npm i
```

- Start the server

```bash
  npm start
```

- Kanban Board App is ready at port 8080

```bash
  http://localhost:8080/
```
&nbsp;
## 🤔 Solutions provided in the project

- Kanban Board App uses **modern React features** (Hooks, Context API)
- `<Kanban />` component uses **`useReducer`** hook, which allows to render `<Task />` component (data saved in the state) and all operations related to the board (adding/removing tasks, moving tasks, clearing the board)
- `<Kanban />` component provides **context** which is consumed by other components (e.g. `<Board />` which is consumer of `ColumnsContext`, in this case `useContext` hook is used)
- rendered `<Task />` are sorted by date
- `<Form />` component uses `useReducer` and `useState` hooks
    - `useReducer` to **control the form inputs** (entered values, marking fields filled in correctly/incorrectly, clearing the form)
    - `useState` to **store information about errors** after completing the form, which are then displayed to the user
- `<FormField />` are rendered dynamically, you can specify your own needed fields in the `formFieldsData.js` file

```javascript
const formFields = [
    { name: 'taskName', label: 'task*', type: 'text' },
    { name: 'owner', label: 'owner*', type: 'text' },
    { name: 'email', label: 'e-mail*', type: 'email' },
    { name: 'date', label: 'deadline', type: 'date' },
    { name: 'message', label: 'description', fieldName: 'textarea' },
];
```

- all **form fields are validated** according to the rules saved in the `DataValidator.js` file, e.g.

```javascript
owner = {
        regExp: /^[a-zA-Z]{3,}(?:(-| )[a-zA-Z]+){0,2}$/,
        err: 'min. 3 letters',
        required: true,
    };
```

- Kanban Board App columns are rendered dynamically as well, as specified in `columnsData.js` file

```javascript
const columnsData = [
    { id: 1, name: 'pending', limit: 6, isDivided: false },
    { id: 2, name: 'analysis', limit: 3, isDivided: true },
    { id: 3, name: 'development', limit: 5, isDivided: true },
    { id: 4, name: 'test', limit: 3, isDivided: false },
    { id: 5, name: 'deploy', limit: 5, isDivided: false },
];
```

- **custom hooks used**
    - `useStorage` to handle tasks data saving / deleting in Local useStorage
    ```javascript
        const [saveToStorage, getFromStorage] = useStorage();
    ```
    - `useModal` to handle `<Modal />` with specified content opening / closing when needed (showing `<Form />`, information about full column - no task move possibility, e.t.c.)
    ```javascript
        const [ModalWithContent, showModal, closeModal, setContent] = useModal();
    ```
- Kanban Board App styling
    - **RWD**
    - **pure CSS** with the use of variables (the ability to quickly change, for example, colors)
    - layout resembling a **board with pinned cards** (also showing tasks with due date shorter than that specified in the `importantDeadline.js` file - you can specify it on your own, by default it is 2 days, as above)   

![task card screenshot](/img/task-card.png "task card layout")

&nbsp;
## 🔗 Useful resources

- [official React website](https://reactjs.org/docs/getting-started.html)
- [Learn useReducer In 20 Minutes](https://www.youtube.com/watch?v=kK_Wqx3RnHk&t=687s) - useReducer explanation (channel: [Web Dev Simplified](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw))
- [Kanban explained](https://kanbanblog.com/explained/)
- [What is Kanban?](https://www.youtube.com/watch?v=iVaFVa7HYj4&list=PLaD4FvsFdarR3oF1gp5_NmnlL-BQIE9sW&index=2) - 4 shorts videos with Kanban explained (by Max from Jira Software - Atlassian)
- [50 Gorgeous Color Schemes From Award-Winning Websites](https://visme-co.translate.goog/blog/website-color-schemes/?_x_tr_sl=en&_x_tr_tl=pl&_x_tr_hl=pl&_x_tr_pto=op,sc) - for design inspiration
- [10 Kanban Board Software Options You Need to Know For 2020](https://instagantt.com/gantt-chart-experts/top-10-best-kanban-board-software-in-2020) - article with 10 Kanban tools (as a source of inspiration)

&nbsp;
## 🙏 Special thanks

Special thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) for providing me with the task and code review.