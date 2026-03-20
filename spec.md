# Sustainable Domestic Aviation in India

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- Multi-section single-page educational website with smooth scroll navigation
- Homepage with hero section: title, subtitle, aviation theme visuals
- Aircraft Comparison section: Airbus A320 vs Boeing 737, data table (passenger capacity, fuel consumption, range), visual comparison cards
- Mathematics Analysis section: calculated metrics (fuel per passenger, % efficiency difference), bar charts for fuel consumption and efficiency
- Case Study section: Delhi to Mumbai route, distance/fuel estimates, SVG route map visualization
- Sustainability section: CO2 emissions impact, modern aircraft environmental benefits, icon-driven cards
- SOI Connection section: how math drives sustainable decisions, cultural/environmental India context
- Conclusion section: summary of findings, sustainability emphasis
- Sticky top navigation with section links
- Interactive elements: hover effects on cards, animated charts, smooth scroll
- Professional aviation color scheme: deep blue, white, grey

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend: minimal actor with no persistent data needed (purely informational site)
2. Frontend: single-page app with React, recharts for bar charts, SVG for route map
3. Navigation: sticky top nav with section anchor links
4. Data: hardcoded aircraft specs and calculated metrics
5. Charts: Recharts BarChart for fuel consumption and efficiency comparisons
6. Route map: SVG-based India outline with Delhi-Mumbai route line and markers
7. Responsive layout with Tailwind CSS
