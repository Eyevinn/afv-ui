# AFV-UI

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

A React-based frontend application for the AFV (Audio/Video Framework) system. This UI provides an intuitive interface for managing and monitoring audio/video processing workflows.

## Features

- Modern React 19 interface with TypeScript support
- Tailwind CSS for responsive styling
- Real-time monitoring and management
- Docker containerization support
- Automated CI/CD with GitHub Actions

## Prerequisites

- Node.js >= 18.15.0 (LTS)
- npm >= 10.7.0

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Eyevinn/afv-ui.git
cd afv-ui
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.local.sample .env.local
```

Edit `.env.local` with your configuration:
```bash
# URL to the AFV-Backend API server
REACT_APP_API_URL="http://localhost:8000"
# Port to serve the frontend from
PORT=3001
```

## Usage

### Production Build

```bash
npm run build
npm start
```

### Development

Start the development server:
```bash
npm run dev
```

### Testing

Run the test suite:
```bash
npm test
```

### Code Quality

Run linting:
```bash
npm run lint
```

Run type checking:
```bash
npm run typecheck
```

Format code:
```bash
npm run pretty
```

## Docker Deployment

Build the Docker image:
```bash
docker build -t afv-ui .
```

Run the container:
```bash
docker run -p 3001:3001 afv-ui
```

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute to this project.

## Issues

If you encounter any issues or have feature requests, please [open an issue](https://github.com/Eyevinn/afv-ui/issues) on GitHub.

## License

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0) - see the [LICENSE](LICENSE) file for details.

### Important License Implications

The AGPL-3.0 is a strong copyleft license with specific requirements:

**✅ You are free to:**
- Use this software for any purpose (commercial or non-commercial)
- Study and modify the source code
- Distribute copies of the software
- Distribute modified versions

**⚠️ Key obligations:**
- **Source code disclosure**: If you distribute this software or run it as a network service, you must make the complete source code (including any modifications) available under the same AGPL-3.0 license
- **Network service requirement**: Unlike GPL, the AGPL requires that if you run modified versions of this software on a server and provide access to users over a network, you must provide those users with access to the modified source code
- **Same license**: Any derivative works must also be licensed under AGPL-3.0
- **License preservation**: You must include the original license and copyright notices

**💼 Commercial considerations:**
- If you plan to integrate this into proprietary software or offer it as a SaaS without releasing your source code, the AGPL license may not be suitable for your use case
- Consider reaching out to [Eyevinn Technology](mailto:sales@eyevinn.se) for alternative licensing arrangements if needed

For more details about your rights and obligations, please read the full [LICENSE](LICENSE) file or visit the [official AGPL-3.0 page](https://www.gnu.org/licenses/agpl-3.0.en.html).

## Support

Join our [community on Slack](http://slack.streamingtech.se) where you can post any questions regarding any of our open source projects. Eyevinn's consulting business can also offer you:

- Further development of this component
- Customization and integration of this component into your platform
- Support and maintenance agreement

Contact [sales@eyevinn.se](mailto:sales@eyevinn.se) if you are interested.

## About Eyevinn Technology

[Eyevinn Technology](https://www.eyevinntechnology.se) is an independent consultant firm specialized in video and streaming. Independent in a way that we are not commercially tied to any platform or technology vendor. As our way to innovate and push the industry forward we develop proof-of-concepts and tools. The things we learn and the code we write we share with the industry in [blogs](https://dev.to/video) and by open sourcing the code we have written.

Want to know more about Eyevinn and how it is to work here. Contact us at work@eyevinn.se!
