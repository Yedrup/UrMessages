# Message interface

**📖 Table of Contents**

- [Intro](#intro)
- [Project installation and run](#👇-install-👟-run-and-🧪-test)
  - [👇 Install](#-👇-install)
  - [👟 Run](#-👟-run)
  - [🧪 Test](#-🧪-Test-)
- [The way the project works so far](#👉-the-way-the-project-works-so-far)

## **_Intro_**

**_UrMess@ges_** is a message interface project based on [Next.js + Jest create-next app starter example](https://github.com/vercel/next.js/tree/canary/examples/with-jest).
This interface displays and allow to send messages.
See more info in [section about the way it works so far](#👉-the-way-the-project-works-so-far)

---

## **_👇 Install 👟 Run and 🧪 Test_**

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

- 🔹**Fake Database:**

  - The `fake database` is initialized with `json` files in `./src/fakeServerData`
  - The session of the project uses an instance of a `fake database` based on data coming from `json files`. ✏️ _NB_ : On starting or refreshing the project the instance of database is reset to default one.

- 🔹**API:**

  - It uses the built in [Next.js dynamic API routes functionality](https://nextjs.org/docs/api-routes/dynamic-api-routes). So the `API` possibilities are located in directory `./src/pages/api`
  - It allows to `POST` and `GET` messages by type (_private_ or _public_)
  - It allows to `GET` a specific message and `POST` messages related as a `thread`
