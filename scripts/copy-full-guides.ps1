# Copy Full Guide Content with Frontmatter

# Body Language Guide
$content = Get-Content "New_Master_Guides\Master_Body_Language_Guide.md" -Raw
$frontmatter = @"
---
title: "The Master Body Language Guide"
description: "Complete system for reading and using nonverbal communication - from facial expressions to posture, learn to decode and master body language"
category: "Communication"
tags: ["body language", "nonverbal communication", "social skills", "psychology", "communication"]
difficulty: "Intermediate"
---

"@
Set-Content -Path "guides\body-language-mastery.md" -Value ($frontmatter + $content)
Write-Host "✅ Copied Body Language Guide (full content)" -ForegroundColor Green

# Voice & Accent Guide
$content = Get-Content "New_Master_Guides\Master_Voice_and_Accent_Guide.md" -Raw
$frontmatter = @"
---
title: "The Master Voice & Accent Guide"
description: "Complete professional system for voice mastery and accent transformation - breathing, phonetics, accent acquisition, and vocal health"
category: "Communication"
tags: ["voice training", "accent", "speech", "pronunciation", "public speaking", "IPA"]
difficulty: "Advanced"
---

"@
Set-Content -Path "guides\voice-accent-mastery.md" -Value ($frontmatter + $content)
Write-Host "✅ Copied Voice & Accent Guide (full content)" -ForegroundColor Green

# Legal Facts Guide
$content = Get-Content "New_Master_Guides\Complete_Legal_Facts_Master_Guide.md" -Raw
$frontmatter = @"
---
title: "The Complete Legal Facts Master Guide"
description: "Comprehensive guide to your rights, responsibilities, and legal system navigation - from constitutional rights to contracts, employment to family law"
category: "Legal"
tags: ["legal rights", "law", "contracts", "criminal law", "civil rights", "consumer protection"]
difficulty: "Intermediate"
---

"@
Set-Content -Path "guides\legal-essentials.md" -Value ($frontmatter + $content)
Write-Host "✅ Copied Legal Facts Guide (full content)" -ForegroundColor Green

# Ultimate Life Manual
$content = Get-Content "New_Master_Guides\Ultimate_Life_Manual_Master_Edition.md" -Raw
$frontmatter = @"
---
title: "The Ultimate Life Manual"
description: "Master Edition: Complete guide to survival, success, and thriving - from emergency preparedness to financial mastery, health to career success"
category: "Wellness"
tags: ["life skills", "survival", "finance", "health", "career", "productivity", "self-improvement"]
difficulty: "Beginner"
---

"@
Set-Content -Path "guides\ultimate-life-manual.md" -Value ($frontmatter + $content)
Write-Host "✅ Copied Ultimate Life Manual (full content)" -ForegroundColor Green

Write-Host "`n🎉 All guides copied with full content!" -ForegroundColor Cyan

