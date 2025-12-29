
import { Button } from '@/components/ui/button';

function PrimaryButton({classes,title}:any) {
  return (
    <>
      <Button className={`bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl ${classes}`}>
              {title}
      </Button>
    </>
  )
}

export default PrimaryButton
