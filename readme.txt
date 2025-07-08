These files get added to the customizations/components/Blocks folder

To register IconLinkRow block, add to src/index.js

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