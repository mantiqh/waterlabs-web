import React from 'react';

export type CTAVariant = 
  | 'light-bg' 
  | 'dark-bg' 
  | 'outline' 
  | 'light-text' 
  | 'dark-text' 
  | 'light-arrow' 
  | 'dark-arrow';

export interface CTAProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: CTAVariant;
  children?: React.ReactNode;
}

const ChevronRight = ({ className }: { className?: string }) => (
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <path 
      d="M6 12L10 8L6 4" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export const CTA = React.forwardRef<HTMLButtonElement, CTAProps>(
  ({ variant, children, className = '', ...props }, ref) => {
    // Base classes
    const baseClasses = "inline-flex items-center justify-center transition-all duration-300 body-cta focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
    
    // We determine padding based on whether it's an arrow-only variant or not
    const isArrowOnly = variant === 'light-arrow' || variant === 'dark-arrow';
    const isTextOnly = variant === 'light-text' || variant === 'dark-text';

    let shapeClasses = "";
    if (isArrowOnly) {
      shapeClasses = "rounded-full p-16 lg:p-20";
    } else if (isTextOnly) {
      shapeClasses = "p-0 gap-8";
    } else {
      shapeClasses = "rounded-full py-16 px-24 lg:py-20 lg:px-[28px] gap-8";
    }

    let variantClasses = "";
    let iconClasses = "";

    switch (variant) {
      case 'light-bg':
        variantClasses = "bg-electric-blue text-white hover:bg-linear-to-r hover:from-electric-blue hover:to-aqua-mint border border-transparent";
        iconClasses = "text-white";
        break;
      case 'dark-bg':
        variantClasses = "bg-white text-midnight-blue hover:bg-linear-to-r hover:from-electric-blue hover:to-aqua-mint hover:text-white hover:border-transparent border border-transparent";
        iconClasses = "text-midnight-blue group-hover:text-white transition-colors duration-300";
        break;
      case 'outline':
        variantClasses = "bg-transparent border border-white text-white hover:bg-linear-to-r hover:from-electric-blue hover:to-aqua-mint hover:border-transparent";
        iconClasses = "text-white";
        break;
      case 'light-text':
        // Text is underlined by default
        variantClasses = "bg-transparent text-midnight-blue hover:text-electric-blue underline underline-offset-4 decoration-1";
        iconClasses = "text-electric-blue group-hover:text-midnight-blue transition-colors duration-300 no-underline";
        break;
      case 'dark-text':
        variantClasses = "bg-transparent text-aqua-mint hover:text-white underline underline-offset-4 decoration-1";
        iconClasses = "text-white group-hover:text-aqua-mint transition-colors duration-300 no-underline";
        break;
      case 'dark-arrow':
        variantClasses = "bg-transparent border border-white text-white hover:bg-white hover:text-electric-blue";
        iconClasses = "text-white group-hover:text-electric-blue transition-colors duration-300";
        break;
      case 'light-arrow':
        variantClasses = "bg-transparent border border-electric-blue text-electric-blue hover:bg-electric-blue hover:text-white";
        iconClasses = "text-electric-blue group-hover:text-white transition-colors duration-300";
        break;
    }

    return (
      <button
        ref={ref}
        className={`group ${baseClasses} ${shapeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {!isArrowOnly && children && <span>{children}</span>}
        <ChevronRight className={iconClasses} />
      </button>
    );
  }
);

CTA.displayName = 'CTA';
