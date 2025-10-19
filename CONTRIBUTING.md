# Contributing to Astral Nexus

Thank you for your interest in contributing to the Astral Nexus! This document provides guidelines for adding content and improving the platform.

## Adding New Guides

### Step 1: Create Markdown File

Create a new `.md` file in the `guides/` directory with a descriptive, URL-friendly filename:

```
guides/your-guide-name.md
```

### Step 2: Add Frontmatter

Every guide must start with frontmatter containing metadata:

```markdown
---
title: "Your Guide Title"
description: "A comprehensive description of what this guide covers"
category: "Category Name"
tags: ["tag1", "tag2", "tag3", "tag4"]
difficulty: "Beginner|Intermediate|Advanced"
---
```

### Step 3: Write Content

Write your guide content in Markdown:

```markdown
# Main Title

## Section 1

Your content here...

### Subsection

More content...

## Section 2

Continue with well-organized sections...
```

### Step 4: Test Locally

```bash
npm run dev
```

Visit `http://localhost:7777/guides/your-guide-name` to preview.

### Step 5: Submit

- Commit your new guide file
- Push to repository
- The guide will automatically appear on the site

## Style Guidelines

### Markdown Formatting

- Use proper heading hierarchy (# -> ## -> ###)
- Include code blocks with language specification:
  ````markdown
  ```javascript
  code here
  ```
  ````
- Use lists for steps or multiple points
- Use blockquotes for important notes:
  ```markdown
  > Important note here
  ```

### Content Guidelines

- **Clear and concise**: Get to the point
- **Well-organized**: Use sections and subsections
- **Actionable**: Provide practical steps
- **Comprehensive**: Cover the topic thoroughly
- **Accurate**: Fact-check all information
- **Accessible**: Write for a general audience

### Categories

Use one of these existing categories or suggest a new one:
- Wellness
- Communication
- Legal
- Survival
- Technology
- Finance
- Creativity
- Productivity

### Tags

- Use 3-7 relevant tags
- Lowercase
- Specific and searchable
- Examples: "javascript", "health", "budgeting", "public speaking"

### Difficulty Levels

- **Beginner**: No prior knowledge required
- **Intermediate**: Some background helpful
- **Advanced**: Requires significant prior knowledge

## Improving the Platform

### Bug Reports

Open an issue with:
- Description of the bug
- Steps to reproduce
- Expected vs. actual behavior
- Screenshots if applicable

### Feature Requests

Open an issue with:
- Clear description of the feature
- Use case and benefits
- Mockups if applicable

### Code Contributions

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Style

- Follow existing code patterns
- Use TypeScript for type safety
- Comment complex logic
- Keep components focused and reusable

## Questions?

Open an issue or reach out to the maintainers.

Thank you for contributing to the Astral Nexus!

