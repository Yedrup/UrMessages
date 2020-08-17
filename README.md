# Message interface

**📖 Table of Contents**

- [Intro](#intro)
- [Project installation and run](#install-run-and-test)
  - [👇 Install](#👇-install)
  - [👟 Run](#👟-run)
  - [🧪 Test](#🧪-Test-)
- [The way the project works so far](#👉-the-way-the-project-works-so-far)

## **_Intro_**

**_UrMess@ges_** is a message interface project based on [Next.js + Jest create-next app starter example](https://github.com/vercel/next.js/tree/canary/examples/with-jest).
This interface displays and allow to send messages.
See more info in [section about the way it works so far](#👉-the-way-the-project-works-so-far)

---

## **_Install_**, **_Run_** and **_Test_**

### **👇 Install**

In your terminal:

```
yarn install
```

### **👟 Run**

In your terminal:

```
yarn run dev
```

### **🧪 Test**

In your terminal:

```
npm run test
```

---

## **👉 The way the project works so far**

- 🔹**FEATURES:**

  - Display messages
  - Send Public or Private message in dedicated feeds
  - Create a thread from a Public or Private Message
  - Connect / Disconnect from a specific userId (NB: UI Matter only)

- 🔹**FAKE DATABASE:**

  - The `fake database` is initialized with `json` files in `./src/fakeServerData`
  - The session of the project uses an instance of a `fake database` based on data coming from `json files`. ✏️ _NB_ : On starting or refreshing the project the instance of database is reset to default one.

- 🔹**API:**

  - It uses the built in [Next.js dynamic API routes functionality](https://nextjs.org/docs/api-routes/dynamic-api-routes). So the `API` possibilities are located in directory `./src/pages/api`
  - It allows to `POST` and `GET` messages by type (_private_ or _public_)
  - It allows to `GET` a specific message and `POST` messages related as a `thread`

- 🔹**AUTHENTICATION:**

  - The connection functionality is linked to a specific userId.
  - API: connection part is built for example purpose of the UI when connected or disconnected and the behavior on protected pages.
  - API: There is no check for userId requesting nor cookie so far. NB: Refreshing the app disconnect the user.

- 🔹**PROTECTED COMPONENT / PAGES**

  - Private type of page or related components are protected, meaning you can't reach them if you are not connected.
