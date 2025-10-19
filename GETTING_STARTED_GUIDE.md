# 🚀 Getting Started with Astral Nexus Interactive

Welcome to your personal interactive learning platform! This guide will have you mastering guides in minutes.

---

## ⚡ 60-Second Quick Start

```bash
# 1. Install
npm install

# 2. Start
npm run dev

# 3. Open
http://localhost:7777

# That's it! Start learning!
```

---

## 🎓 Your First 10 Minutes

### Minute 1-2: Explore Homepage
- See the beautiful Astral design
- Notice your study stats (will show after first use)
- Try the search bar
- Browse category cards

### Minute 3-4: Pick a Guide
- Click "All Guides" or pick a category
- Choose a guide that interests you
- Notice the 4 study tool buttons:
  - 🎴 Flashcards
  - ✏️ Quiz
  - 📅 Study Plan  
  - 📊 Progress

### Minute 5-6: Read Mode
- The guide opens in Read mode
- Beautiful formatting with syntax highlighting
- Table of contents on the right
- Progress widget shows 0% (for now)
- Try selecting some text!

### Minute 7-8: Try Flashcards
- Click the 🎴 Flashcards button (or tab)
- First time: Flashcards initialize (wait ~5 seconds)
- Click a card to flip it
- See the answer
- Rate your recall with the buttons

### Minute 9: Take a Quiz
- Switch to Quiz tab (or click ✏️ Quiz button)
- Answer questions
- Get instant feedback
- See explanations
- Get your score!

### Minute 10: AI Chat
- Click the AI button (bottom right, glowing circle)
- Type: "Summarize this guide for me"
- Watch it respond in real-time!
- *Note: Requires OpenAI API key (see below)*

---

## 🤖 Setting Up AI Chat (Optional but Recommended)

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up (if new) or log in
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)

### Step 2: Add to Project

1. Create file `.env.local` in project root
2. Add this line:
```
OPENAI_API_KEY=sk-your-actual-key-here
```
3. Restart dev server (`Ctrl+C` then `npm run dev`)
4. AI chat now works!

### Cost
- Model: GPT-4o-mini (cheapest, fast)
- Cost: ~$0.01-0.02 per conversation
- $5 credit lasts months of casual use

**Skip AI?** All other features work fine without it!

---

## 📚 How to Study Effectively

### The Astral Method

**Day 1: Introduction**
1. Read first section of guide (Read mode)
2. Highlight key concepts (select text)
3. Switch to Notes mode, add thoughts
4. Take quiz on introduction
5. Review flashcards (10-15 min)

**Days 2-5: Deep Learning**
1. Morning: Review due flashcards
2. Read new sections
3. Take notes and highlight
4. Quiz on each section
5. Ask AI to explain confusing parts

**Day 6: Review**
1. Review all flashcards
2. Retake quizzes
3. Read your notes
4. Check quick reference cards

**Day 7: Mastery**
1. Take final comprehensive quiz
2. Aim for 90%+
3. Review any weak areas
4. Mark guide 100% complete
5. Celebrate! 🎉

---

## 🎯 Feature Walkthrough

### 5 Study Modes Explained

**1. 📖 Read Mode**
- Full guide with enhanced markdown
- Code syntax highlighting
- Beautiful formatting
- Table of contents
- Progress tracking

**2. 🎴 Flashcard Mode**
- Click to flip cards
- Rate recall (4 levels)
- Spaced repetition
- Progress bar
- Session stats

**3. ✏️ Quiz Mode**
- 10 questions per session
- Instant feedback
- Explanations for each
- Review incorrect answers
- Retake unlimited times

**4. 📝 Notes Mode**
- See all your notes
- Add new notes
- Highlight text
- Tag for organization
- Export to JSON

**5. ⚡ Quick Ref Mode**
- Condensed cheat sheets
- Multiple cards per guide
- Printable
- Fast review

### Study Tools

**Progress Widget** (sidebar):
- Visual progress circle
- Time spent tracking
- Quick update buttons (25%, 50%, 75%, 100%)
- Completion status

**AI Chat** (floating button):
- Click to open
- Type question or use quick prompts
- Streaming responses
- Full conversation history
- Close anytime

**Table of Contents** (sidebar):
- Auto-generated from headers
- Click to jump to section
- Smooth scrolling
- Active section highlighted

---

## ⌨️ Keyboard Power User

### Essential Shortcuts

- **?** - Show keyboard shortcuts help
- **/** - Jump to search bar
- **Esc** - Close modals
- **Space** - Flip flashcard (in flashcard mode)
- **1** - Rate flashcard "Again"
- **2** - Rate flashcard "Hard"
- **3** - Rate flashcard "Good"
- **4** - Rate flashcard "Easy"

More shortcuts coming! Press **?** to see full list.

---

## 📊 Dashboard Tour

Visit `/dashboard` to see:

**Top Stats:**
- Guides completed
- Completion rate
- Minutes studied
- Quizzes taken

**Guide Progress:**
- Each guide shows progress bar
- Time spent per guide
- Quick action buttons
- Completion checkmark

**Recent Quizzes:**
- Last 5 quiz results
- Scores with color coding
- Dates taken
- Quick review

---

## 🎴 Flashcard Deep Dive

### How Spaced Repetition Works

When you rate a flashcard:

- **Easy (🎉)**: Next review in 2+ weeks
- **Good (🙂)**: Next review in 6+ days
- **Hard (😕)**: Next review in 1-3 days
- **Again (😰)**: Review tomorrow

The system adapts! Get it right multiple times? Longer intervals. Keep getting it wrong? More frequent reviews.

**Result**: Maximum retention with minimum time!

### Best Practices

1. **Be Honest**: Rate accurately, not optimistically
2. **Daily Reviews**: Spend 10-15 min on due cards
3. **Focus**: Do flashcards when alert, not tired
4. **Consistency**: Daily is better than cramming

---

## ✏️ Quiz Strategies

### When to Quiz

- **After reading** a section
- **Before important application**
- **Weekly** for each guide
- **When you think you know it** (test yourself!)

### How to Improve Scores

1. Take quiz cold (no reviewing first)
2. Note which questions you miss
3. Review those sections in the guide
4. Ask AI to explain difficult concepts
5. Do related flashcards
6. Retake quiz

### Target Scores
- **90%+** = Mastered, ready to apply
- **70-89%** = Good understanding, minor review needed
- **50-69%** = Partial understanding, more study needed
- **<50%** = Review the guide thoroughly

---

## 📝 Note-Taking Tips

### Effective Notes

**Do:**
- Highlight key definitions
- Explain concepts in your own words
- Add examples from your life
- Tag related concepts
- Review notes regularly

**Don't:**
- Just copy the guide
- Make notes too long
- Skip tagging
- Never review them

### Organization

- **Tags**: "important", "confusing", "example", "definition"
- **Sections**: Use dropdown to categorize
- **Highlights**: Select important text first
- **Export**: Backup weekly

---

## 🎯 Study Plan Workflow

1. **Create Plan**: Click 📅 Study Plan on any guide
2. **Customize**:
   - Choose duration (3-30 days)
   - Set daily time (15-90 min)
3. **Follow Schedule**: Daily tasks listed
4. **Check Off**: Mark completed
5. **Stay Consistent**: Follow the plan

Plans include:
- Reading schedules
- Flashcard sessions
- Quiz milestones
- Review days

---

## 🔧 Settings & Preferences

Visit `/settings` to customize:

**Study Preferences:**
- Flashcards per session (default: 20)
- Quiz questions (default: 10)
- Daily study goal (default: 30 min)
- Reminders (on/off)
- Sound effects (on/off)

**Data Management:**
- Export all data
- Reset flashcards
- Reset everything

---

## 📱 Mobile Experience

Everything works on mobile:
- Responsive design
- Touch-friendly buttons
- Swipe gestures (coming soon)
- Mobile-optimized chat
- Hamburger menu

Study on the go!

---

## 🎨 Customization

### Want Different Colors?

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#00ffcc', // Change this
  accent: '#1affd5',  // And this
}
```

### Want More Guides?

Create `.md` file in `guides/`:
```markdown
---
title: "My New Guide"
description: "..."
category: "Category"
tags: ["tag1", "tag2"]
difficulty: "Beginner"
---

# Content here
```

Auto-detected and added!

---

## 🐛 Troubleshooting

### Flashcards Won't Load
- **Solution**: Wait 5-10 seconds on first visit (initializing)
- Check browser console for errors
- Try refreshing page

### AI Chat Says "Error"
- **Solution**: Check `.env.local` has `OPENAI_API_KEY`
- Verify key is valid on OpenAI dashboard
- Restart dev server after adding key

### Progress Not Saving
- **Solution**: Check browser allows IndexedDB
- Don't use incognito mode (data doesn't persist)
- Export data regularly as backup

### Build Errors
- **Solution**: `rm -rf .next && npm run build`
- Check Node.js version (18+)
- Run `npm install` again

---

## 🎉 You're Ready!

Everything is set up and ready to use. The Astral Nexus Interactive Learning Platform includes:

- ✅ 4 comprehensive guides
- ✅ 50+ flashcards
- ✅ 30+ quiz questions
- ✅ AI chat assistant
- ✅ Progress tracking
- ✅ Note-taking
- ✅ Study plans
- ✅ Quick references
- ✅ And so much more!

**Start mastering guides the smart way!** 🚀

---

**Questions?**
- Check INTERACTIVE_FEATURES.md for detailed feature docs
- Ask the AI chat when running
- Review other documentation files

**Happy Learning!** 📚✨🎓

