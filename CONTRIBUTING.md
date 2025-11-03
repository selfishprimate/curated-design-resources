# Contributing to Curated Design Resources

_To contribute, or not to contribute, that is the question!_

**Hey there! The future contributor of this lovely project.**

I'm sure you will find it quite easy to contribute to the project. You will find step-by-step instructions down below to make it even more easier for you to contribute.

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## 📋 How It Works

This project uses **README.md** as the single source of truth for all content. The website automatically generates category pages and resource listings from the README.

1. **Edit README.md** - Add/update categories and resources
2. **Run Parser** - Convert README to JSON files
3. **Auto-Update** - Website reflects changes immediately

---

## ✨ Adding New Content

### Adding a New Resource

Throughout the instructions, I will use the **Tailwind CSS** resource as an example.

#### Step 1: Update README.md

Open the `README.md` file in your code editor and find the proper section for your resource. Enter the required information as in the example below. **You must enter the new resource in alphabetical order in the list.**

```markdown
- [Tailwind CSS](https://tailwindcss.com/): Rapidly build modern websites without ever leaving your HTML.
```

**Format Rules:**
- Use markdown link format: `[Title](URL): Description`
- Include a colon (`:`) after URL before description
- Keep it in alphabetical order

#### Step 2: Run the Parser

After editing README.md, run:

```bash
npm run parse-readme
```

This will automatically:
- Parse README.md
- Generate individual JSON files per category
- Update the website data

**Output Example:**
```
✓ Generated frontend-design.json (31 resources)
✓ Generated color.json (27 resources)
...
✅ README.md successfully parsed!
```

#### Step 3: Commit Your Changes

**Commit message format:**
```
Add [Resource Name] --> [Category Name]
```

**Example:**
```
Add [Tailwind CSS] --> [Frontend Design]
```

**Commit both files:**
- `README.md` (your changes)
- `src/data/*.json` (generated files)

---

## 🆕 Adding a New Category

Want to add a completely new category? Follow this format in README.md:

```markdown
## Category Name

_Short description of the category_

- [Resource Title](https://link.com): Description of the resource.
- [Another Resource](https://link.com): Another description.
```

Then run:
```bash
npm run parse-readme
```

---

## 🎨 Icon Mapping

Categories are automatically assigned icons based on their name. If you want to customize icons, edit `scripts/parse-readme.js` and update the `iconMap` object.

Default icon mappings:
- Accessibility → Eye
- Color → Palette
- Typography → Type
- Icons → Sparkles
- Design Systems → Grid
- Prototyping → Layers
- ... and more

---

## 🔄 Development Workflow

1. Fork the repository
2. Clone your fork locally
3. Create a new branch for your contribution
4. Edit `README.md` with your changes
5. Run `npm run parse-readme`
6. Test your changes locally with `npm run dev`
7. Commit both README.md and generated JSON files
8. Push to your fork
9. Create a Pull Request

---

## 🛠️ Technical Details

### Parser Script
- **Location**: `scripts/parse-readme.js`
- **Input**: `README.md`
- **Output**: `src/data/*.json`
- **Language**: Node.js (ES Modules)

### Data Structure

Each category JSON file contains:

```json
{
  "id": "color",
  "title": "Color",
  "description": "The best tools for creating color schemes",
  "icon": "Palette",
  "resources": [
    {
      "title": "Adobe Color",
      "link": "https://color.adobe.com",
      "description": "Create beautiful color themes!"
    }
  ]
}
```

---

## ⚠️ Important Notes

1. **Always run the parser** after editing README.md
2. **Commit both** README.md and generated JSON files
3. **Don't manually edit** JSON files (they'll be overwritten)
4. **Keep format consistent** in README.md for proper parsing
5. **Alphabetical order** - Keep resources sorted alphabetically

---

## 🐛 Troubleshooting

### Parser doesn't find resources
- Check markdown link format: `[Title](URL): Description`
- Ensure colon (`:`) after URL before description
- No extra spaces or line breaks

### Missing category
- Check category header uses `##` (Level 2 heading)
- Category should have a description in `_italics_`
- Run parser again

### Icons not showing
- Check if icon exists in `iconMap` in `scripts/parse-readme.js`
- Add custom mapping if needed
- Icon names must match Lucide icon names

---

## 📝 Complete Example

**Before (README.md):**
```markdown
## Frontend Design

_Suppose you're a designer. You also love to write HTML, CSS, JavaScript!_

- [Bootstrap](https://getbootstrap.com/): Build fast, responsive sites with Bootstrap.
- [Tailwind CSS](https://tailwindcss.com/): Rapidly build modern websites without ever leaving your HTML.
```

**Command:**
```bash
npm run parse-readme
```

**Generated (frontend-design.json):**
```json
{
  "id": "frontend-design",
  "title": "Frontend Design",
  "description": "Suppose you're a designer...",
  "icon": "Code",
  "resources": [
    {
      "title": "Bootstrap",
      "link": "https://getbootstrap.com/",
      "description": "Build fast, responsive sites with Bootstrap."
    },
    {
      "title": "Tailwind CSS",
      "link": "https://tailwindcss.com/",
      "description": "Rapidly build modern websites without ever leaving your HTML."
    }
  ]
}
```

---

Well, that's all you need to know. It was easy, wasn't it?

**Need help?** Open an issue on GitHub and we'll be happy to assist you!

Thank you for contributing! 🎉
