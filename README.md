# AFV-UI

## Requirements

Node.js >= 18.15.0 ( LTS ) && npm >= 10.7.0

## Installation / Usage

To install dependencies run:

```
npm i
```

To configure the environment variables copy the ".env.local.sample" file and rename the copy to ".env.local". In the file you can set

```
# URL to the API server
REACT_APP_API_URL="http://localhost:8000"
# PORT to serve the frontend from
PORT=3001
```

The API URL is to the AFV-Backend.

To start the AFV-UI run:

```
npm build
npm start
```

## Development

To start the AFV-UI in dev mode run:

```
npm run dev
```

## Deployment

If you have docker installed on your local machine you may create a docker image.

To create a docker image taged "afv-ui" run:

```
docker build -t=afv-ui .
```

There is a github action that creates and deploys a Docker image called "Trigger build of Docker Image".

### Contributing

See [CONTRIBUTING](CONTRIBUTING.md)

# Support

Join our [community on Slack](http://slack.streamingtech.se) where you can post any questions regarding any of our open source projects. Eyevinn's consulting business can also offer you:

- Further development of this component
- Customization and integration of this component into your platform
- Support and maintenance agreement

Contact [sales@eyevinn.se](mailto:sales@eyevinn.se) if you are interested.

# About Eyevinn Technology

[Eyevinn Technology](https://www.eyevinntechnology.se) is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor. As our way to innovate and push the industry forward we develop proof-of-concepts and tools. The things we learn and the code we write we share with the industry in [blogs](https://dev.to/video) and by open sourcing the code we have written.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!
