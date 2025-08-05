# Color System

Concept provides a comprehensive color system built on Bootstrap 5's color utilities, with additional custom colors and advanced features for creating beautiful, accessible interfaces.

## Color Palette

### Theme Colors

The primary theme colors are used throughout the template:

```scss
// Primary theme colors
$primary:    #5969ff;  // Royal Blue
$secondary:  #6c757d;  // Gray
$success:    #28a745;  // Green
$info:       #17a2b8;  // Cyan
$warning:    #ffc107;  // Amber
$danger:     #dc3545;  // Red
$light:      #f8f9fa;  // Light Gray
$dark:       #343a40;  // Dark Gray
```

<div class="color-palette">
  <div class="color-swatch" style="background: #5969ff;">
    <span>Primary</span>
    <code>#5969ff</code>
  </div>
  <div class="color-swatch" style="background: #6c757d;">
    <span>Secondary</span>
    <code>#6c757d</code>
  </div>
  <div class="color-swatch" style="background: #28a745;">
    <span>Success</span>
    <code>#28a745</code>
  </div>
  <div class="color-swatch" style="background: #17a2b8;">
    <span>Info</span>
    <code>#17a2b8</code>
  </div>
  <div class="color-swatch" style="background: #ffc107;">
    <span>Warning</span>
    <code>#ffc107</code>
  </div>
  <div class="color-swatch" style="background: #dc3545;">
    <span>Danger</span>
    <code>#dc3545</code>
  </div>
</div>

### Extended Colors

Additional colors for more design flexibility:

```scss
// Extended color palette
$indigo:  #6610f2;
$purple:  #6f42c1;
$pink:    #e83e8c;
$red:     #dc3545;
$orange:  #fd7e14;
$yellow:  #ffc107;
$green:   #28a745;
$teal:    #20c997;
$cyan:    #17a2b8;
```

### Gray Scale

Complete grayscale for subtle variations:

```scss
$white:    #ffffff;
$gray-100: #f8f9fa;
$gray-200: #e9ecef;
$gray-300: #dee2e6;
$gray-400: #ced4da;
$gray-500: #adb5bd;
$gray-600: #6c757d;
$gray-700: #495057;
$gray-800: #343a40;
$gray-900: #212529;
$black:    #000000;
```

## Color Utilities

### Text Colors

Apply colors to text using utility classes:

```html
<!-- Theme colors -->
<p class="text-primary">Primary text color</p>
<p class="text-secondary">Secondary text color</p>
<p class="text-success">Success text color</p>
<p class="text-danger">Danger text color</p>
<p class="text-warning">Warning text color</p>
<p class="text-info">Info text color</p>
<p class="text-light bg-dark">Light text color</p>
<p class="text-dark">Dark text color</p>

<!-- Grayscale -->
<p class="text-black">Black text</p>
<p class="text-white bg-dark">White text</p>
<p class="text-black-50">50% opacity black</p>
<p class="text-white-50 bg-dark">50% opacity white</p>

<!-- Body and muted -->
<p class="text-body">Default body text</p>
<p class="text-muted">Muted text color</p>
```

### Background Colors

Apply background colors with optional text color adjustment:

```html
<!-- Basic backgrounds -->
<div class="bg-primary text-white p-3">Primary background</div>
<div class="bg-secondary text-white p-3">Secondary background</div>
<div class="bg-success text-white p-3">Success background</div>
<div class="bg-danger text-white p-3">Danger background</div>
<div class="bg-warning text-dark p-3">Warning background</div>
<div class="bg-info text-white p-3">Info background</div>
<div class="bg-light p-3">Light background</div>
<div class="bg-dark text-white p-3">Dark background</div>

<!-- Gradient backgrounds -->
<div class="bg-gradient-primary text-white p-3">Primary gradient</div>
<div class="bg-gradient-secondary text-white p-3">Secondary gradient</div>

<!-- Subtle backgrounds -->
<div class="bg-primary-subtle p-3">Subtle primary background</div>
<div class="bg-success-subtle p-3">Subtle success background</div>
```

### Border Colors

Style borders with color utilities:

```html
<!-- Border colors -->
<div class="border border-primary p-3">Primary border</div>
<div class="border border-success p-3">Success border</div>
<div class="border border-danger p-3">Danger border</div>

<!-- Individual border sides -->
<div class="border-top border-primary p-3">Top border only</div>
<div class="border-end border-success p-3">Right border only</div>
<div class="border-bottom border-warning p-3">Bottom border only</div>
<div class="border-start border-info p-3">Left border only</div>

<!-- Border width variations -->
<div class="border border-3 border-primary p-3">Thick primary border</div>
<div class="border border-5 border-danger p-3">Extra thick danger border</div>
```

## Custom Color Classes

### Brand Colors

Define and use custom brand colors:

```scss
// Define custom colors
$brand-colors: (
  "brand-primary": #1a73e8,
  "brand-secondary": #ea4335,
  "brand-accent": #34a853,
  "brand-neutral": #5f6368
);

// Generate utilities
@each $name, $color in $brand-colors {
  .text-#{$name} {
    color: $color !important;
  }
  
  .bg-#{$name} {
    background-color: $color !important;
  }
  
  .border-#{$name} {
    border-color: $color !important;
  }
}
```

### Social Media Colors

Pre-defined social media brand colors:

```scss
// Social media colors
$social-colors: (
  "facebook": #1877f2,
  "twitter": #1da1f2,
  "instagram": #e4405f,
  "linkedin": #0077b5,
  "youtube": #ff0000,
  "github": #181717,
  "whatsapp": #25d366,
  "telegram": #0088cc,
  "discord": #5865f2,
  "slack": #4a154b
);

// Usage
.btn-facebook {
  background-color: map-get($social-colors, "facebook");
  color: white;
  
  &:hover {
    background-color: darken(map-get($social-colors, "facebook"), 10%);
  }
}
```

## Color Functions

### Sass Color Functions

Use Sass functions to manipulate colors:

```scss
// Lighten and darken
.custom-button {
  background-color: $primary;
  
  &:hover {
    background-color: lighten($primary, 10%);
  }
  
  &:active {
    background-color: darken($primary, 10%);
  }
}

// Adjust hue, saturation, lightness
.color-variations {
  .hue-shift {
    background-color: adjust-hue($primary, 45deg);
  }
  
  .saturated {
    background-color: saturate($primary, 20%);
  }
  
  .desaturated {
    background-color: desaturate($primary, 20%);
  }
}

// Mix colors
.mixed-color {
  background-color: mix($primary, $secondary, 50%);
}

// Transparency
.transparent-overlay {
  background-color: rgba($primary, 0.8);
  // or
  background-color: transparentize($primary, 0.2);
}
```

### Custom Color Functions

Create reusable color functions:

```scss
// Tint function (mix with white)
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

// Shade function (mix with black)
@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}

// Usage
.tinted-primary {
  background-color: tint($primary, 20%);
}

.shaded-primary {
  background-color: shade($primary, 20%);
}

// Color contrast function
@function color-contrast($color) {
  $r: red($color);
  $g: green($color);
  $b: blue($color);
  
  $yiq: (($r * 299) + ($g * 587) + ($b * 114)) / 1000;
  
  @if ($yiq >= 150) {
    @return $dark;
  } @else {
    @return $white;
  }
}

// Auto text color based on background
.dynamic-text {
  background-color: $primary;
  color: color-contrast($primary);
}
```

## Color Schemes

### Monochromatic Scheme

Using variations of a single color:

```scss
// Generate monochromatic palette
$mono-base: $primary;
$mono-colors: (
  "mono-100": tint($mono-base, 80%),
  "mono-200": tint($mono-base, 60%),
  "mono-300": tint($mono-base, 40%),
  "mono-400": tint($mono-base, 20%),
  "mono-500": $mono-base,
  "mono-600": shade($mono-base, 20%),
  "mono-700": shade($mono-base, 40%),
  "mono-800": shade($mono-base, 60%),
  "mono-900": shade($mono-base, 80%)
);
```

### Complementary Scheme

Using opposite colors on the color wheel:

```scss
// Complementary colors
$base-color: $primary;
$complement: adjust-hue($base-color, 180deg);

.complementary-scheme {
  .primary-element {
    background-color: $base-color;
  }
  
  .accent-element {
    background-color: $complement;
  }
}
```

### Triadic Scheme

Three evenly spaced colors:

```scss
// Triadic color scheme
$triadic-1: $primary;
$triadic-2: adjust-hue($primary, 120deg);
$triadic-3: adjust-hue($primary, 240deg);

.triadic-scheme {
  .color-1 { background-color: $triadic-1; }
  .color-2 { background-color: $triadic-2; }
  .color-3 { background-color: $triadic-3; }
}
```

## Gradients

### Linear Gradients

```scss
// Gradient utilities
.bg-gradient-primary-secondary {
  background: linear-gradient(135deg, $primary 0%, $secondary 100%);
}

.bg-gradient-rainbow {
  background: linear-gradient(
    45deg,
    #ff0000 0%,
    #ff7f00 14.28%,
    #ffff00 28.56%,
    #00ff00 42.84%,
    #0000ff 57.12%,
    #4b0082 71.4%,
    #9400d3 85.68%,
    #ff0000 100%
  );
}

// Gradient text
.gradient-text {
  background: linear-gradient(135deg, $primary 0%, $info 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Radial Gradients

```scss
// Radial gradient examples
.bg-radial-gradient {
  background: radial-gradient(circle at center, $primary 0%, $dark 100%);
}

.bg-radial-light {
  background: radial-gradient(
    ellipse at top,
    rgba($primary, 0.1) 0%,
    transparent 70%
  );
}
```

## Accessibility

### Color Contrast

Ensure sufficient contrast for accessibility:

```scss
// WCAG AA compliant contrasts
$accessible-pairs: (
  ($white, $gray-800),    // 12.63:1
  ($white, $primary),     // 4.5:1
  ($white, $danger),      // 4.52:1
  ($dark, $warning),      // 8.59:1
  ($white, $success),     // 5.15:1
);

// Contrast checking mixin
@mixin check-contrast($bg, $text) {
  background-color: $bg;
  color: $text;
  
  // Add warning for development
  @if (contrast-ratio($bg, $text) < 4.5) {
    @warn "Low contrast ratio between #{$bg} and #{$text}";
  }
}
```

### Color Blind Friendly

Colors that work for color blind users:

```scss
// Color blind friendly palette
$cb-friendly: (
  "blue": #0173B2,
  "orange": #F0A041,
  "green": #009E73,
  "yellow": #FED439,
  "purple": #CC79A7,
  "red": #D55E00,
  "gray": #999999
);

// Safe color combinations
.cb-safe-primary {
  background-color: map-get($cb-friendly, "blue");
  color: white;
}

.cb-safe-secondary {
  background-color: map-get($cb-friendly, "orange");
  color: black;
}
```

## Color Variables in CSS

### CSS Custom Properties

Use CSS variables for dynamic theming:

```scss
// Define CSS variables
:root {
  --color-primary: #{$primary};
  --color-secondary: #{$secondary};
  --color-success: #{$success};
  --color-danger: #{$danger};
  --color-warning: #{$warning};
  --color-info: #{$info};
  
  // Semantic colors
  --color-text: #{$gray-900};
  --color-text-muted: #{$gray-600};
  --color-background: #{$white};
  --color-surface: #{$gray-100};
  --color-border: #{$gray-300};
}

// Dark mode
[data-theme="dark"] {
  --color-text: #{$gray-100};
  --color-text-muted: #{$gray-400};
  --color-background: #{$gray-900};
  --color-surface: #{$gray-800};
  --color-border: #{$gray-700};
}

// Usage
.component {
  color: var(--color-text);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
}
```

## Color Tools

### Color Picker Component

```html
<!-- Color picker input -->
<div class="color-picker-group">
  <label for="theme-color">Choose Theme Color</label>
  <div class="input-group">
    <input type="color" 
           class="form-control form-control-color" 
           id="theme-color" 
           value="#5969ff">
    <input type="text" 
           class="form-control" 
           value="#5969ff" 
           pattern="^#[0-9A-F]{6}$">
  </div>
</div>

<!-- Color palette selector -->
<div class="color-palette-selector">
  <div class="color-option" 
       data-color="#5969ff" 
       style="background-color: #5969ff;"></div>
  <div class="color-option" 
       data-color="#28a745" 
       style="background-color: #28a745;"></div>
  <div class="color-option" 
       data-color="#dc3545" 
       style="background-color: #dc3545;"></div>
</div>
```

### JavaScript Color Utilities

```javascript
// Color manipulation utilities
class ColorUtils {
  // Convert hex to RGB
  static hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  // Convert RGB to hex
  static rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b)
      .toString(16).slice(1);
  }
  
  // Calculate luminance
  static getLuminance(hex) {
    const rgb = this.hexToRgb(hex);
    const a = [rgb.r, rgb.g, rgb.b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  
  // Get contrast ratio
  static getContrastRatio(color1, color2) {
    const lum1 = this.getLuminance(color1);
    const lum2 = this.getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }
  
  // Generate color palette
  static generatePalette(baseColor, count = 9) {
    const palette = [];
    const rgb = this.hexToRgb(baseColor);
    
    for (let i = 0; i < count; i++) {
      const factor = i / (count - 1);
      const r = Math.round(rgb.r + (255 - rgb.r) * factor);
      const g = Math.round(rgb.g + (255 - rgb.g) * factor);
      const b = Math.round(rgb.b + (255 - rgb.b) * factor);
      palette.push(this.rgbToHex(r, g, b));
    }
    
    return palette;
  }
}
```

## Best Practices

### DO:
- ✅ Use semantic color names (primary, success, danger)
- ✅ Maintain consistent color usage across the app
- ✅ Test color combinations for accessibility
- ✅ Use color functions for variations
- ✅ Document custom color choices
- ✅ Consider color blind users

### DON'T:
- ❌ Use colors only to convey information
- ❌ Create low contrast combinations
- ❌ Mix too many colors (stick to 3-5 main colors)
- ❌ Use pure black (#000) for text
- ❌ Ignore dark mode compatibility
- ❌ Hardcode color values

## Color Resources

### Tools
- [Adobe Color](https://color.adobe.com) - Color scheme generator
- [Coolors](https://coolors.co) - Color palette generator
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - WCAG compliance
- [Colorblindly](https://chrome.google.com/webstore/detail/colorblindly/) - Chrome extension

### Guidelines
- [WCAG Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Material Design Color](https://material.io/design/color/)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/color)

## Next Steps

Continue customizing Concept:

1. **[Component Styling](components.md)** - Apply colors to components
2. **[Theming Guide](theming.md)** - Create color themes
3. **[Dark Mode](../advanced/dark-mode.md)** - Implement dark mode
4. **[Accessibility](../advanced/accessibility.md)** - Color accessibility

---

Colors bring life to your interface. Use them wisely to create beautiful, accessible, and meaningful experiences! 🎨