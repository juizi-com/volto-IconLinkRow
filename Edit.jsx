import React from 'react';
import { SidebarPortal, BlockDataForm, Icon as VoltoIcon } from '@plone/volto/components';
import schema, { iconChoices } from './schema';
import './style.css';

const getHref = (href) => {
  if (!href) return '#';
  if (typeof href === 'string') return href;
  if (Array.isArray(href)) return href[0]?.['@id'] || '#';
  return href['@id'] || '#';
};

const Edit = ({ data, block, onChangeBlock, selected }) => {
  const resolvedButtonHref = getHref(data.buttonLink);
  const showButton = data.showButton || !!data.buttonLabel;
  const items = data.items || [];

  return (
    <>
      <div className="icon-link-row-block">
        {data.header && <h2>{data.header}</h2>}

        <div className="icon-row">
          {items.map((item, index) => {
            const IconComponent = iconChoices[item?.icon] || iconChoices.link;
            return (
              <div className="icon-item" key={index}>
                <div className="icon-item__preview">
                  <VoltoIcon name={IconComponent} size="30px" />
                  <span>{item?.text || 'Preview'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {showButton && resolvedButtonHref && (
          <div className="icon-link-row__button">
            <a className="ui primary button" href={resolvedButtonHref}>
              {data.buttonLabel || 'Click here'}
            </a>
          </div>
        )}
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
