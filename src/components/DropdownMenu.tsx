import React, { useEffect, useRef } from 'react';
import { 
  Users, 
  Copy, 
  Share, 
  BellOff, 
  Download, 
  Settings, 
  LogOut,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DropdownOption {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isDanger?: boolean;
}

interface DropdownMenuProps {
  options?: DropdownOption[];
  onClose: () => void;
  className?: string;
}

const defaultOptions: DropdownOption[] = [
  {
    label: 'View Members',
    icon: Users,
    onClick: () => console.log('View Members'),
  },
  {
    label: 'Copy Invite Code',
    icon: Copy,
    onClick: () => console.log('Copy Invite Code'),
  },
  {
    label: 'Share Invite',
    icon: Share,
    onClick: () => console.log('Share Invite'),
  },
  {
    label: 'Mute Notifications',
    icon: BellOff,
    onClick: () => console.log('Mute Notifications'),
  },
  {
    label: 'Export Chat',
    icon: Download,
    onClick: () => console.log('Export Chat'),
  },
  {
    label: 'Group Settings',
    icon: Settings,
    onClick: () => console.log('Group Settings'),
  },
  {
    label: 'Leave Group',
    icon: LogOut,
    onClick: () => console.log('Leave Group'),
    isDanger: true,
  },
];

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options = defaultOptions,
  onClose,
  className
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle outside click to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleOptionClick = (option: DropdownOption) => {
    option.onClick();
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className={cn(
        "absolute top-full right-0 mt-2 w-56 bg-background border border-border rounded-xl shadow-lg z-50 py-2 animate-scale-in",
        className
      )}
    >
      {options.map((option, index) => {
        const IconComponent = option.icon;
        
        return (
          <button
            key={index}
            onClick={() => handleOptionClick(option)}
            className={cn(
              "flex items-center gap-3 w-full px-4 py-3 text-left text-sm font-medium transition-colors duration-150",
              "hover:bg-muted focus:bg-muted focus:outline-none",
              option.isDanger 
                ? "text-destructive hover:bg-destructive/10 focus:bg-destructive/10" 
                : "text-foreground"
            )}
          >
            <IconComponent size={18} />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};