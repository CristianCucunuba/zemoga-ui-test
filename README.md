# Rule of Thumb.

Solution for [Zemoga UI Test](https://github.com/zemoga/ui-test)  
Live Demo: https://zemoga-ui-test-pi.vercel.app/

## Installation

### MongoDB

To run the project locally you must have installed MongoDB in your computer or use a hosted solution like [Mongo Atlas](https://www.mongodb.com/es/cloud/atlas).

#### Mongo Atlas

You can use Mongo Atlas for simplicity to create your database, register and account and:

- Create a new project with the Free tier
- Create a new database e.g: `zemoga-ui-test`
- Create a collection named `celebrities`
- Import the [initial data](https://github.com/zemoga/ui-test/blob/master/assets/data.json) to your new database

You can find more detail explain [here](https://docs.atlas.mongodb.com/getting-started)

### Run the Project

```bash
  git clone https://github.com/CristianCucunuba/zemoga-ui-test.git
  cd zemoga-ui-test
  npm install
```

Once the dependencies are installed, create an `.env.local` file and add the following variables

```bash
  MONGODB_URI= uri of the remote database created in Atlas
  MONGODB_DB= name of yout database
```

Run the project

```bash
  npm run dev
```

### Test

```bash
  npm test
```

## Built with:

- TypeScript
- NextJS
- ReactJS
- Tailwind
- MongoDB
- react-query
- RTL and Jest
