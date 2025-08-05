# Sass Variables Reference

This comprehensive guide documents all Sass variables available in Concept. These variables control every aspect of the template's appearance and behavior.

## Variable Organization

Variables are organized into logical groups:

```scss
src/scss/
├── _variables.scss           # Main variables file
├── bootstrap/
│   └── _variables.scss      # Bootstrap overrides
├── custom/
│   ├── _colors.scss         # Color definitions
│   ├── _typography.scss     # Font settings
│   ├── _spacing.scss        # Spacing system
│   └── _components.scss     # Component variables
└── themes/
    └── _theme-variables.scss # Theme-specific vars
```

## Color Variables

### Primary Colors

```scss
// Brand colors
$primary:         #5969ff !default;
$secondary:       #6c757d !default;
$success:         #28a745 !default;
$info:            #17a2b8 !default;
$warning:         #ffc107 !default;
$danger:          #dc3545 !default;
$light:           #f8f9fa !default;
$dark:            #343a40 !default;

// Extended palette
$indigo:          #6610f2 !default;
$purple:          #6f42c1 !default;
$pink:            #e83e8c !default;
$red:             #dc3545 !default;
$orange:          #fd7e14 !default;
$yellow:          #ffc107 !default;
$green:           #28a745 !default;
$teal:            #20c997 !default;
$cyan:            #17a2b8 !default;
```

### Grayscale

```scss
// Gray scale
$white:           #ffffff !default;
$gray-100:        #f8f9fa !default;
$gray-200:        #e9ecef !default;
$gray-300:        #dee2e6 !default;
$gray-400:        #ced4da !default;
$gray-500:        #adb5bd !default;
$gray-600:        #6c757d !default;
$gray-700:        #495057 !default;
$gray-800:        #343a40 !default;
$gray-900:        #212529 !default;
$black:           #000000 !default;

// Semantic grays
$gray-light:      $gray-100 !default;
$gray:            $gray-600 !default;
$gray-dark:       $gray-800 !default;
```

### Theme Colors Map

```scss
// Theme colors for generating utilities
$theme-colors: (
  "primary":      $primary,
  "secondary":    $secondary,
  "success":      $success,
  "info":         $info,
  "warning":      $warning,
  "danger":       $danger,
  "light":        $light,
  "dark":         $dark,
  "white":        $white,
  "gray":         $gray-600,
  "gray-dark":    $gray-800
) !default;

// Additional colors
$extra-colors: (
  "indigo":       $indigo,
  "purple":       $purple,
  "pink":         $pink,
  "orange":       $orange,
  "teal":         $teal,
  "cyan":         $cyan
) !default;
```

## Typography Variables

### Font Families

```scss
// System font stack
$font-family-sans-serif: 
  -apple-system, 
  BlinkMacSystemFont, 
  "Segoe UI", 
  Roboto, 
  "Helvetica Neue", 
  Arial, 
  sans-serif !default;

// Custom fonts
$font-family-base:      'Inter', $font-family-sans-serif !default;
$font-family-headings:  'Poppins', $font-family-sans-serif !default;
$font-family-monospace: 
  'SFMono-Regular', 
  Menlo, 
  Monaco, 
  Consolas, 
  "Liberation Mono", 
  "Courier New", 
  monospace !default;

// Font assignments
$headings-font-family:  $font-family-headings !default;
$display-font-family:   $font-family-headings !default;
```

### Font Sizes

```scss
// Base size
$font-size-base:    1rem !default;  // 16px
$font-size-root:    16px !default;

// Size scale
$font-size-xs:      $font-size-base * 0.75 !default;   // 12px
$font-size-sm:      $font-size-base * 0.875 !default;  // 14px
$font-size-lg:      $font-size-base * 1.125 !default;  // 18px
$font-size-xl:      $font-size-base * 1.25 !default;   // 20px

// Heading sizes
$h1-font-size:      $font-size-base * 2.5 !default;    // 40px
$h2-font-size:      $font-size-base * 2 !default;      // 32px
$h3-font-size:      $font-size-base * 1.75 !default;   // 28px
$h4-font-size:      $font-size-base * 1.5 !default;    // 24px
$h5-font-size:      $font-size-base * 1.25 !default;   // 20px
$h6-font-size:      $font-size-base !default;          // 16px

// Display sizes
$display1-size:     6rem !default;
$display2-size:     5.5rem !default;
$display3-size:     4.5rem !default;
$display4-size:     3.5rem !default;
```

### Font Weights

```scss
// Weight scale
$font-weight-lighter:   lighter !default;
$font-weight-light:     300 !default;
$font-weight-normal:    400 !default;
$font-weight-medium:    500 !default;
$font-weight-semibold:  600 !default;
$font-weight-bold:      700 !default;
$font-weight-bolder:    bolder !default;

// Component weights
$font-weight-base:      $font-weight-normal !default;
$headings-font-weight:  $font-weight-semibold !default;
$lead-font-weight:      $font-weight-light !default;
$small-font-weight:     $font-weight-normal !default;
```

### Line Heights

```scss
// Line height scale
$line-height-base:      1.5 !default;
$line-height-sm:        1.25 !default;
$line-height-lg:        2 !default;

// Heading line heights
$headings-line-height:  1.2 !default;
$display-line-height:   1.2 !default;
```

## Spacing Variables

### Spacer System

```scss
// Base spacer
$spacer: 1rem !default;

// Spacer scale
$spacers: (
  0: 0,
  1: $spacer * 0.25,    // 4px
  2: $spacer * 0.5,     // 8px
  3: $spacer,           // 16px
  4: $spacer * 1.5,     // 24px
  5: $spacer * 3,       // 48px
  6: $spacer * 4,       // 64px
  7: $spacer * 5,       // 80px
  8: $spacer * 6        // 96px
) !default;

// Component spacing
$paragraph-margin-bottom:   1rem !default;
$headings-margin-bottom:    $spacer * 0.5 !default;
$label-margin-bottom:       0.5rem !default;
```

### Grid Variables

```scss
// Grid breakpoints
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
) !default;

// Container widths
$container-max-widths: (
  sm: 540px,
  md: 720px,
  lg: 960px,
  xl: 1140px,
  xxl: 1320px
) !default;

// Grid settings
$grid-columns:      12 !default;
$grid-gutter-width: 1.5rem !default;
$grid-row-columns:  6 !default;
```

## Component Variables

### Borders

```scss
// Border widths
$border-width:      1px !default;
$border-widths: (
  0: 0,
  1: 1px,
  2: 2px,
  3: 3px,
  4: 4px,
  5: 5px
) !default;

// Border colors
$border-color:              $gray-300 !default;
$border-color-translucent:  rgba($black, .175) !default;

// Border radius
$border-radius:             0.375rem !default;
$border-radius-sm:          0.25rem !default;
$border-radius-lg:          0.5rem !default;
$border-radius-xl:          1rem !default;
$border-radius-pill:        50rem !default;
```

### Shadows

```scss
// Box shadows
$box-shadow:          0 0.125rem 0.25rem rgba($black, 0.075) !default;
$box-shadow-sm:       0 0.0625rem 0.125rem rgba($black, 0.075) !default;
$box-shadow-lg:       0 0.5rem 1rem rgba($black, 0.15) !default;
$box-shadow-xl:       0 1rem 3rem rgba($black, 0.175) !default;
$box-shadow-inset:    inset 0 1px 2px rgba($black, 0.075) !default;

// Text shadows
$text-shadow:         0 0.0625rem 0.125rem rgba($black, 0.075) !default;
```

### Z-index

```scss
// Z-index scale
$zindex-dropdown:       1000 !default;
$zindex-sticky:         1020 !default;
$zindex-fixed:          1030 !default;
$zindex-modal-backdrop: 1040 !default;
$zindex-offcanvas:      1050 !default;
$zindex-modal:          1060 !default;
$zindex-popover:        1070 !default;
$zindex-tooltip:        1080 !default;
$zindex-toast:          1090 !default;
```

## Layout Variables

### Sidebar

```scss
// Sidebar dimensions
$sidebar-width:           260px !default;
$sidebar-collapsed-width: 70px !default;
$sidebar-mini-width:      200px !default;

// Sidebar colors
$sidebar-bg:              $white !default;
$sidebar-dark-bg:         $gray-900 !default;
$sidebar-border-color:    $border-color !default;

// Sidebar typography
$sidebar-link-color:      $gray-700 !default;
$sidebar-link-hover:      $primary !default;
$sidebar-link-active:     $primary !default;
$sidebar-text-color:      $gray-600 !default;

// Sidebar spacing
$sidebar-padding-x:       1rem !default;
$sidebar-padding-y:       1.5rem !default;
$sidebar-item-padding:    0.625rem 1rem !default;
```

### Header

```scss
// Header dimensions
$header-height:           70px !default;
$header-padding-y:        1rem !default;
$header-padding-x:        1.5rem !default;

// Header colors
$header-bg:               $white !default;
$header-border-color:     $border-color !default;
$header-link-color:       $gray-700 !default;
$header-link-hover:       $primary !default;

// Header shadow
$header-box-shadow:       $box-shadow-sm !default;
```

### Footer

```scss
// Footer settings
$footer-height:           60px !default;
$footer-padding-y:        1rem !default;
$footer-padding-x:        1.5rem !default;
$footer-bg:               $gray-100 !default;
$footer-color:            $gray-600 !default;
$footer-border-color:     $border-color !default;
```

## Form Variables

### Input Settings

```scss
// Input dimensions
$input-height:              2.75rem !default;
$input-height-sm:           2.125rem !default;
$input-height-lg:           3.375rem !default;
$input-line-height:         $line-height-base !default;

// Input padding
$input-padding-y:           0.5rem !default;
$input-padding-x:           0.75rem !default;
$input-padding-y-sm:        0.25rem !default;
$input-padding-x-sm:        0.5rem !default;
$input-padding-y-lg:        0.75rem !default;
$input-padding-x-lg:        1rem !default;

// Input appearance
$input-font-family:         $font-family-base !default;
$input-font-size:           $font-size-base !default;
$input-font-weight:         $font-weight-base !default;
$input-bg:                  $white !default;
$input-disabled-bg:         $gray-200 !default;
$input-disabled-color:      $gray-600 !default;

// Input borders
$input-border-width:        $border-width !default;
$input-border-color:        $gray-400 !default;
$input-border-radius:       $border-radius !default;

// Input states
$input-focus-bg:            $input-bg !default;
$input-focus-color:         $input-color !default;
$input-focus-border-color:  lighten($primary, 25%) !default;
$input-focus-box-shadow:    0 0 0 0.2rem rgba($primary, 0.25) !default;
```

### Form Validation

```scss
// Validation colors
$form-valid-color:        $success !default;
$form-valid-border-color: $success !default;
$form-invalid-color:      $danger !default;
$form-invalid-border-color: $danger !default;

// Feedback styling
$form-feedback-font-size: $font-size-sm !default;
$form-feedback-valid-color: $form-valid-color !default;
$form-feedback-invalid-color: $form-invalid-color !default;
$form-feedback-icon-valid: url("data:image/svg+xml,<svg>...</svg>") !default;
$form-feedback-icon-invalid: url("data:image/svg+xml,<svg>...</svg>") !default;
```

## Button Variables

### Button Base

```scss
// Button padding
$btn-padding-y:         0.5rem !default;
$btn-padding-x:         1rem !default;
$btn-padding-y-sm:      0.25rem !default;
$btn-padding-x-sm:      0.5rem !default;
$btn-padding-y-lg:      0.75rem !default;
$btn-padding-x-lg:      1.5rem !default;

// Button typography
$btn-font-family:       $font-family-base !default;
$btn-font-size:         $font-size-base !default;
$btn-font-size-sm:      $font-size-sm !default;
$btn-font-size-lg:      $font-size-lg !default;
$btn-font-weight:       $font-weight-normal !default;
$btn-line-height:       $line-height-base !default;

// Button appearance
$btn-border-width:      $border-width !default;
$btn-border-radius:     $border-radius !default;
$btn-border-radius-sm:  $border-radius-sm !default;
$btn-border-radius-lg:  $border-radius-lg !default;
$btn-box-shadow:        $box-shadow-sm !default;
$btn-focus-box-shadow:  0 0 0 0.2rem !default;

// Button states
$btn-disabled-opacity:  0.65 !default;
$btn-transition:        color 0.15s ease-in-out, 
                       background-color 0.15s ease-in-out, 
                       border-color 0.15s ease-in-out, 
                       box-shadow 0.15s ease-in-out !default;
```

## Card Variables

```scss
// Card structure
$card-spacer-y:             1.25rem !default;
$card-spacer-x:             1.25rem !default;
$card-padding-y:            0 !default;
$card-padding-x:            0 !default;
$card-bg:                   $white !default;
$card-border-width:         $border-width !default;
$card-border-color:         rgba($black, 0.125) !default;
$card-border-radius:        $border-radius !default;
$card-inner-border-radius:  subtract($card-border-radius, $card-border-width) !default;

// Card variations
$card-cap-padding-y:        0.75rem !default;
$card-cap-padding-x:        1.25rem !default;
$card-cap-bg:               rgba($black, 0.03) !default;
$card-cap-color:            null !default;
$card-height:               null !default;
$card-color:                null !default;
$card-bg:                   $white !default;
$card-img-overlay-padding:  1.25rem !default;
$card-box-shadow:           $box-shadow !default;
```

## Table Variables

```scss
// Table structure
$table-cell-padding-y:      0.75rem !default;
$table-cell-padding-x:      0.75rem !default;
$table-cell-padding-y-sm:   0.3rem !default;
$table-cell-padding-x-sm:   0.3rem !default;

// Table colors
$table-bg:                  transparent !default;
$table-accent-bg:           rgba($black, 0.02) !default;
$table-hover-bg:            rgba($black, 0.03) !default;
$table-active-bg:           rgba($black, 0.04) !default;
$table-border-color:        $border-color !default;

// Table variants
$table-dark-bg:             $gray-900 !default;
$table-dark-accent-bg:      rgba($white, 0.05) !default;
$table-dark-hover-bg:       rgba($white, 0.075) !default;
$table-dark-border-color:   lighten($gray-900, 5%) !default;
$table-dark-color:          $white !default;

// Striped tables
$table-striped-bg-factor:   0.02 !default;
$table-striped-bg:          rgba($black, $table-striped-bg-factor) !default;
$table-striped-order:       odd !default;

// Table state colors
$table-bg-scale:            -80% !default;
```

## Animation Variables

```scss
// Transitions
$transition-base:           all 0.2s ease-in-out !default;
$transition-fade:           opacity 0.15s linear !default;
$transition-collapse:       height 0.35s ease !default;
$transition-collapse-width: width 0.35s ease !default;

// Animation durations
$animation-duration-base:   1s !default;
$animation-duration-fast:   0.5s !default;
$animation-duration-slow:   2s !default;

// Easing functions
$ease-in-out:              cubic-bezier(0.4, 0, 0.2, 1) !default;
$ease-out:                 cubic-bezier(0.0, 0, 0.2, 1) !default;
$ease-in:                  cubic-bezier(0.4, 0, 1, 1) !default;
$ease-bounce:              cubic-bezier(0.68, -0.55, 0.265, 1.55) !default;
```

## Utility Variables

### Spacing Utilities

```scss
// Enable responsive utilities
$enable-responsive-spacing: true !default;

// Negative margin utilities
$enable-negative-margins:   true !default;

// Print utilities
$enable-print-styles:       true !default;
```

### Color Utilities

```scss
// Color contrast settings
$min-contrast-ratio:        4.5 !default;
$color-contrast-dark:       $black !default;
$color-contrast-light:      $white !default;

// Link colors
$link-color:                $primary !default;
$link-decoration:           underline !default;
$link-shade-percentage:     20% !default;
$link-hover-color:          shift-color($link-color, $link-shade-percentage) !default;
$link-hover-decoration:     null !default;
```

## Using Variables

### Basic Usage

```scss
// In your custom styles
.custom-component {
  padding: $spacer;
  border-radius: $border-radius;
  background-color: $primary;
  color: $white;
}
```

### With Sass Functions

```scss
// Using color functions
.custom-button {
  background-color: $primary;
  
  &:hover {
    background-color: darken($primary, 10%);
  }
  
  &:active {
    background-color: darken($primary, 15%);
  }
}

// Using spacing functions
.custom-spacing {
  margin: map-get($spacers, 3);
  padding: calc(#{$spacer} * 2);
}
```

### Creating Custom Variables

```scss
// Define your own variables
$custom-header-height: 80px;
$custom-sidebar-width: 280px;
$custom-primary-gradient: linear-gradient(135deg, $primary 0%, darken($primary, 10%) 100%);

// Use them in your styles
.custom-layout {
  --header-height: #{$custom-header-height};
  --sidebar-width: #{$custom-sidebar-width};
  
  .header {
    height: var(--header-height);
  }
  
  .sidebar {
    width: var(--sidebar-width);
  }
}
```

## Best Practices

### Variable Naming

```scss
// DO: Use descriptive, hierarchical names
$card-header-padding-y: 0.75rem;
$card-header-padding-x: 1rem;
$card-header-bg: $gray-100;

// DON'T: Use generic names
$padding: 0.75rem;
$bg: $gray-100;
```

### Default Values

```scss
// Always use !default for overrideable variables
$custom-primary: #007bff !default;
$custom-border-radius: 0.25rem !default;

// This allows users to override before importing
$custom-primary: #28a745;
@import "your-framework";
```

### Variable Scoping

```scss
// Global variables at root
$global-font-size: 16px;

// Component-specific with prefix
$btn-padding-y: 0.5rem;
$btn-padding-x: 1rem;

// Local variables within mixins/functions
@mixin custom-mixin() {
  $local-spacing: $spacer * 2;
  padding: $local-spacing;
}
```

## Next Steps

Learn more about customization:

1. **[Color System](colors.md)** - Deep dive into color utilities
2. **[Theming Guide](theming.md)** - Create custom themes
3. **[Component Customization](components.md)** - Override components
4. **[Custom Builds](../advanced/custom-builds.md)** - Optimize variables

---

Master these variables to unlock the full customization potential of Concept! 🎨