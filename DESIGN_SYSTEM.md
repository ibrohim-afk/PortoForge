# 🎨 PortoForge Design System & Guidelines

## Color Palette

### Primary Colors

- **Blue**: `#3b82f6` (Default Primary)
- **Purple**: `#a855f7` (Accent)
- **Pink**: `#f9a8d4` (Highlight)

### Neutral Colors

- **White**: `#ffffff`
- **Gray 50**: `#f9fafb` (Very Light)
- **Gray 100**: `#f3f4f6` (Light Background)
- **Gray 200**: `#e5e7eb` (Borders)
- **Gray 600**: `#4b5563` (Medium)
- **Gray 800**: `#1f2937` (Dark)
- **Gray 900**: `#111827` (Very Dark)

### Gradient Combinations

```
Primary Gradient: from-blue-500 to-purple-500
Light Gradient: from-blue-50 to-purple-50
Dark Gradient: from-gray-900 to-gray-800
```

---

## Typography System

### Font Families

- **Default**: `Inter` (modern, clean)
- **Headings**: Montserrat, Poppins (modern, bold)
- **Code**: Source Code Pro (monospace)

### Font Sizes & Weights

```
Hero Title: text-6xl, font-black (font-weight: 900)
Section Title: text-5xl, font-black
Heading 1: text-4xl, font-bold
Heading 2: text-2xl, font-bold
Heading 3: text-xl, font-bold
Body: text-base/lg, font-regular
Label: text-sm, font-semibold
Caption: text-xs, font-medium
```

### Line Heights

- Headings: 1.2-1.3 (tight)
- Body Text: 1.6-1.8 (readable)
- Labels: 1.5 (compact)

---

## Spacing System

### Base Unit: 0.5rem (8px)

### Common Spacing Values

```
xs: 0.5rem (4px)
sm: 1rem (8px)
md: 1.5rem (12px)
lg: 2rem (16px)
xl: 2.5rem (20px)
2xl: 3rem (24px)
3xl: 4rem (32px)
4xl: 6rem (48px)
```

### Component Spacing

- **Padding**: px-4 py-3 (inputs), px-6 py-4 (cards)
- **Gaps**: gap-4 (dense), gap-6 (normal), gap-8 (spacious)
- **Margins**: mt-4, mb-4 (default section spacing)

---

## Shadow System

### Shadow Levels

```css
/* Subtle */
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

/* Soft */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 
            0 2px 6px rgba(0, 0, 0, 0.04);

/* Medium */
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12), 
            0 8px 24px rgba(0, 0, 0, 0.08);

/* Large */
box-shadow: 0 10px 28px rgba(0, 0, 0, 0.15), 
            0 20px 48px rgba(0, 0, 0, 0.1);

/* Extra Large */
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
```

### Usage

- Buttons: medium shadow, increased on hover
- Cards: soft shadow, large on hover
- Modals: extra-large shadow
- Subtle elements: no shadow by default

---

## Component Styling Guide

### Buttons

```jsx
// Primary Button
<button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition-all">
  Action
</button>

// Secondary Button
<button className="px-6 py-3 bg-blue-50 text-blue-600 font-bold rounded-lg hover:bg-blue-100">
  Secondary
</button>
```

### Input Fields

```jsx
<input 
  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
  placeholder="Enter text..."
/>
```

### Cards

```jsx
<div className="p-6 rounded-xl bg-white border-2 border-transparent hover:primary-border hover:shadow-lg transition-all">
  {/* Card content */}
</div>
```

### Hover Effects

```css
/* Lift Effect */
transform: translateY(-8px);
transition: all 0.3s ease;

/* Scale Effect */
transform: scale(1.05);
transition: all 0.3s ease;

/* Glow Effect */
box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
```

---

## Animation Timing

### Durations

```
Fast: 0.2s (micro-interactions)
Normal: 0.3s (standard interactions)
Slow: 0.5s (page transitions)
Leisurely: 0.8s (entrance animations)
```

### Easing Functions

```
ease: cubic-bezier(0.25, 0.46, 0.45, 0.94)
ease-in: cubic-bezier(0.42, 0, 1, 1)
ease-out: cubic-bezier(0, 0, 0.58, 1)
ease-in-out: cubic-bezier(0.42, 0, 0.58, 1)
spring: cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Common Animations

```jsx
// Fade In
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ duration: 0.3 }}

// Slide Up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

// Scale Up
initial={{ scale: 0.95 }}
animate={{ scale: 1 }}
transition={{ duration: 0.3 }}

// Hover Lift
whileHover={{ y: -8 }}
whileTap={{ scale: 0.98 }}
```

---

## Border System

### Border Widths

- Subtle: 1px (form borders)
- Standard: 2px (card borders, inputs)
- Bold: 4px (accents, highlights)

### Border Styles

```css
/* Standard Border */
border: 2px solid #e5e7eb;

/* Gradient Border Simulation */
border: 2px solid transparent;
background: linear-gradient(...);

/* Hover Border */
border: 2px solid var(--primary-color);
```

---

## Responsive Design Breakpoints

### Tailwind Breakpoints

- **sm**: 640px (mobile landscape)
- **md**: 768px (tablet)
- **lg**: 1024px (desktop)
- **xl**: 1280px (large desktop)
- **2xl**: 1536px (extra large)

### Mobile-First Approach

```jsx
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
// 1 column on mobile, 2 on tablet, 3 on desktop
```

---

## Glass Morphism Effects

### Implementation

```css
.glass-effect {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Opacity Values

- Very transparent: 0.3-0.5
- Semi-transparent: 0.6-0.8
- Mostly opaque: 0.85-0.95

---

## Accessibility Guidelines

### Color Contrast

- **Normal Text**: 4.5:1 (AA standard)
- **Large Text**: 3:1 (AA standard)
- **UI Components**: 3:1 (AA standard)

### Focus States

```jsx
// Always include visible focus states
focus:ring-2 focus:ring-blue-500 focus:outline-none
```

### Interactive Elements

- Minimum touch target: 44x44px
- Clear hover/active states
- Keyboard navigation support

---

## Best Practices

### Do's ✅

- Use consistent spacing (follow the grid system)
- Apply shadows subtly for depth
- Animate purposefully (not everything)
- Keep gradients to 2-3 colors
- Use animations to guide attention
- Maintain high contrast
- Test on multiple devices

### Don'ts ❌

- Don't use shadows on every element
- Don't mix too many font sizes
- Don't animate transitions longer than needed
- Don't use gradients that reduce readability
- Don't forget about mobile users
- Don't use low contrast text
- Don't add animations that distract

---

## CSS Variables for Theming

### In-App Customization

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #a855f7;
  --border-radius-sm: 0.5rem;
  --border-radius-md: 0.75rem;
  --border-radius-lg: 1.25rem;
  --shadow-soft: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.12);
}
```

---

## Quick Reference

### Rounded Corners

- `rounded-lg`: 8px (standard)
- `rounded-xl`: 12px (cards)
- `rounded-2xl`: 16px (containers)
- `rounded-full`: 9999px (circles)

### Border Radius Usage

- Form inputs: rounded-lg
- Cards: rounded-xl
- Buttons: rounded-lg
- Avatars: rounded-full
- Containers: rounded-2xl

---

## Version History

### v1.0 (Current)

- ✅ Modern gradient design
- ✅ Smooth animations
- ✅ Enhanced typography
- ✅ Better spacing and layout
- ✅ Glass morphism effects
- ✅ Professional shadow system

### Future Enhancements

- Dark mode support
- Custom theme builder
- Animation preferences
- Accessibility audit

---

*Last Updated: November 2025*
