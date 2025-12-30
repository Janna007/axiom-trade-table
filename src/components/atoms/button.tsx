import { Button } from "@/components/ui/button";

interface buttonProps {
  className?: string;
  title: string;
  isActive?: boolean;
}

function PrimaryButton({ className, title,isActive}: buttonProps) {
  return (
    <>
      <Button
        className={isActive ? `bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl ${className}` :`bg-muted  hover:bg-muted/90  text-foreground font-semibold rounded-2xl ${className}`}
      >
        {title}
      </Button>
    </>
  );
}

export default PrimaryButton;
