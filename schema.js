import LinkIcon from '@plone/volto/icons/link.svg';
import HomeIcon from '@plone/volto/icons/home.svg';
import FolderIcon from '@plone/volto/icons/folder.svg';
import UserIcon from '@plone/volto/icons/user.svg';
import PencilIcon from '@plone/volto/icons/pencil.svg';
import BriefcaseIcon from '@plone/volto/icons/briefcase.svg';
import FingerPrintIcon from '@plone/volto/icons/finger-print.svg';
import BellIcon from '@plone/volto/icons/bell-ringing.svg';

// Exported so Edit/View can reuse without redefining
export const iconChoices = {
  link: LinkIcon,
  home: HomeIcon,
  folder: FolderIcon,
  user: UserIcon,
  pencil: PencilIcon,
  briefcase: BriefcaseIcon,
  fingerprint: FingerPrintIcon,
  bell: BellIcon,
};

const schema = () => ({
  title: 'Icon Link Row',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'header',
        'items',
        'buttonLabel',
        'buttonLink',
        'showButton',
        'mobileCarousel',
      ],
    },
  ],
  properties: {
    header: {
      title: 'Header',
      type: 'string',
    },
    items: {
      title: 'Links',
      widget: 'object_list',
      default: [
        {
          icon: 'link',
          text: 'Link',
          href: '',
        },
      ],
      schema: {
        title: 'Link',
        fieldsets: [
          {
            id: 'default',
            title: 'Default',
            fields: ['icon', 'text', 'href'],
          },
        ],
        properties: {
          icon: {
            title: 'Icon',
            type: 'string',
            default: 'link',
            choices: Object.keys(iconChoices).map((key) => [key, key]),
          },
          text: {
            title: 'Label',
            type: 'string',
            default: 'Link',
          },
          href: {
            title: 'Link',
            widget: 'object_browser',
            mode: 'link',
            allowExternals: true,
          },
        },
        required: [],
      },
    },
    buttonLabel: {
      title: 'Button text',
      type: 'string',
    },
    buttonLink: {
      title: 'Button link',
      widget: 'object_browser',
      mode: 'link',
      allowExternals: true,
    },
    showButton: {
      title: 'Always show button',
      type: 'boolean',
      default: false,
    },
    mobileCarousel: {
      title: 'Use carousel on mobile',
      type: 'boolean',
      default: false,
      description:
        'On small screens this row becomes a carousel with dots, one item per slide, and automatic scrolling.',
    },
  },
  required: [],
});

export default schema;
