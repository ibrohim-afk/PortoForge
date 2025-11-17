# 💻 PortoForge Implementation Guide

## Quick Start Customization

### 1. Change Primary Color

#### In App.jsx

```jsx
// Line ~250 - DEFAULT PRIMARY COLOR
const [primaryColor, setPrimaryColor] = useState('#3b82f6'); // Change this

// To use a different default:
const [primaryColor, setPrimaryColor] = useState('#a855f7'); // Purple
const [primaryColor, setPrimaryColor] = useState('#10b981'); // Green
const [primaryColor, setPrimaryColor] = useState('#f97316'); // Orange
```

#### Available Preset Colors

```javascript
const PRIMARY_COLORS = {
  blue: '#3b82f6',
  purple: '#a855f7',
  pink: '#ec4899',
  green: '#10b981',
  orange: '#f97316',
  red: '#ef4444',
  cyan: '#06b6d4',
  indigo: '#6366f1',
};
```

---

### 2. Change Default Theme

#### In App.jsx

```jsx
// Line ~200 - THEMES definition
const [theme, setTheme] = useState(THEMES[0]); // 0 = Minimalist

// Available themes:
// 0 = Minimalist (Light)
// 1 = Dark Tech
// 2 = Glassmorphism
// 3 = Gradient
```

---

### 3. Customize Fonts

#### Add New Font

```jsx
// In FONTS array (line ~180)
const FONTS = [
  'Inter', 
  'Roboto', 
  'Lato', 
  'Montserrat', 
  'Oswald', 
  'Source Code Pro', 
  'Poppins', 
  'Playfair Display',
  'Georgia', // ← Add new font
  'Courier New' // ← Add new font
];
```

#### Custom Font Family (self-hosted)

```jsx
// In index.css - Add at top
@font-face {
  font-family: 'MyCustomFont';
  src: url('/fonts/my-custom-font.woff2') format('woff2');
}

// Then add to FONTS array
const FONTS = ['MyCustomFont', ...];
```

---

### 4. Modify Button Styling

#### Primary Button

```jsx
// In TabButton component (line ~1260)
// Current:
<button className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
  active 
    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' 
    : 'bg-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-200'
}`}>

// To increase button size:
<button className={`px-6 py-3 rounded-lg text-base font-bold transition-all ${
  active 
    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
    : 'bg-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-200'
}`}>

// To remove gradient (solid color):
<button className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
  active 
    ? 'bg-blue-500 text-white shadow-md' 
    : 'bg-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-200'
}`}>
```

---

### 5. Customize Card Styling

#### Project Card

```jsx
// Current (line ~1740)
<motion.a
  className={`rounded-xl ${props.enable3DBackground ? 'card-bg' : props.theme.card} 
  flex flex-col gap-0 overflow-hidden hover:shadow-2xl transition-all 
  border-2 border-transparent hover:primary-border`}
  whileHover={{ y: -8 }}
>

// To reduce hover effect:
<motion.a
  className={`rounded-xl ${props.enable3DBackground ? 'card-bg' : props.theme.card} 
  flex flex-col gap-0 overflow-hidden hover:shadow-xl transition-all 
  border-2 border-transparent hover:primary-border`}
  whileHover={{ y: -4 }}
>

// To add stronger border:
<motion.a
  className={`rounded-xl ${props.enable3DBackground ? 'card-bg' : props.theme.card} 
  flex flex-col gap-0 overflow-hidden hover:shadow-2xl transition-all 
  border-4 border-gray-200 hover:primary-border`}
  whileHover={{ y: -8 }}
>
```

---

### 6. Adjust Spacing

#### Hero Section Spacing

```jsx
// Current (line ~1570)
<motion.section {...motionProps(0)} className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">

// More compact:
<motion.section {...motionProps(0)} className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">

// More spacious:
<motion.section {...motionProps(0)} className="flex flex-col md:flex-row items-center gap-16 text-center md:text-left">
```

#### Section Gaps

```jsx
// In PortfolioSection (line ~1670)
className="flex flex-col gap-8" // Current gap

// Smaller gap:
className="flex flex-col gap-6"

// Larger gap:
className="flex flex-col gap-10"
```

---

### 7. Change Animation Speeds

#### Hero Text Animation

```jsx
// Current (line ~1600)
transition={{ delay: 0.1 }}

// Faster:
transition={{ delay: 0 }}

// Slower:
transition={{ delay: 0.3 }}
```

#### Hover Animation Duration

```jsx
// In motion.div or motion.button
// Current:
transition={{ duration: 0.3 }}

// Faster (snappier):
transition={{ duration: 0.2 }}

// Slower (smoother):
transition={{ duration: 0.5 }}
```

---

### 8. Customize Hero Section

#### Change Profile Image Size

```jsx
// Current (line ~1600)
<img className="w-48 h-48 md:w-48 md:h-48 rounded-full ..."

// Larger on desktop:
<img className="w-40 h-40 md:w-64 md:h-64 rounded-full ..."

// Smaller:
<img className="w-32 h-32 md:w-40 md:h-40 rounded-full ..."
```

#### Change Hero Title Size

```jsx
// Current (line ~1605)
className="text-6xl md:text-6xl font-black"

// Larger:
className="text-7xl md:text-8xl font-black"

// Smaller:
className="text-5xl md:text-6xl font-black"
```

---

### 9. Modify Input Fields

#### Change Input Height

```jsx
// Current (line ~1328)
<input className={`...px-4 py-3 border-2...`}

// Taller input:
<input className={`...px-4 py-4 border-2...`}

// Compact input:
<input className={`...px-3 py-2 border-2...`}
```

#### Change Border Style

```jsx
// Current: 2px solid border
border-2 border-gray-200

// Thicker border:
border-4 border-gray-200

// Thinner border:
border border-gray-300

// Dashed border:
border-2 border-dashed border-gray-300
```

---

### 10. Customize Section Headers

#### Change Title Styling

```jsx
// Current (line ~1668)
<h2 className="text-4xl md:text-5xl font-black primary-text mb-2">{title}</h2>

// Smaller title:
<h2 className="text-3xl md:text-4xl font-bold primary-text mb-2">{title}</h2>

// Larger title:
<h2 className="text-5xl md:text-6xl font-black primary-text mb-2">{title}</h2>
```

#### Change Underline Bar

```jsx
// Current styling:
<div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>

// Thicker bar:
<div className="h-2 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>

// Longer bar:
<div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>

// Solid color bar:
<div className="h-1 w-24 bg-blue-500 rounded-full"></div>

// No bar:
{/* Remove the div entirely */}
```

---

### 11. Change Border Radius

#### Make Everything More Rounded

```jsx
// Current:
rounded-lg → rounded-xl
rounded-xl → rounded-2xl

// Example:
className="p-6 rounded-xl" // Change to:
className="p-6 rounded-2xl"
```

#### Make Everything Less Rounded

```jsx
// Current:
rounded-xl → rounded-lg
rounded-2xl → rounded-xl

// Example:
className="p-6 rounded-xl" // Change to:
className="p-6 rounded-lg"
```

---

### 12. Adjust Shadows

#### Increase Shadow Intensity

```jsx
// Current:
hover:shadow-lg → hover:shadow-xl
hover:shadow-xl → hover:shadow-2xl

// Example in card:
className="...hover:shadow-xl..." // Change to:
className="...hover:shadow-2xl..."
```

#### Remove Shadows

```jsx
// Current:
shadow-lg → shadow-none
shadow-2xl → shadow-none

// Example:
className="p-6 shadow-lg" // Change to:
className="p-6 shadow-none"
```

---

### 13. Customize Grid Layouts

#### Project Grid Columns

```jsx
// Current (line ~1750)
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

// Three columns on desktop:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Single column:
<div className="grid grid-cols-1 gap-6">

// Full width:
<div className="flex flex-col gap-6">
```

---

### 14. Change Typography Weights

#### Make All Text Bolder

```jsx
// Current:
font-medium → font-semibold
font-semibold → font-bold
font-bold → font-black

// Example:
className="font-bold" // Change to:
className="font-black"
```

#### Make All Text Lighter

```jsx
// Current:
font-semibold → font-medium
font-bold → font-semibold
font-black → font-bold

// Example:
className="font-bold" // Change to:
className="font-semibold"
```

---

### 15. Add Custom CSS Classes

#### In App.css - Add Your Custom Styles

```css
/* Custom button style */
.btn-custom {
  @apply px-4 py-2 rounded-lg font-bold transition-all;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
}

/* Custom card style */
.card-custom {
  @apply p-6 rounded-xl border-2 border-transparent transition-all;
  background: linear-gradient(white, white) padding-box,
              linear-gradient(135deg, #667eea, #764ba2) border-box;
}

.card-custom:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}
```

#### Then use in JSX

```jsx
<button className="btn-custom">Click Me</button>
<div className="card-custom">Content</div>
```

---

### 16. Adjust Icon Sizes

#### Icon Size Mapping

```jsx
// Small icons (16-18px):
size={16} // Labels, badges
size={18} // Tab icons, button icons

// Medium icons (20-24px):
size={20} // Section icons
size={24} // Social media icons

// Large icons (28-32px):
size={28} // Hero section icons
size={32} // Large accents
```

#### Example Change

```jsx
// Current in social icons (line ~1690):
<Icon size={24} className="text-blue-600" />

// Larger:
<Icon size={32} className="text-blue-600" />

// Smaller:
<Icon size={20} className="text-blue-600" />
```

---

### 17. Change Gradient Direction

#### Gradient Directions

```css
from-x-y to-x-y [direction]

from-blue-500 to-purple-500 /* diagonal 135deg */
from-left to-right /* horizontal */
from-top to-bottom /* vertical */
from-top-left to-bottom-right /* diagonal */
```

#### Examples

```jsx
// Current (diagonal):
bg-gradient-to-r from-blue-500 to-purple-500

// Vertical:
bg-gradient-to-b from-blue-500 to-purple-500

// Horizontal:
bg-gradient-to-r from-blue-500 to-purple-500

// Diagonal opposite:
bg-gradient-to-bl from-blue-500 to-purple-500
```

---

### 18. Customize Hover Effects

#### Change Hover Scale

```jsx
// Current:
whileHover={{ scale: 1.05 }}

// More scale:
whileHover={{ scale: 1.10 }}

// Less scale:
whileHover={{ scale: 1.02 }}

// No scale:
whileHover={{ scale: 1 }}
```

#### Change Hover Lift

```jsx
// Current:
whileHover={{ y: -8 }}

// Higher lift:
whileHover={{ y: -12 }}

// Lower lift:
whileHover={{ y: -4 }}

// No lift:
whileHover={{ y: 0 }}
```

---

### 19. Customize Chat AI Settings

#### Enable/Disable AI Assistant

```jsx
// In Chat AI Tab - Toggle Switch
// Enable: Shows floating chat button and AI assistant
// Disable: Hides chat functionality completely
```

#### Change AI Name

```jsx
// In Chat AI Tab - AI Name Input
// Current: "PortoBot"
// Custom: "MyAssistant", "AI Helper", etc.
// This name appears in the chat window header
```

#### Customize AI Intro Message

```jsx
// In Chat AI Tab - AI Intro Message TextArea
// Current: "Halo! Saya asisten AI. Tanyakan apa saja tentang portofolio ini."
// Custom: "Hello! I'm your portfolio assistant. Ask me anything about the projects and experience."
// This is the first message users see when opening the chat
```

#### Change Input Placeholder

```jsx
// In Chat AI Tab - Input Placeholder Input
// Current: "Tanyakan tentang proyek..."
// Custom: "Ask about my skills...", "What would you like to know?"
// This text appears in the input field when it's empty
```

#### AI Behavior Notes

- The AI is trained to only answer questions about your portfolio data
- It will politely decline questions about external topics (weather, news, etc.)
- All responses are in Indonesian by default
- The AI has access to your: name, title, description, experience, projects, skills, and certifications
- Chat history persists during the session but resets on page refresh

---

## Advanced Customization

### Create New Component Variant

```jsx
// Add to existing component library
function CustomCard({ children, variant = 'default' }) {
  const variants = {
    default: 'p-6 rounded-xl border-2 border-gray-200',
    elevated: 'p-6 rounded-xl border-2 border-gray-200 shadow-xl',
    glass: 'p-6 rounded-xl glass-effect',
    gradient: 'p-6 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50'
  };
  
  return (
    <div className={variants[variant]}>
      {children}
    </div>
  );
}

// Usage:
<CustomCard variant="elevated">Content</CustomCard>
```

---

### Add New Animation

```jsx
// In animVariants object (line ~1530)
const animVariants = {
  'fade-in': { ... },
  'slide-up': { ... },
  'none': { ... },
  'bounce-in': { // ← New animation
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { type: 'spring', stiffness: 300 }
  },
  'flip-in': { // ← New animation
    initial: { opacity: 0, rotateX: -90 },
    animate: { opacity: 1, rotateX: 0 },
    transition: { duration: 0.5 }
  }
};
```

---

## Troubleshooting

### Styles Not Applying

1. Check class name spelling
2. Verify Tailwind CSS is loaded
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart dev server (npm run dev)

### Animation Stuttering

1. Reduce number of simultaneous animations
2. Increase duration (0.2s → 0.3s)
3. Use `will-change: transform` sparingly

### Layout Breaking on Mobile

1. Check responsive classes (sm:, md:, lg:)
2. Add max-width to containers
3. Test with DevTools device emulation
4. Verify gap and padding values

---

*Last Updated: November 2025*
*For more help, check DESIGN_SYSTEM.md and VISUAL_STYLE_GUIDE.md*
