# 🌟 Astral Nexus - Interactive Learning Platform

**Where Knowledge Aligns with the Stars**

The ultimate knowledge hub with **AI-powered study tools**, spaced repetition flashcards, interactive quizzes, smart note-taking, and comprehensive progress tracking. Master the Astral guides faster and more effectively than ever.

---

## ✨ What Makes This Special

### 🎴 Smart Flashcards
- Spaced repetition using the proven SM-2 algorithm
- Auto-generated from guide content + hand-crafted cards
- 4-level recall rating system
- Tracks mastery over time

### ✏️ Interactive Quizzes
- Multiple choice and true/false questions
- Instant feedback with detailed explanations
- Track scores and improvement
- Identify weak areas

### 🤖 AI Assistant
- Powered by OpenAI GPT-4o-mini
- Context-aware (knows which guide you're studying)
- Answers questions, creates summaries, generates study plans
- Available 24/7 via chat interface

### 📝 Smart Notes
- Highlight text by selecting it
- Add notes with context and tags
- Organize by guide section
- Export all your notes

### 📊 Progress Tracking
- Automatic time tracking
- Completion percentage per guide
- Quiz score history
- Study streaks and achievements

### 📅 Personalized Study Plans
- Customizable duration (3-30 days)
- Flexible daily time commitment
- Structured learning path
- Mix of reading, flashcards, and quizzes

### ⚡ Quick Reference Cards
- Condensed key information
- Perfect for last-minute review
- Printable cheat sheets
- Multiple cards per guide

---

## 🚀 Quick Start

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create .env.local file
cp .env.local.example .env.local

# 3. Add your OpenAI API key (required for AI chat)
# Edit .env.local and add:
OPENAI_API_KEY=sk-your-api-key-here

# 4. Start development server
npm run dev

# 5. Open http://localhost:7777
```

### Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Add to `.env.local`
5. **Cost**: ~$0.01-0.02 per conversation (very affordable!)

---

## 📖 How to Use

### Studying a Guide

1. **Browse** guides from homepage or /guides
2. **Click** any guide to open
3. **Choose study mode**:
   - 📖 **Read** - Full guide with formatting
   - 🎴 **Flashcards** - Test recall with spaced repetition
   - ✏️ **Quiz** - Take a knowledge test
   - 📝 **Notes** - Highlight and annotate
   - ⚡ **Quick Ref** - View condensed cheat sheets

### Using Flashcards

1. Go to any guide
2. Click "🎴 Flashcards" or switch to Flashcards mode
3. Read question, think of answer
4. Click to flip card
5. Rate your recall:
   - 😰 **Again** - Didn't remember (review soon)
   - 😕 **Hard** - Struggled (review in 1-3 days)
   - 🙂 **Good** - Remembered well (review in 6+ days)
   - 🎉 **Easy** - Perfect! (review in weeks)

### Taking Quizzes

1. Click "✏️ Quiz" from any guide
2. Answer each question
3. Get instant feedback
4. Review explanations
5. See final score
6. Retake to improve

### Tracking Progress

- **Automatic**: Time tracked while reading
- **Manual**: Use progress slider in sidebar
- **Dashboard**: View all stats at /dashboard
- **Quick buttons**: Mark 25%, 50%, 75%, or 100% complete

### AI Chat

1. Click floating AI button (bottom right)
2. Ask questions about the guide
3. Get instant, context-aware answers
4. Use quick prompts for common requests

---

## 🎯 Study Workflows

### Recommended Daily Routine

```
1. Review flashcards due (10-15 min)
   → Homepage shows how many cards

2. Read new content (15-20 min)
   → Highlight important parts

3. Take notes (5 min)
   → Switch to Notes mode

4. Test with quiz (10 min)
   → Immediate feedback

5. Review quick ref cards (5 min)
   → Reinforce key concepts

Total: 45-55 minutes of effective study
```

### Before an Important Application

```
1. Quick reference cards (5 min)
2. Flashcard session (10 min)
3. Review your notes (5 min)
4. Take practice quiz (10 min)
5. Ask AI to quiz you on weak areas (10 min)

Total: 40 minutes of focused review
```

---

## 📂 Project Structure

```
astral-nexus/
├── app/                          # Next.js App Router
│   ├── (pages)                   # Main pages
│   ├── study/                    # Study tools
│   │   ├── flashcards/[slug]     # Flashcard pages
│   │   ├── quiz/[slug]           # Quiz pages
│   │   └── plan/[slug]           # Study plan pages
│   ├── dashboard/                # Progress dashboard
│   ├── settings/                 # User settings
│   └── api/                      # API routes
│       ├── chat/                 # AI chat endpoint
│       ├── search/               # Search endpoint
│       └── flashcards/init/      # Flashcard generation
├── components/                   # React components
│   ├── FlashcardStudy.tsx        # Flashcard viewer
│   ├── QuizMode.tsx              # Quiz interface
│   ├── NoteTaking.tsx            # Note editor
│   ├── AIChat.tsx                # AI assistant
│   ├── StudyModeSwitcher.tsx     # Mode selector
│   ├── ProgressWidget.tsx        # Progress tracker
│   └── ... (20+ components)
├── lib/                          # Utilities & logic
│   ├── db.ts                     # IndexedDB layer
│   ├── store.ts                  # State management
│   ├── flashcard-generator.ts   # Flashcard creation
│   ├── quiz-generator.ts         # Quiz creation
│   ├── study-plan.ts             # Study plan generator
│   └── ... (10+ utilities)
├── guides/                       # Markdown guides
│   ├── body-language-mastery.md
│   ├── voice-accent-mastery.md
│   ├── legal-essentials.md
│   └── ultimate-life-manual.md
└── public/                       # Static assets
```

---

## ⚙️ Configuration

### Study Settings

Access at `/settings`:
- Flashcards per session (5-50)
- Quiz questions (5-30)
- Daily study goal (10-180 min)
- Reminders (on/off)
- Sound effects (on/off)

### Data Management
- Export all data (JSON format)
- Reset flashcard progress
- Reset all data
- Backup and restore

---

## ⌨️ Keyboard Shortcuts

- **?** - Show shortcuts help
- **/** - Focus search bar
- **Esc** - Close modals
- **Space** - Flip flashcard
- **1-4** - Rate flashcard

Press **?** anytime to see the full list!

---

## 📚 Available Guides

1. **Body Language Mastery** (Communication, Intermediate)
   - Master nonverbal communication
   - Read facial expressions and gestures
   - Improve your own body language

2. **Voice & Accent Mastery** (Communication, Advanced)
   - Professional voice training
   - Accent acquisition techniques
   - IPA and phonetics

3. **Legal Essentials** (Legal, Intermediate)
   - Know your rights
   - Constitutional law basics
   - Contract and employment law

4. **Ultimate Life Manual** (Wellness, Beginner)
   - Emergency preparedness
   - Financial mastery
   - Health and fitness
   - Career development

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **AI**: OpenAI GPT-4o-mini
- **Database**: Dexie (IndexedDB)
- **State**: Zustand
- **Markdown**: react-markdown + syntax highlighting
- **Search**: Fuse.js

---

## 🎨 Design System

**Colors:**
- Primary: `#00ffcc` (Neon Teal)
- Accent: `#1affd5`
- Background: `#0b0e11` (Dark)

**Fonts:**
- UI: Inter
- Code: JetBrains Mono

**Effects:**
- Glassmorphism
- Neon glows
- Smooth animations

---

## 📱 Compatibility

- **Browsers**: Chrome, Firefox, Safari, Edge
- **Devices**: Desktop, Tablet, Mobile
- **Offline**: ✅ (except AI chat)
- **PWA Ready**: ✅

---

## 🔒 Privacy & Data

- **100% Local Storage**: All data in your browser
- **No Tracking**: No analytics (unless you add)
- **Export Anytime**: Download all your data
- **Your API Key**: You control AI costs

---

## 📖 Documentation

- **INTERACTIVE_FEATURES.md** - Complete feature guide
- **INTERACTIVE_VERIFICATION.md** - Build verification
- **DEPLOYMENT_CHECKLIST.md** - Deployment guide
- **CONTRIBUTING.md** - How to contribute
- **QUICK_START.md** - 5-minute setup

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git push

# 2. Import to Vercel
# 3. Add environment variable:
OPENAI_API_KEY=sk-...

# 4. Deploy!
```

### Other Platforms

Compatible with:
- Netlify
- Fly.io
- Any platform supporting Next.js

---

## 🎓 Learning Science

This platform implements proven learning techniques:

- **Spaced Repetition**: Review at optimal intervals
- **Active Recall**: Test yourself vs re-reading
- **Interleaving**: Mix different topics and modes
- **Immediate Feedback**: Know right away
- **Metacognition**: Track what you know

Result: **Faster learning, better retention, higher mastery**

---

## 🔮 Future Enhancements

Potential additions:
- [ ] Custom flashcard creation
- [ ] Share notes with others
- [ ] Mobile app (React Native)
- [ ] Offline AI (local models)
- [ ] Voice notes
- [ ] Video embeds
- [ ] Community features
- [ ] More guides

---

## 💬 Support

### Getting Help

1. **AI Chat**: Ask the AI assistant
2. **Documentation**: Check INTERACTIVE_FEATURES.md
3. **Issues**: Open GitHub issue
4. **Settings**: Try resetting data if bugs occur

### Common Issues

**AI Chat not working?**
- Check `.env.local` has OPENAI_API_KEY
- Verify API key is valid
- Check browser console for errors

**Flashcards not loading?**
- Wait for initialization (first time only)
- Check browser console
- Try refresh

**Data disappeared?**
- Check same browser (data is per-browser)
- Clear cache may delete data
- Use Export regularly for backups

---

## 📊 Statistics

- **32 Routes** generated
- **50+ Components** created
- **4 Guides** with full interactivity
- **50+ Flashcards** available
- **30+ Quiz Questions** ready
- **15+ Reference Cards** created
- **∞ Learning Potential** unlocked

---

## 🙏 Credits

Built with:
- Next.js by Vercel
- OpenAI GPT-4o-mini
- Tailwind CSS
- Framer Motion
- Dexie.js
- And many other amazing open-source tools

Design inspired by the Astral Productions brand identity.

---

## 📄 License

© 2025 Astral Productions. All rights reserved.

---

**Start your interactive learning journey today!** 🚀

Visit [http://localhost:3000](http://localhost:3000) after running `npm run dev`

**Where Knowledge Aligns with the Stars** ⭐
