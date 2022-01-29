# Listeme
Listeme is an all-in-one productivity app. The app features various synchronizations across multiple features.
Rather than having to navigate the G suite or Microsoft Office for all your needs,
this app eliminates the option of the navigation by giving users all the features in one place.

## Motivation
Our motivation for this project is to help other people become their best, productive, selves. As students ourselves, we understand the difficulties of staying productive and keeping your work organized. We believe that Listeme should help all potential users, students and not, to do their best work and achieve higher and higher successes using our application!

## Client Installation & Usage

Install node.js and npm.

Git clone the repository, then run the following commands to install the libraries for the client:

```bash
cd client
npm install 
```
And to run the client:

```bash
npm run start
```

## Server Installation & Usage

In the main project directory

```bash
cd server
npm install 
```
Rename `sample_config.env` to `config.env` and edit the config to include your mongo key,
and specify which port you would like to use.

And to run the server:

```bash
npm run start
```

## Contributing 
New contributors are welcome, please join our discord to get started and discuss what you can implement.

[Discord Link](https://discord.gg/4byF9BUyY6)

We use Jira to track issues and user stories.

Our branches are names as follows: `devname-featurename`

For pull requests please make sure you follow the agreements written in `docs/sprint0/done.md`
And adhere to our pull request template in `/docs/pull_request_template.md`