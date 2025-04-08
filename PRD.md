# Gebaut - Product Requirements Document

## Product Overview
Gebaut is a minimalist daily todo application that combines the functional elegance of Bauhaus design principles with Kandinsky's iconic color and shape language to help users prioritize and manage their tasks effectively.

## Core Features

### 1. Task Management
- **Task Creation**: Simple, one-line task entry with optional descriptions. User can select priority (see below).
- **Priority System**: Three-tier priority system using Kandinsky's visual language:
  - High Priority: Yellow Triangle (△)
  - Medium Priority: Red Square (□)
  - Low Priority: Blue Circle (○)
- **Task Organization**: sort by priority, with higher priority tasks above lower priority tasks 
- **Task Completion**: Smooth animation when marking tasks as complete, which strikes out task entry and descriptions
- **Daily Reset**: Tasks reset at midnight, encouraging daily planning

### 2. User Interface
- **Gebaut ToDo on <Date>**
  - Top centre of app, highlighting that the Todo list is for a specific date
- **Bauhaus Design Principles**:
  - Clean, geometric layouts
  - Sans-serif typography
  - Primary color palette: Yellow, Red, Blue
  - High contrast for readability
  - Grid-based layout system
- **Minimalist Interaction**:
  - Single-tap actions
  - Gesture-based controls
  - No unnecessary UI elements

### 3. Visual Hierarchy
- **Priority Indicators**:
  - Yellow Triangle (△) for urgent tasks
  - Red Square (□) for important tasks
  - Blue Circle (○) for routine tasks
- **Typography**:
  - Primary font: Bauhaus-style geometric sans-serif
  - Clear hierarchy in text sizes
  - High contrast text for readability

### 4. User Experience
- **Onboarding**: Simple, Bauhaus-inspired tutorial
- **Daily Focus**: Single day view to prevent overwhelm
- **Task Progress**: Visual progress indicator
- **Animations**: Subtle, geometric transitions
- **Haptic Feedback**: Tactile responses for interactions

## Technical Requirements

### 1. Platform Support
- Web (primary platform)
- iOS (secondary platform)
- Android (tertiary platform)

### 2. Performance
- Instant task updates
- Smooth animations (60fps)
- Offline functionality
- Quick app launch (< 1 second)

### 3. Data Management
- Local storage for tasks, using SQLite
- Optional cloud sync
- Minimal data collection
- Privacy-focused design

## Design Guidelines

### 1. Color Palette
- Primary Colors:
  - Yellow: #FFD700 (Priority 1)
  - Red: #FF0000 (Priority 2)
  - Blue: #0000FF (Priority 3)
- Secondary Colors:
  - Black: #000000
  - White: #FFFFFF
  - Gray: #808080

### 2. Typography
- Primary Font: Geometric sans-serif
- Font Sizes:
  - Headings: 24px
  - Task Text: 16px
  - Secondary Text: 14px

### 3. Spacing
- Grid System: 8px base unit
- Margins: Multiples of 8px
- Padding: Multiples of 8px

### 4. Visual Mockup
Below is a visual representation of the 8px grid system in practice:

```
┌─────────────────────────────────────────────┐
│                                             │
│  G E B A U T  T O D O   08 Apr 25           │ 24px
│                                             │
├─────────────────────────────────────────────┤
│                                             │ 8px
│  △  High Priority Task                      │
│                                             │ 48px
├─────────────────────────────────────────────┤
│                                             │ 8px
│  □  Medium Priority Task                    │
│                                             │ 48px
├─────────────────────────────────────────────┤
│                                             │ 8px
│  ○  Low Priority Task                       │
│                                             │ 48px
├─────────────────────────────────────────────┤
│                                             │ 16px
│  +  Add New Task                            │
│                                             │ 40px
├─────────────────────────────────────────────┤
│                                             │ 16px
└─────────────────────────────────────────────┘

Key:
△ = Yellow Triangle (High Priority)
□ = Red Square (Medium Priority)
○ = Blue Circle (Low Priority)

Spacing Breakdown:
- Header: 24px height
- Task Items: 48px height each
- Add Task Button: 40px height
- Vertical Spacing:
  - Between header and first task: 8px
  - Between tasks: 8px
  - Before Add Task button: 16px
  - Bottom padding: 16px
- Horizontal Padding: 16px (2 units) on each side
```

This mockup demonstrates:
1. Consistent use of 8px grid units
2. Clear visual hierarchy
3. Balanced spacing between elements
4. Geometric precision in layout

## Success Metrics
1. Performance:
   - App load time
   - Task update speed
   - Animation smoothness

## Future Considerations
1. Feature Expansion:
   - Saving tasks over other days
   - Task categories
   - Recurring tasks
   - exporting tasks as JSON
   - Task sharing
   - Custom priority indicators
