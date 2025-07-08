import LinkIcon from '@plone/volto/icons/link.svg';
import HomeIcon from '@plone/volto/icons/home.svg';
import FolderIcon from '@plone/volto/icons/folder.svg';
import UserIcon from '@plone/volto/icons/user.svg';
import PencilIcon from '@plone/volto/icons/pencil.svg';

const iconChoices = {
  link: LinkIcon,
  home: HomeIcon,
  folder: FolderIcon,
  user: UserIcon,
  pencil: PencilIcon,
};

export const backgroundColorChoices = [
  ['var(--charcoal)', 'Charcoal'],
  ['#ffffff', 'White'],
  ['var(--lightgrey)', 'Light grey'],
  ['var(--turquoise)', 'Turquoise'],
  ['var(--darkturquoise)', 'Dark Turquoise'],
  ['var(--red)', 'Red'],
];

export const backgroundColorThemes = {
  'var(--charcoal)': 'dark',
  '#ffffff': 'light',
  'var(--lightgrey)': 'light',
  'var(--turquoise)': 'dark',
  'var(--darkturquoise)': 'dark',
  'var(--red)': 'dark',
};

const schema = (props) => ({
  title: 'Icon Link Row',
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['header', 'items', 'buttonLabel', 'buttonLink', 'showButton', 'backgroundColor', 'fullWidth'],
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
    backgroundColor: {
      title: 'Background colour',
      widget: 'select',
      choices: backgroundColorChoices,
      default: '#f5f5f5',
    },
    fullWidth: {
      title: 'Full width background',
      type: 'boolean',
      default: false,
    },
  },
  required: [],
});

export default schema;