interface MascotProps {
  message: string;
  className?: string;
}

export const Mascot = ({ message, className = '' }: MascotProps) => {
  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="mascot-bubble max-w-md animate-slide-up">
        <p className="text-foreground text-lg leading-relaxed">{message}</p>
      </div>
      <div className="text-6xl animate-float">🦉</div>
    </div>
  );
};
