# Server Setup

here are the steps to follow

1. download and install docker, git (optional if you download the source zip), npm/pnpm (optional for shorthand scripts )
2. clone this project `git clone https://github.com/aditya-wuw/palworld-docker-config.git` or extract the zip file content and `cd palworld-docker-config`
3. Update `.env.example` file to `.env` with your adim password and your server password
4. Go to [playit.gg](https://playit.gg/) website create an account and create a new docker agent, after that get your agent secret key
5. Complete account verification in playit.gg and then assign the secret key in your .env to `PLAY_IT_SECRET_KEY`
6. on Playit.gg dashboard click on `Setup` in the navigation bar on the top and click on `Create new tunnel`
7. Setup a new tunnel for `Palworld` add **IP:** `172.25.0.5` and **Port:** `8211` and finish setting up your tunneling service
8. you can use the following commands to run the server,
   - Run: `docker compose up -d`
   - Check Server logs: `docker logs -f palworld-server`
   - Check Playit.gg logs: `docker logs -f playit`
   - Stop/Terminate : `docker compose down`
     shorthand scripts using pnpm packagemanager

## .env file setup

```ts
PLAY_IT_SECRET_KEY=your playit gg secret key
SERVER_ADMIN_PASS= your server admin password
SERVER_PASS= your server password
```

# Bot & uploade setup guide

## Google drive setup

1.  go to googe cloud console and enable Google Drive API
2.  Create a service account from and click on Key tab ad generate a Key ( it downloads the json with all your credentials)
3.  Rename the file to `service-account-key.json` and keep it in your the root of `/Bot` folder.
