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
    width="13" 
    height="19" 
    viewBox="0 0 13 19" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`shrink-0 ${className}`}
  >
    <path d="M2.23988 17.3712C1.82018 17.3372 1.61024 16.9423 1.65663 16.5523C1.79481 15.3885 2.66557 13.4789 3.35352 12.5279L3.96468 11.6817L4.61946 10.9053C5.12328 10.3077 5.68936 9.77948 6.26741 9.2754C7.24881 8.41892 8.75327 7.56539 9.98349 7.75537C10.7098 7.86734 11.3359 8.5842 11.3318 9.3445C11.3252 10.4672 10.8094 11.5484 10.0742 12.4102L9.77328 12.7621L9.48014 13.1653L8.43251 14.2261C8.36361 14.2654 8.19742 14.3593 8.13659 14.4119L7.38625 15.0718C6.2137 16.0077 4.88937 16.6975 3.49535 17.171C3.08228 17.3113 2.68079 17.4037 2.24081 17.3687L2.23988 17.3712Z" fill="currentColor"/>
    <path d="M1.62891 2.17594C1.66288 1.75624 2.05784 1.5463 2.44778 1.59269C3.61166 1.73087 5.52127 2.60163 6.47222 3.28958L7.31844 3.90074L8.09486 4.55552C8.69238 5.05934 9.22065 5.62542 9.72473 6.20347C10.5812 7.18487 11.4347 8.68933 11.2448 9.91955C11.1328 10.6459 10.4159 11.272 9.65563 11.2678C8.53294 11.2612 7.45171 10.7455 6.58992 10.0102L6.23806 9.70934L5.83479 9.4162L4.77401 8.36857C4.77401 8.36857 4.69141 8.26712 4.63879 8.20628L3.92829 7.32231C2.99243 6.14976 2.3026 4.82543 1.82908 3.43141C1.68887 3.01834 1.59641 2.61685 1.63147 2.17687L1.62891 2.17594Z" fill="currentColor"/>
  </svg>
);

export const CTA = React.forwardRef<HTMLButtonElement, CTAProps>(
  ({ variant, children, className = '', ...props }, ref) => {
    // Base classes for typography conforming to Figma specs (height 44px with py-[10px])
    const typographyClass = 'font-secondary font-medium text-[16px] leading-[24px]';
    const baseClasses = `inline-flex items-center justify-center cursor-pointer transition-all duration-300 ${typographyClass} h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`;
    
    const isArrowOnly = variant === 'light-arrow' || variant === 'dark-arrow';
    const isTextOnly = variant === 'light-text' || variant === 'dark-text';

    // Shape/Padding Classes conforming to Figma design system
    let shapeClasses = "";
    if (isArrowOnly) {
      shapeClasses = "rounded-[64px] p-[10px]";
    } else if (isTextOnly) {
      shapeClasses = "p-0 gap-[10px]";
    } else {
      shapeClasses = "rounded-[64px] py-[10px] px-[20px] gap-[10px]";
    }

    let variantClasses = "";
    let iconClasses = "";

    switch (variant) {
      case 'light-bg':
        variantClasses = "bg-electric-blue text-white [@media(hover:hover)]:hover:bg-gradient-to-br [@media(hover:hover)]:hover:from-electric-blue [@media(hover:hover)]:hover:from-[50%] [@media(hover:hover)]:hover:to-aqua-mint border-none";
        iconClasses = "text-[#91C6F2] [@media(hover:hover)]:group-hover:text-white transition-colors duration-300";
        break;
      case 'dark-bg':
        variantClasses = "bg-white text-midnight-blue [@media(hover:hover)]:hover:bg-gradient-to-br [@media(hover:hover)]:hover:from-[#042849] [@media(hover:hover)]:hover:from-[40%] [@media(hover:hover)]:hover:to-[#1E5667] [@media(hover:hover)]:hover:text-white border-none";
        iconClasses = "text-midnight-blue [@media(hover:hover)]:group-hover:text-white transition-colors duration-300";
        break;
      case 'outline':
        variantClasses = "bg-transparent border border-white text-white [@media(hover:hover)]:hover:bg-[#91C6F2]/40 [@media(hover:hover)]:hover:backdrop-blur-[24px] [@media(hover:hover)]:hover:border-[#91C6F2]";
        iconClasses = "text-white";
        break;
      case 'light-text':
        // Text is underlined by default
        variantClasses = "bg-transparent text-midnight-blue [@media(hover:hover)]:hover:text-electric-blue underline underline-offset-4 decoration-1";
        iconClasses = "text-electric-blue [@media(hover:hover)]:group-hover:text-midnight-blue transition-colors duration-300 no-underline";
        break;
      case 'dark-text':
        variantClasses = "bg-transparent text-aqua-mint [@media(hover:hover)]:hover:text-white underline underline-offset-4 decoration-1";
        iconClasses = "text-white [@media(hover:hover)]:group-hover:text-aqua-mint transition-colors duration-300 no-underline";
        break;
      case 'dark-arrow':
        variantClasses = "bg-transparent border border-white text-white [@media(hover:hover)]:hover:bg-white [@media(hover:hover)]:hover:text-electric-blue";
        iconClasses = "text-white [@media(hover:hover)]:group-hover:text-electric-blue transition-colors duration-300";
        break;
      case 'light-arrow':
        variantClasses = "bg-transparent border border-electric-blue text-electric-blue [@media(hover:hover)]:hover:bg-electric-blue [@media(hover:hover)]:hover:text-white";
        iconClasses = "text-electric-blue [@media(hover:hover)]:group-hover:text-white transition-colors duration-300";
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
