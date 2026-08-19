Before following the steps make sure you have generated a string 32bit hex string and assign them in your Bot's env file and the Server's env file to `SHARED_CLIENT_SIGNATURE`

# Server Setup

This is the guide to setup the server docker container

1. download and install docker, git (optional if you download the source zip), npm/pnpm (optional for shorthand scripts )
2. clone this project `git clone https://github.com/aditya-wuw/palworld-docker-config.git` or extract the zip file content and `cd palworld-docker-config`
3. Update `.env.example` file to `.env` with your adim password and your server password
4. Go to [playit.gg](https://playit.gg/) website create an account and create a new docker agent, after that get your agent secret key
5. Complete account verification in playit.gg and then assign the secret key in your .env to `PLAY_IT_SECRET_KEY`
6. on Playit.gg dashboard click on `Setup` in the navigation bar on the top and click on `Create new tunnel`
7. Setup a new tunnel for `Palworld` add **IP:** `172.25.0.5` and **Port:** `8211` and finish setting up your tunneling service
8. Now run the `run.sh` shell script (use git bash if you are on windows). It will prompt you with the commands to execute different tasks

## .env file example

```python
PLAY_IT_SECRET_KEY=your_playit_gg_secret_key
SERVER_ADMIN_PASS= your_server_admin_password
SERVER_PASS= your_server_password
BACKUP_UPLOAD_END_POINT=http://host.docker.internal:1000 #keep this if running the bot locally or else paste the hosted url
SERVER_API_PORT=8212 #if customized make sure to expose the port
```

# Discord Bot & Upload setup guide

This is the setup guide for the dedicated discord bot to fetch server informations and handling backup uploads to your google drive

## Google drive setup

1. cd to your bot location using `cd Bot` from your root then rename the .env.example to .env and update the values with your own
2. go to googe cloud console and enable Google Drive API
3. Create a new Project then create a oAuth client and get your `client_id` and `client_secret` keys and store them in .env file
4. Generate your refresh token using [oAuth playground](https://developers.google.com/oauthplayground/) and store the key in your .env file
5. Create a new folder in your google drive and get the `DRIVE_FOLDER` id from the URL and save in your .env file.
6. Then share the folder and add your oAuth client's email as an Editor.
7. Create your discord client using [discord developers portal](https://discord.com/developers/applications) and create a new app
8. get your `DISCORD_BOT_TOKEN` by going into your Discord app, then go to the Bot tab and click on the reset Token copy the generated token and save it in your .env file
9. get your `CLIENT_ID` by going to general infromation and copy the Application ID and save it in your .env file
10. you can set your target Channel by getting your channel id, right click on any of your text channel and you can copy the `CHANNEL_ID` from there then savae it in your .env

## .env file example

```python
SERVER_BACKUP_API_ENDPOINT=http://localhost:3000/v1 #your server backup api endpoint

DISCORD_BOT_TOKEN=your_bot_token #get from creating a new bot via discord deverloper platform
CLIENT_ID=your_bot_client_id
CHANNEL_ID=your_target_channel_id #right click on your channel

DRIVE_FOLDER=your_target_Google_drive_folder_id
GOOGLE_CLIENT_ID=your_google_0Auth_client_id
GOOGLE_CLIENT_SECRET=your_google_0Auth_client_secret
GOOGLE_REDIRECT_URI=http://localhost:1000 #your bot's hosted endpoint
GOOGLE_REFRESH_TOKEN=your_generated_refresh_token #use oAtuh playground to generate it

```
