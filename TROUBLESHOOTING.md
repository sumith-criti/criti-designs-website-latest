# Troubleshooting 404 Error

## Quick Checks

1. **Verify the URL**: Make sure you're accessing `http://localhost:3000` (not `http://localhost:3000/home` or any other path)

2. **Check Server Status**: The server should be running. Look for output like:
   ```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   - Ready in X seconds
   ```

3. **Clear Browser Cache**: 
   - Press `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
   - Or open DevTools (F12) → Network tab → Check "Disable cache"

4. **Check Browser Console**: 
   - Open DevTools (F12)
   - Look for any error messages in the Console tab

5. **Restart the Server**:
   ```bash
   # Stop the server (Ctrl + C)
   # Then restart
   npm run dev
   ```

## Common Issues

### Issue: "404 - Page Not Found"
- **Solution**: Make sure you're accessing `http://localhost:3000` (root URL)
- The homepage is at `/`, not `/home` or `/index`

### Issue: Server not starting
- **Solution**: Check if port 3000 is already in use
- Try: `npm run dev -- -p 3001` to use a different port

### Issue: Compilation errors
- **Solution**: Check the terminal for TypeScript or build errors
- Fix any import or syntax errors shown

### Issue: Blank page
- **Solution**: Check browser console for JavaScript errors
- Verify all dependencies are installed: `npm install`

## Verify Setup

1. File structure should be:
   ```
   app/
     ├── page.tsx  ✅ (Homepage)
     ├── layout.tsx ✅ (Root layout)
     └── globals.css ✅
   ```

2. Dependencies installed:
   ```bash
   npm install
   ```

3. Server running:
   ```bash
   npm run dev
   ```

## Still Having Issues?

1. Check the terminal output for error messages
2. Verify Node.js version (should be 18+): `node --version`
3. Try clearing Next.js cache: `rm -rf .next` (then restart server)
4. Check if all files are saved correctly

## Contact

If the issue persists, check:
- Terminal output for compilation errors
- Browser console for runtime errors
- Network tab for failed requests



