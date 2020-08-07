# HATEOAS-driven notes-cli

a cheap cli note taking app

## Install 

1. Clone
2. Install https://stedolan.github.io/jq/

## Usage

```
$ npm run add NOTE
$ npm run add hi --silent | jq ''
```

## Hosted

1. for dev and testing right now https://donkey-bird.surge.sh/notes.json
2. once the server is up, the notes.json will be accessible via heroku

###

Server app accept HATEOAS to call CLI app to modify `../cli/notes.json`

## TODO

1. add note deletion
2. add note updating
3. add note search (by tags, contexts, etc)
4. add note UUIDs
5. add uploader
6. add web interface (with react and consume via API)
7. write to mongodb? loopback?
8. make authn/authz?
9. nodemon
10. pm2
11. docker
12. host on heroku
