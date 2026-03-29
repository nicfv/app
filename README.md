# Apps
Free and open source software including tools, games, and more.

## For Developers
[Bun](https://bun.com/) is the only prerequisite. Each project should live within `www/<workspace>/<project>/` and must contain a `package.json` with a name and a `start` script to build the project for development or production. Source code files are cleaned out before deployment.
### Start Script Format
```json
{
    "name": "<project>",
    "start": "../../../cmd/start"
}
```

## Build Individual Project
### Development/watch Mode
```shell
bun start dev
```
### Production Mode
```shell
bun start prod
```
