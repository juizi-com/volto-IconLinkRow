import React from 'react';
import { Icon as VoltoIcon } from '@plone/volto/components';
import config from '@plone/volto/registry';

import LinkIcon from '@plone/volto/icons/link.svg';
import HomeIcon from '@plone/volto/icons/home.svg';
import FolderIcon from '@plone/volto/icons/folder.svg';
import UserIcon from '@plone/volto/icons/user.svg';
import PencilIcon from '@plone/volto/icons/pencil.svg';

import './styles.css';
import { backgroundColorThemes } from './schema';

const iconChoices = {
  link: LinkIcon,
  home: HomeIcon,
  folder: FolderIcon,
  user: UserIcon,
  pencil: PencilIcon,
};

const getHref = (href) => {
  if (!href) return '#';
  if (typeof href === 'string') return href;
  if (Array.isArray(href)) return href[0]?.['@id'] || '#';
  return href['@id'] || '#';
};

const isExternalLink = (href) => {
  if (!href) return false;
  if (href.startsWith('/')) return false;
  if (href.startsWith(config.settings.apiPath)) return false;
  return href.startsWith('http');
};

const View = ({ data }) => {
  const buttonHref = getHref(data.buttonLink);
  const showButton = data.showButton || !!data.buttonLabel;
  const buttonIsExternal = isExternalLink(buttonHref);

  const theme =
    data.backgroundColor && backgroundColorThemes[data.backgroundColor];
   theme ? `bg-${theme}` : '';
  
  
    data.backgroundColor && backgroundColorThemes[data.backgroundColor]
      ? `bg-${backgroundColorThemes[data.backgroundColor]}`
      : '';
    data.backgroundColor && backgroundColorThemes[data.backgroundColor]
      ? `bg-${backgroundColorThemes[data.backgroundColor]}`
      : '';
  
    data.backgroundColor && backgroundColorThemes[data.backgroundColor]
      ? `bg-${backgroundColorThemes[data.backgroundColor]}`
      : '';
  const themeClass =
    data.backgroundColor && backgroundColorThemes[data.backgroundColor]
      ? `bg-${backgroundColorThemes[data.backgroundColor]}`
      : '';
  const wrapperClass = `icon-link-row-view${data.fullWidth ? ' full-width' : ''} ${themeClass}`;
  const wrapperStyle = { backgroundColor: data.backgroundColor };

  return (
    <div className={wrapperClass} style={wrapperStyle}>
      <div className="block-inner-wrapper">
        {data.header && <h2 style={{ marginBottom: '1rem' }}>{data.header}</h2>}
        <div className="icon-link-group">
          {(data.items || []).map((item, index) => {
            const IconComponent = iconChoices[item.icon] || LinkIcon;
            const resolvedHref = getHref(item.href);
            const isExternal = isExternalLink(resolvedHref);
            return (
              <div key={index} className="icon-link-item">
                <a
                  href={resolvedHref}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                >
                  <VoltoIcon name={IconComponent} size="30px" />
                  <span style={{ marginTop: '0.5rem' }}>{item.text}</span>
                </a>
              </div>
            );
          })}
        </div>
        {showButton && buttonHref && (
          <div style={{ marginTop: '2rem' }}>
            <a
              href={buttonHref}
              target={buttonIsExternal ? '_blank' : '_self'}
              rel={buttonIsExternal ? 'noopener noreferrer' : undefined}
              className="ui primary button"
            >
              {data.buttonLabel || 'Click here'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;