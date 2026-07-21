const WheatDivider = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className="h-px w-16 bg-foreground" />
  </div>
);

export default WheatDivider;
