import React from 'react';
import { UIElementNode } from '../../types/section';
import { InlineTextEditor } from './InlineTextEditor';
import { useSection } from '../../context/SectionContext';

interface DynamicRendererProps {
  node: UIElementNode;
}

export const DynamicRenderer: React.FC<DynamicRendererProps> = ({ node }) => {
  const { setSelectedNodeId, selectedNodeId, setActiveToolbar } = useSection();

  if (!node) return null;

  const props = node.props || {};
  const isSelected = selectedNodeId === node.id;

  const handleContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(node.id);
  };

  // 1. SECTION
  if (node.type === 'section') {
    const bg = props.bgColor || 'bg-canvas';
    const padding =
      props.padding === '2xl'
        ? 'py-20 px-6 sm:px-10'
        : props.padding === 'xl'
        ? 'py-16 px-6 sm:px-8'
        : props.padding === 'lg'
        ? 'py-12 px-6'
        : 'py-8 px-4';

    return (
      <section
        id={node.id}
        onClick={handleContainerClick}
        style={{
          backgroundColor: props.bgColor?.startsWith('#') ? props.bgColor : undefined,
        }}
        className={`w-full ${padding} transition-all duration-200 relative ${
          isSelected ? 'ring-2 ring-bronze ring-offset-2' : ''
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-8">
          {node.children?.map((child) => (
            <DynamicRenderer key={child.id} node={child} />
          ))}
        </div>
      </section>
    );
  }

  // 2. CONTAINER
  if (node.type === 'container') {
    return (
      <div
        id={node.id}
        onClick={handleContainerClick}
        className={`w-full mx-auto relative ${
          isSelected ? 'ring-2 ring-bronze ring-offset-2' : ''
        }`}
      >
        {node.children?.map((child) => (
          <DynamicRenderer key={child.id} node={child} />
        ))}
      </div>
    );
  }

  // 3. GRID
  if (node.type === 'grid') {
    const cols =
      props.columns === 5
        ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
        : props.columns === 4
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        : props.columns === 3
        ? 'grid-cols-1 md:grid-cols-3'
        : props.columns === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1';

    const gap =
      props.gap === 'xl'
        ? 'gap-8'
        : props.gap === 'lg'
        ? 'gap-6'
        : props.gap === 'sm'
        ? 'gap-3'
        : 'gap-5';

    return (
      <div
        id={node.id}
        onClick={handleContainerClick}
        className={`grid ${cols} ${gap} w-full my-4 relative ${
          isSelected ? 'ring-2 ring-bronze ring-offset-2' : ''
        }`}
      >
        {node.children?.map((child) => (
          <DynamicRenderer key={child.id} node={child} />
        ))}
      </div>
    );
  }

  // 4. STACK
  if (node.type === 'stack') {
    const dir = props.direction === 'row' ? 'flex-row flex-wrap' : 'flex-col';
    const align =
      props.align === 'center'
        ? 'items-center justify-center text-center'
        : props.align === 'right'
        ? 'items-end justify-end text-right'
        : props.align === 'between'
        ? 'items-center justify-between'
        : 'items-start justify-start text-left';

    const gap =
      props.gap === 'xl'
        ? 'gap-6'
        : props.gap === 'lg'
        ? 'gap-4'
        : props.gap === 'sm'
        ? 'gap-2'
        : props.gap === 'xs'
        ? 'gap-1'
        : 'gap-3';

    return (
      <div
        id={node.id}
        onClick={handleContainerClick}
        className={`flex ${dir} ${align} ${gap} ${props.className || ''} relative`}
      >
        {node.children?.map((child) => (
          <DynamicRenderer key={child.id} node={child} />
        ))}
      </div>
    );
  }

  // 5. CARD (20px border-radius standard from specs)
  if (node.type === 'card') {
    const isHighlighted = props.highlighted;
    const padding =
      props.padding === 'xl'
        ? 'p-8'
        : props.padding === 'lg'
        ? 'p-6'
        : props.padding === 'sm'
        ? 'p-3'
        : 'p-5';

    return (
      <div
        id={node.id}
        onClick={handleContainerClick}
        style={{
          backgroundColor: props.bgColor || '#FFFFFF',
          borderColor: isHighlighted
            ? '#8B6240'
            : props.borderColor || 'rgba(32, 41, 64, 0.12)',
        }}
        className={`rounded-card ${padding} border-2 flex flex-col gap-4 shadow-card hover:shadow-card-hover transition-all duration-300 relative group ${
          isHighlighted ? 'ring-2 ring-bronze/30 shadow-lg scale-[1.02]' : ''
        } ${isSelected ? 'ring-2 ring-bronze ring-offset-2' : ''}`}
      >
        {node.children?.map((child) => (
          <DynamicRenderer key={child.id} node={child} />
        ))}
      </div>
    );
  }

  // 6. HEADING
  if (node.type === 'heading') {
    const sizeClass =
      props.size === '5xl'
        ? 'text-4xl sm:text-5xl lg:text-6xl font-space font-extrabold leading-tight'
        : props.size === '4xl'
        ? 'text-3xl sm:text-4xl font-space font-bold leading-tight'
        : props.size === '3xl'
        ? 'text-2xl sm:text-3xl font-space font-bold'
        : props.size === '2xl'
        ? 'text-xl sm:text-2xl font-space font-bold'
        : props.size === 'xl'
        ? 'text-lg sm:text-xl font-space font-semibold'
        : 'text-base font-space font-semibold';

    const weightClass =
      props.weight === 'extrabold'
        ? 'font-extrabold'
        : props.weight === 'bold'
        ? 'font-bold'
        : props.weight === 'medium'
        ? 'font-medium'
        : 'font-normal';

    const alignClass =
      props.align === 'center'
        ? 'text-center'
        : props.align === 'right'
        ? 'text-right'
        : 'text-left';

    return (
      <InlineTextEditor
        node={node}
        tag={props.tag || 'h2'}
        className={`${sizeClass} ${weightClass} ${alignClass} ${props.className || ''}`}
      />
    );
  }

  // 7. PARAGRAPH
  if (node.type === 'paragraph') {
    const sizeClass =
      props.size === '2xl'
        ? 'text-2xl'
        : props.size === 'xl'
        ? 'text-lg sm:text-xl leading-relaxed'
        : props.size === 'lg'
        ? 'text-base sm:text-lg leading-relaxed'
        : props.size === 'sm'
        ? 'text-sm'
        : props.size === 'xs'
        ? 'text-xs'
        : 'text-base';

    const weightClass =
      props.weight === 'semibold'
        ? 'font-semibold'
        : props.weight === 'bold'
        ? 'font-bold'
        : 'font-normal';

    const alignClass =
      props.align === 'center'
        ? 'text-center'
        : props.align === 'right'
        ? 'text-right'
        : 'text-left';

    return (
      <InlineTextEditor
        node={node}
        tag="p"
        className={`${sizeClass} ${weightClass} ${alignClass} font-inter ${props.className || ''}`}
      />
    );
  }

  // 8. BUTTON
  if (node.type === 'button') {
    const variant = props.variant || 'amber';
    const variantClasses =
      variant === 'amber'
        ? 'bg-bronze hover:bg-bronze-hover text-white shadow-md'
        : variant === 'emerald'
        ? 'bg-emerald hover:bg-emerald-hover text-white shadow-md'
        : variant === 'outline'
        ? 'border-2 border-navy/20 hover:border-navy hover:bg-navy/5 text-navy font-semibold'
        : variant === 'ghost'
        ? 'hover:bg-navy/5 text-navy'
        : 'bg-navy hover:bg-navy-light text-white shadow-md';

    const sizeClasses =
      props.size === 'lg'
        ? 'px-7 py-3.5 text-base font-semibold'
        : props.size === 'sm'
        ? 'px-3.5 py-1.5 text-xs font-medium'
        : 'px-5 py-2.5 text-sm font-semibold';

    return (
      <button
        id={node.id}
        onClick={handleContainerClick}
        className={`rounded-full transition-all duration-200 active:scale-95 inline-flex items-center justify-center cursor-pointer ${variantClasses} ${sizeClasses} ${
          isSelected ? 'ring-2 ring-bronze ring-offset-2' : ''
        }`}
      >
        <InlineTextEditor node={node} tag="span" />
      </button>
    );
  }

  // 9. BADGE / PILL
  if (node.type === 'badge') {
    const badgeType = props.badgeType || 'bronze';
    const badgeStyle =
      badgeType === 'success'
        ? 'bg-emerald-light text-emerald border-emerald/20'
        : badgeType === 'alert'
        ? 'bg-terracotta-light text-terracotta border-terracotta/20'
        : badgeType === 'navy'
        ? 'bg-navy/10 text-navy border-navy/20'
        : 'bg-bronze-light text-bronze border-bronze/25';

    return (
      <div
        id={node.id}
        onClick={handleContainerClick}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border ${badgeStyle} ${
          isSelected ? 'ring-2 ring-bronze ring-offset-2' : ''
        }`}
      >
        <InlineTextEditor node={node} tag="span" />
      </div>
    );
  }

  // 10. IMAGE
  if (node.type === 'image') {
    const radius =
      props.borderRadius === '2xl'
        ? 'rounded-card'
        : props.borderRadius === 'xl'
        ? 'rounded-xl'
        : props.borderRadius === 'full'
        ? 'rounded-full'
        : 'rounded-lg';

    return (
      <div
        id={node.id}
        onClick={handleContainerClick}
        className={`overflow-hidden shadow-lg border border-navy/10 ${radius} ${
          isSelected ? 'ring-2 ring-bronze ring-offset-2' : ''
        }`}
      >
        <img
          src={props.src || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
          alt={props.alt || 'Generated section visual'}
          className="w-full h-auto object-cover max-h-[480px] hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
    );
  }

  // 11. AVATAR
  if (node.type === 'avatar') {
    return (
      <div
        id={node.id}
        onClick={handleContainerClick}
        className={`w-11 h-11 rounded-full overflow-hidden border-2 border-bronze/30 bg-bronze-light flex-shrink-0 ${
          isSelected ? 'ring-2 ring-bronze ring-offset-2' : ''
        }`}
      >
        <img
          src={props.src || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // 12. INPUT
  if (node.type === 'input') {
    return (
      <div
        id={node.id}
        onClick={handleContainerClick}
        className={`flex-1 min-w-[240px] ${
          isSelected ? 'ring-2 ring-bronze ring-offset-2' : ''
        }`}
      >
        <input
          type="text"
          placeholder={props.placeholder || 'Enter value...'}
          className="w-full px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-bronze"
        />
      </div>
    );
  }

  // 13. DIVIDER
  if (node.type === 'divider') {
    return <hr className="w-full border-t border-borderSlate my-4" />;
  }

  return null;
};
