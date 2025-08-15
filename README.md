# volto-IconLinkRow
A compact block that shows a row of icon-based links.  
Great for quick navigation, feature shortcuts, or a compact “services” menu.

## What you get

- Clean icon-and-label links in a single row
- Optional header above the row
- Optional call-to-action button under the row
- Mobile-friendly layout with an optional carousel mode
- Internal and external links supported
- Simple, override-friendly CSS

## Files

Place these in `src/customizations/components/Blocks/IconLinkRow/`:

- `index.js` (re-exports `Edit` and `View`)
- `Edit.jsx`
- `View.jsx`
- `schema.js`
- `style.css`

## Install dependency

The mobile carousel uses Embla.

```bash
npm install embla-carousel-react
# or
yarn add embla-carousel-react
```

## Register the block

Add this to `src/index.js`:

```js
import iconSVG from '@plone/volto/icons/select-all.svg';
import { Edit as IconLinkRowEdit, View as IconLinkRowView,} from './components/Blocks/IconLinkRow';

const applyConfig = (config) => {

	//IconLinkRow
	config.blocks.blocksConfig.iconLinkRow = {
	    id: 'iconLinkRow',
	    title: 'Icon Link Row',
	    icon: iconSVG,
	    group: 'common',
	    view: IconLinkRowView,
	    edit: IconLinkRowEdit,
	    restricted: false,
	    mostUsed: true,
	    sidebarTab: 1,
	};

	return config;
};

export default applyConfig;
```

### Optional: global carousel settings

Set once in your `applyConfig`. Used by the block on small screens when `Use carousel on mobile` is enabled.

```js
config.blocks.blocksConfig.iconLinkRow.carousel = {
  autoplay: true,   // default true
  delay: 3500,      // milliseconds
};
```

## Editing fields

All fields live in the block sidebar.

- **Header**: text above the row
- **Links**: list of items, each with:
  - **Icon**: choose from the built-in set
  - **Label**
  - **Link**: object browser. Internal and external links supported
- **Button text**: optional CTA label
- **Button link**: object browser link for the CTA
- **Always show button**: show the CTA even if the link is missing
- **Use carousel on mobile**: on small screens this becomes a one-item-per-slide carousel with dots

## Built‑in icons

Pick by key name:

```
link, home, folder, user, pencil, briefcase, fingerprint, bell
```
(You can extend `iconChoices` in `schema.js`.)

## Behaviour details

- Internal links open in the same tab
- External links open in a new tab with `noopener noreferrer`
- Button shows if either “Always show button” is on or a label is provided
- When carousel is used:
  - Slides are centred
  - One item per slide
  - Dots indicate the current slide
  - Autoplay respects the global settings

## Styling

Basic styles live in `style.css`.  
They are minimal and easy to override in your project CSS.

Key class names:
- `.icon-link-row-view` and `.icon-link-row-block`
- `.icon-row`
- `.icon-item`
- `.icon-link-row__button`
- `.embla`, `.embla__container`, `.embla__slide`, `.embla__dots`, `.embla__dot`

## Accessibility

- Carousel dots include `aria-label` for slide navigation
- Provide clear labels for each link and the CTA button

## Tips

- Keep labels short for a tidy row
- Limit items if you want equal emphasis on each action
- Use the header to frame the set, for example “Explore”, “Get started”, or your section name

## Example data

```json
{
  "header": "Explore",
  "items": [
    { "icon": "home", "text": "Home", "href": "/home" },
    { "icon": "folder", "text": "Docs", "href": "/docs" },
    { "icon": "user", "text": "Profile", "href": "/users/me" }
  ],
  "buttonLabel": "See all",
  "buttonLink": "/all",
  "showButton": false,
  "mobileCarousel": true
}
```

---

Built for Volto. Editor-friendly and easy to extend.