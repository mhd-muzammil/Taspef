# Contributing to TASPEF

Thank you for your interest in contributing to TASPEF! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/taspef-monorepo.git
   cd taspef-monorepo
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   - Copy `.env.example` files in both `/client` and `/server`
   - Rename them to `.env`
   - Fill in the required values

4. **Start development servers**
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the coding standards
   - Add comments where necessary

3. **Test your changes**
   - Ensure all existing tests pass
   - Add new tests for new features
   - Test manually in the browser

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**

## Coding Standards

### JavaScript/React

- Use ES6+ syntax
- Use functional components with hooks
- Follow the existing code style
- Use meaningful variable and function names
- Keep functions small and focused
- Add PropTypes for all components

### CSS/Tailwind

- Use Tailwind utility classes whenever possible
- Keep custom CSS to a minimum
- Follow mobile-first responsive design
- Maintain consistent spacing and sizing

### File Organization

```
client/src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── services/       # API services
├── hooks/          # Custom React hooks
└── utils/          # Utility functions

server/src/
├── config/         # Configuration files
├── models/         # Mongoose models
├── controllers/    # Route controllers
├── routes/         # API routes
└── middleware/     # Custom middleware
```

## Commit Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add file upload progress indicator
fix: resolve pagination bug on mobile
docs: update API documentation
style: format code with prettier
refactor: simplify file validation logic
test: add unit tests for file controller
chore: update dependencies
```

## Pull Request Process

1. **Ensure your PR**:
   - Has a clear title and description
   - References any related issues
   - Includes screenshots for UI changes
   - Has passing tests
   - Follows the coding standards

2. **PR Template**:
   ```markdown
   ## Description
   Brief description of changes

   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update

   ## Testing
   - [ ] Tested locally
   - [ ] Added/updated tests
   - [ ] All tests passing

   ## Screenshots (if applicable)
   Add screenshots here

   ## Related Issues
   Closes #issue_number
   ```

3. **Review Process**:
   - At least one maintainer must approve
   - All CI checks must pass
   - No merge conflicts
   - Code review feedback addressed

4. **After Merge**:
   - Delete your feature branch
   - Pull the latest changes from main
   - Celebrate! 🎉

## Questions?

If you have questions, please:
- Check existing issues and discussions
- Create a new issue with the `question` label
- Contact the maintainers

Thank you for contributing to TASPEF! 🌳

