# Troubleshooting Frontend Issues

## Common Issues and Solutions

### Issue 1: PostCSS/Tailwind Errors

If you see errors related to PostCSS or Tailwind:

1. Delete node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

   On Windows PowerShell:
   ```powershell
   Remove-Item -Recurse -Force node_modules, package-lock.json
   npm install
   ```

### Issue 2: Port Already in Use

If port 5173 is already in use:

1. Kill the process using the port, or
2. Vite will automatically use the next available port (5174, 5175, etc.)

### Issue 3: Module Not Found Errors

If you see "Cannot find module" errors:

```bash
npm install
```

Make sure these are installed:
- axios
- react-icons
- tailwindcss
- postcss
- autoprefixer

### Issue 4: PostCSS Config Error

If you see PostCSS configuration errors, make sure `postcss.config.js` exists in the `my-project` root with:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### Issue 5: Tailwind Classes Not Working

1. Make sure `src/index.css` has:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. Make sure `tailwind.config.js` has correct content paths:
   ```js
   content: [
     "./index.html",
     "./src/**/*.{js,ts,jsx,tsx}",
   ],
   ```

### Quick Fix - Full Reset

If nothing works, try a complete reset:

```bash
# Delete node_modules and lock file
Remove-Item -Recurse -Force node_modules, package-lock.json

# Clear npm cache
npm cache clean --force

# Reinstall everything
npm install

# Try running again
npm run dev
```

