import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  external?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ href, variant = 'primary', children, external = false, className = '', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 ease-out rounded-full group";
  
  const variants = {
    primary: "bg-ink text-off-white hover:bg-stone-800 hover:scale-[1.02]",
    secondary: "bg-stone-100 text-ink hover:bg-stone-200",
    outline: "border border-stone-200 text-ink hover:border-stone-400 backdrop-blur-sm"
  };

  const content = (
    <>
      {children}
      {external && <ArrowUpRight className="ml-2 w-4 h-4 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />}
    </>
  );

  if (href) {
    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Handle smooth scrolling for internal links
      if (href.startsWith('#')) {
        e.preventDefault();
        const element = document.getElementById(href.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Call the original onClick if it exists
      const { onClick } = props as React.AnchorHTMLAttributes<HTMLAnchorElement>;
      if (onClick) {
        onClick(e);
      }
    };

    return (
      <a 
        href={href} 
        target={external ? "_blank" : undefined} 
        rel={external ? "noopener noreferrer" : undefined}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        onClick={handleAnchorClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {content}
    </button>
  );
};