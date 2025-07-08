import React from 'react';
import { SidebarPortal, BlockDataForm } from '@plone/volto/components';
import { Icon as VoltoIcon } from '@plone/volto/components';
import schema, { backgroundColorThemes } from './schema';

import LinkIcon from '@plone/volto/icons/link.svg';
import HomeIcon from '@plone/volto/icons/home.svg';
import FolderIcon from '@plone/volto/icons/folder.svg';
import UserIcon from '@plone/volto/icons/user.svg';
import PencilIcon from '@plone/volto/icons/pencil.svg';

import './styles.css';

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

const Edit = ({ data, block, onChangeBlock, selected }) => {
  const resolvedButtonHref = getHref(data.buttonLink);
  const showButton = data.showButton || !!data.buttonLabel;

  
  
    data.backgroundColor && backgroundColorThemes[data.backgroundColor]
      ? `bg-${backgroundColorThemes[data.backgroundColor]}`
      : '';
  
  
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
    <>
      <div className={wrapperClass} style={wrapperStyle}>
        <div className="block-inner-wrapper">
          {data.header && <h2 style={{ marginBottom: '1rem' }}>{data.header}</h2>}
          <div className="icon-link-group">
            {(data.items || []).map((item, index) => {
              const IconComponent = iconChoices[item.icon] || LinkIcon;
              return (
                <div key={index} className="icon-link-item">
                  <a
                    href={getHref(item.href)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <VoltoIcon name={IconComponent} size="30px" />
                    <span style={{ marginTop: '0.5rem' }}>{item.text || 'Preview'}</span>
                  </a>
                </div>
              );
            })}
          </div>
          {showButton && resolvedButtonHref && (
            <div style={{ marginTop: '2rem' }}>
              <a className="ui primary button" href={resolvedButtonHref}>
                {data.buttonLabel || 'Click here'}
              </a>
            </div>
          )}
        </div>
      </div>
      {selected && (
        <SidebarPortal selected={selected}>
          <BlockDataForm
            schema={schema({})}
            title="Icon Link Row"
            onChangeField={(id, value) =>
              onChangeBlock(block, { ...data, [id]: value })
            }
            block={block}
            formData={data}
          />
        </SidebarPortal>
      )}
    </>
  );
};

export default Edit;