# Astral Nexus - Port Configuration

## Default Port: 7777

This project runs on **port 7777** by default to avoid conflicts with common development ports.

### Access the Application

**Development:**
```
http://localhost:7777
```

**Production (after npm start):**
```
http://localhost:7777
```

### Why Port 7777?

- Unique and memorable (lucky sevens!)
- Avoids common port conflicts (3000, 8000, 8080, etc.)
- Thematic for Astral Nexus
- Easy to remember

### Changing the Port

Edit `package.json`:
```json
{
  "scripts": {
    "dev": "next dev -p YOUR_PORT",
    "start": "next start -p YOUR_PORT"
  }
}
```

Or run manually:
```bash
npm run dev -- -p 8888
```

### Network Access

The dev server is also accessible on your local network at:
```
http://[your-ip]:7777
```

Check the terminal output after running `npm run dev` to see the network URL.

---

**Current Configuration**: Port 7777 ✨

