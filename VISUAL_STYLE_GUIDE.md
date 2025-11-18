# 🚀 PortoForge Visual Style Guide

## Layout Structure

### Main Layout

```
┌─────────────────────────────────────────────────┐
│  Header (Gradient Background)                   │
├──────────────────┬──────────────────────────────┤
│  Tab Navigation  │  Preview Header              │
├──────────────────┼──────────────────────────────┤
│                  │                              │
│  Editor Panel    │  Preview Canvas              │
│  (Left Sidebar)  │  (Right Main Area)           │
│                  │                              │
│  - Content       │  - Live Preview              │
│  - Design        │  - Responsive Views          │
│  - Templates     │  - 3D Background             │
│  - Connect       │  - Chat Integration          │
│  - Chat AI       │                              │
│                  │                              │
└──────────────────┴──────────────────────────────┘
```

---

## Color Usage by Component

### Header Section

```
Primary: Blue (#3b82f6)
Accent: Purple (#a855f7)
Background: White with subtle gray
Text: Dark gray/black with gradient options
```

### Editor Panels

```
Background: White (#ffffff)
Borders: Light gray (#e5e7eb)
Input Focus: Blue ring (#3b82f6)
Hover: Light purple/blue (#f0f4ff)
```

### Preview Area

```
Background: Gradient (gray-50 → gray-100 → gray-200)
Cards: White with shadow
Highlights: Primary color (blue)
Accents: Purple gradients
```

### Interactive Elements

```
Buttons: Gradient (blue → purple)
Hover State: Enhanced shadow + slight scale
Active State: Darker gradient
Disabled: Reduced opacity (0.5)
```

---

## Typography Hierarchy

### Heading Levels

```
H1 (Hero Title):        text-6xl, font-black, gradient
H2 (Section Title):     text-5xl, font-black, primary-color
H3 (Subsection):        text-4xl, font-bold
H4 (Card Title):        text-2xl, font-bold
H5 (Subtitle):          text-xl, font-bold
H6 (Label):             text-sm, font-semibold
```

### Text Examples

```
Hero Title:    "Welcome to PortoForge"    [text-6xl, black]
Section:       "My Projects"               [text-5xl, blue]
Card Title:    "Project Name"              [text-2xl, bold]
Description:   "Brief description..."      [text-base, regular]
Label:         "Input Field"               [text-sm, medium]
```

---

## Component Showcase

### Button Variants

#### Primary Button

```
┌─────────────────────┐
│  Save Project       │  ← Gradient background
└─────────────────────┘   ← Blue to Purple
  Hover: Enhanced shadow
  Click: Scale 0.98x
```

#### Tab Button (Active)

```
┌─────────────────────┐
│  🎨 Design          │  ← Gradient background
└─────────────────────┘   ← White icon/text
  Background: Gradient (blue → purple)
```

#### Icon Button

```
┌───┐
│ 📎 │  ← Gray background
└───┘   ← Hover: Gradient blue/purple
        ← Smooth transitions
```

### Input Field

```
┌──────────────────────────────┐
│ 📧 your@email.com            │  ← 2px border
└──────────────────────────────┘   ← Focus: blue ring
  Padding: px-4 py-3
  Border Radius: rounded-lg
  Focus Ring: 2px blue
```

### Card Layout

```
┌──────────────────────────────┐
│  [Image or Color Background] │  ← Rounded corners
├──────────────────────────────┤  ← 2px border
│  Card Title                  │  ← Bold text
│  Description text...         │  ← Regular text
│  Learn More →                │  ← Primary color link
└──────────────────────────────┘

Hover: 
  - Lift effect (translateY -8px)
  - Enhanced shadow
  - Border color change
```

---

## Spacing Reference

### Common Patterns

```
Button Padding:      px-6 py-3 (16px × 12px)
Card Padding:        p-6 (24px)
Input Padding:       px-4 py-3 (16px × 12px)
Section Gap:         gap-8 (32px between sections)
Item Gap:            gap-4 (16px between items)
Grid Gap:            gap-6 (24px in grids)
```

### Section Spacing

```
Hero to Projects:    gap-12 (48px)
Section Title:       gap-2 (8px margin-bottom)
Card to Card:        gap-6 (24px)
Item within Card:    gap-3 (12px)
```

---

## Shadow Progression

### From Light to Heavy

```
No Shadow:
┌────────────┐
│   Card     │
└────────────┘

Soft Shadow:
┌────────────┐
│   Card     │ ✨ subtle
└────────────┘
    ↓

Medium Shadow:
    ┌────────────┐
    │   Card     │ ✨✨ visible
    └────────────┘
      ↓

Large Shadow:
      ┌────────────┐
      │   Card     │ ✨✨✨ prominent
      └────────────┘
        ↓ (on hover)
```

---

## Animation Examples

### Fade In

```
Before:  Opacity 0%, Y +20px
After:   Opacity 100%, Y 0px
Time:    0.3s ease-out
```

### Slide Up

```
Before:  Opacity 0%, Y +30px
After:   Opacity 100%, Y 0px
Time:    0.5s cubic-bezier
```

### Scale Up

```
Before:  Scale 0.95
After:   Scale 1
Time:    0.3s ease-out
```

### Hover Lift

```
Normal:  Y 0px, Shadow: small
Hover:   Y -8px, Shadow: large
Time:    0.3s smooth
```

---

## Responsive Design Breakdown

### Mobile (< 640px)

```
┌──────────────┐
│   Header     │  Full width
├──────────────┤
│   Content    │  Single column
│   Stack      │  Larger touch targets
│   Vertically │  Simplified layout
└──────────────┘
```

### Tablet (640px - 1024px)

```
┌──────────────────────────┐
│       Header             │  Full width
├──────────┬───────────────┤
│ Editor   │   Preview     │  Two column
│ (Sidebar)│   (Main)      │  Balanced
│          │               │
└──────────┴───────────────┘
```

### Desktop (1024px+)

```
┌─────────────────────────────────────┐
│            Header                   │  Full width
├──────────────┬──────────────────────┤
│ Editor Panel │   Preview Container  │  Optimal layout
│ (Fixed 500px)│   (Flexible width)   │  Best UX
│              │                      │
│              │                      │
└──────────────┴──────────────────────┘
```

---

## Color Swatches

### Primary Colors

```
🔵 Blue      #3b82f6    RGB(59, 130, 246)      Hex: 3b82f6
🟣 Purple    #a855f7    RGB(168, 85, 247)      Hex: a855f7
🩷 Pink      #f9a8d4    RGB(249, 168, 212)     Hex: f9a8d4
```

### Neutrals

```
⚪ White     #ffffff    RGB(255, 255, 255)     Hex: ffffff
🩶 Gray-50   #f9fafb    RGB(249, 250, 251)     Hex: f9fafb
🩶 Gray-100  #f3f4f6    RGB(243, 244, 246)     Hex: f3f4f6
🩶 Gray-800  #1f2937    RGB(31, 41, 55)        Hex: 1f2937
🖤 Gray-900  #111827    RGB(17, 24, 39)        Hex: 111827
```

---

## Icon Usage

### Icon Sizing

```
Navbar:      size-24 (24px × 24px)
Buttons:     size-18 (18px × 18px)
Cards:       size-16 (16px × 16px)
Labels:      size-14 (14px × 14px)
```

### Icon Colors

```
Default:     Current text color
Primary:     Blue (#3b82f6)
Success:     Green (#10b981)
Warning:     Orange (#f97316)
Error:       Red (#ef4444)
Subtle:      Gray (#9ca3af)
```

---

## Gradient Presets

### Main Gradient (Used Throughout)

```
from-blue-500 (start)
to-purple-500 (end)
Direction: 135deg

Visual: 🔵 ────→ 🟣
```

### Light Gradient (Backgrounds)

```
from-blue-50
to-purple-50
Direction: 135deg

Visual: Light blue ────→ Light purple
```

### Text Gradient

```
from-blue-600
to-purple-600
Direction: 135deg
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```

---

## Focus States (Accessibility)

### Keyboard Navigation

```
Focus Ring:     2px solid blue (#3b82f6)
Outline Offset: 2px
Visible on:     All interactive elements

Example:
┌──────────────────────┐ ← Blue ring
│ ┌─────────────────┐  │
│ │ Button          │  │
│ └─────────────────┘  │
└──────────────────────┘
```

---

## Quick Tweaking Guide

### To Make Bolder

- Increase font-weight (600 → 700 → 900)
- Increase shadow (medium → large)
- Increase border width (1px → 2px)
- Increase padding

### To Make Softer

- Decrease opacity (100% → 80%)
- Use lighter colors
- Reduce shadows
- Increase border-radius

### To Add Emphasis

- Use primary color (#3b82f6)
- Add gradient background
- Increase shadow on hover
- Scale animation on interact

---

## Live Preview Examples

### Portfolio Card Example

```
┌──────────────────────────────┐
│  ╔════════════════════════╗  │
│  ║                        ║  │
│  ║   [Project Image]      ║  │
│  ║                        ║  │
│  ╚════════════════════════╝  │
│  My Awesome Project          │  ← Bold blue
│  This project demonstrates... │  ← Regular gray
│  View Project →               │  ← Blue link
└──────────────────────────────┘
     Hover: Lift + Glow ✨
```

### Skills Section Example

```
┌────────────────────────────────┐
│  💻 Frontend Development       │  ← Bold title
│  ┌──┐ ┌──┐ ┌──┐              │
│  │JS│ │TS│ │HS│              │  ← Tag pills
│  └──┘ └──┘ └──┘              │
└────────────────────────────────┘
  Hover: Scale 1.05 + Shadow
```

---

*This guide is your reference for maintaining visual consistency across PortoForge!* 🎨
