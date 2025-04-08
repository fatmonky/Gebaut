// Bauhaus-inspired color palette
export const colors = {
  primary: {
    yellow: '#FFD700', // High Priority
    red: '#FF0000',    // Medium Priority
    blue: '#0000FF',   // Low Priority
  },
  neutral: {
    black: '#000000',
    white: '#FFFFFF',
    gray: '#808080',
  },
};

// Typography
export const typography = {
  fontFamily: {
    primary: 'Inter, system-ui, sans-serif', // Modern geometric sans-serif
  },
  fontSize: {
    heading: '24px',
    body: '16px',
    small: '14px',
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

// Spacing (8px grid system)
export const spacing = {
  unit: 8,
  get: (multiplier: number) => `${multiplier * 8}px`,
};

// Layout
export const layout = {
  maxWidth: '1200px',
  containerPadding: spacing.get(2), // 16px
  borderRadius: '4px',
};

// Priority shapes
export const priorityShapes = {
  high: '△',    // Yellow Triangle
  medium: '□',  // Red Square
  low: '○',     // Blue Circle
};

// Animation
export const animation = {
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.4s',
  },
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
}; 