# <img src="./img/readme-logo.png" height="24px"> Documentation Planner
A collection of items to consider documenting for a range of subjects encountered by software product engineering teams and organizations.

<img src="./img/readme-home.png" width="400px"> <img src="./img/readme-repository.png" width="400px">
<p align="center"><a href="https://TODO.hyaline.dev">TODO.hyaline.dev</a></p>

The philosophy behind this tool is to provide a superset of items that should be considered for inclusion into the documentation for certain subjects. It is not intended that every subject should contain every item.

This was created because we were having to research and plan out documentation at every single place we worked, and we wanted a reference that we could use. We thought that reference would be helpful to others, so here we are!

## Using
Please visit https://TODO.hyaline.dev to use the documentation planner tool.

If you have issues or suggestions please feel free to create a [GitHub issue](https://github.com/appgardenstudios/documentation-planner/issues) or contact us at support@hyaline.dev.

## Developing

### Prerequisites
- Node.js

### Setup
Install dependencies:
```bash
npm ci
```

### Running
Run the development server:
```bash
npm run dev
```

## Testing
There are unit tests to exercise functionality that cannot be easily tested manually.

### Running
Run tests:
```bash
npm test
```

## Releasing
GitHub pages is configured to pull from the `docs/` folder on the `main` branch. There is a pre-commit hook installed to ensure that the `docs/` folder always contains the built tool on every commit.

### Instructions
Build for production:
```bash
npm run build
```

## Contributing
Suggestions and additions are welcome. Please open an issue to discuss your suggestion or fork and open a PR.

A few things to note:
- This is an opinionated collection, so it is up to us as authors to decide wether or not to accept any changes.
- This repo is licensed under MIT, so any additions or changes will need to be contributed under that license.
- We will not accept any material that is not compatible with the MIT license.
- Examples and/or usage information must be properly attributed and the source must allow incorporation into this work

## License
The content of this tool itself is licensed under the [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/), and the underlying source code used to format and display that content is licensed under the [MIT license](./LICENSE.md).