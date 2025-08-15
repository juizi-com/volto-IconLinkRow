import React from 'react';
import { Icon as VoltoIcon } from '@plone/volto/components';
import config from '@plone/volto/registry';
import useEmblaCarousel from 'embla-carousel-react';
import schema, { iconChoices } from './schema';
import './style.css';

const getHref = (href) => {
  if (!href) return '#';
  if (typeof href === 'string') return href;
  if (Array.isArray(href)) return href[0]?.['@id'] || '#';
  return href['@id'] || '#';
};

const isExternalLink = (href) => {
  if (!href) return false;
  if (href.startsWith('/')) return false;
  if (config?.settings?.apiPath && href.startsWith(config.settings.apiPath)) {
    return false;
  }
  return href.startsWith('http');
};

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false,
  );
  React.useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);
  return isMobile;
};

const View = ({ data }) => {
  const items = data.items || [];
  const isMobile = useIsMobile(768);
  const shouldCarousel = data.mobileCarousel && isMobile && items.length > 1;

  // Global carousel settings from block config
  const { autoplay = true, delay = 3500 } =
    config?.blocks?.blocksConfig?.iconLinkRow?.carousel || {};

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      dragFree: false,
      containScroll: 'trimSnaps',
      slidesToScroll: 1,
    },
    [],
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);

  React.useEffect(() => {
    if (!shouldCarousel || !emblaApi || !autoplay) return;
    const id = setInterval(() => emblaApi?.scrollNext(), delay);
    return () => clearInterval(id);
  }, [shouldCarousel, emblaApi, autoplay, delay]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  const Item = ({ item }) => {
    const IconComponent = iconChoices[item?.icon] || iconChoices.link;
    const resolvedHref = getHref(item?.href);
    const external = isExternalLink(resolvedHref);
    return (
      <div className="icon-item">
        <a
          href={resolvedHref}
          target={external ? '_blank' : '_self'}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          <VoltoIcon name={IconComponent} size="30px" />
          <span>{item?.text}</span>
        </a>
      </div>
    );
  };

  const buttonHref = getHref(data.buttonLink);
  const showButton = data.showButton || !!data.buttonLabel;
  const buttonIsExternal = isExternalLink(buttonHref);

  return (
    <div className="icon-link-row-view">
      {data.header && <h2>{data.header}</h2>}

      {!shouldCarousel ? (
        <div className="icon-row">
          {items.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </div>
      ) : (
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {items.map((item, index) => (
              <div className="embla__slide" key={index}>
                <Item item={item} />
              </div>
            ))}
          </div>
          <div className="embla__dots">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                className={`embla__dot ${selectedIndex === i ? 'is-selected' : ''}`}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => emblaApi && emblaApi.scrollTo(i)}
              />
            ))}
          </div>
        </div>
      )}

      {showButton && buttonHref && (
        <div className="icon-link-row__button">
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
  );
};

export default View;
