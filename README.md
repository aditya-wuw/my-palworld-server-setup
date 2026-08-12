# Setup

here are the steps to follow

1. download and install docker and git
2. clone this project `git clone https://github.com/aditya-wuw/palworld-docker-config.git` and `cd palworld-docker-config`
3. Update `.env.example` file to `.env` with your adim password and your server password
4. now go to [playit.gg](https://playit.gg/) website create an account and create a new docker agent, after that get your agent secret key
5. complete account verification in playit.gg and then assign the secret key in your .env to `PLAY_IT_SECRET_KEY`
6. on Playit.gg dashboard click on `Setup` in the navigation bar on the top and click on `Create new tunnel`
7. Setup a new tunnel for `Palworld` add **IP:** `172.25.0.5` and **Port:** `8211` and finish setting up your tunneling service
8. run `docker compose up -d` then run `docker logs -f playit` check if

## .env file setup

```ts
PLAY_IT_SECRET_KEY=your playit gg secret key
SERVER_ADMIN_PASS= your server admin password
SERVER_PASS= your server password
```
