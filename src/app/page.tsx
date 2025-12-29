import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {Bell, Star, ChevronDown, Wallet } from 'lucide-react';
import Image from 'next/image';
import axiomlogo from '../../public/axiomlogo.svg'
import axiom from '../../public/axiom.svg'
import search from '../../public/search.svg'
import PrimaryButton from '@/components/atoms/button';


export default function Home() {
   return (
    <div className='bg-background min-h-screen text-foreground '>

      {/* header section */}

     <header className=" border-b border-border backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto md:px-6 px-2 h-16 flex items-center justify-between ">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              {/* <Triangle className="h-6 w-6 text-foreground" fill="currentColor" /> */}
              <Image  src={axiomlogo}  alt='logo' height={28} width={28}/>
              {/* <span className="font-bold text-lg tracking-tight">AXIOM</span> */}
              <Image className='hidden md:flex'  src={axiom}  alt='Axiom' height={72} width={100}/>

            </div>
            
            {/* Main Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              <Button variant="ghost" size="sm" className="text-primary font-normal">
                Discover
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground font-medium hover:text-primary">
                Pulse
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground font-medium hover:text-primary">
                Trackers
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground font-medium hover:text-primary">
                Perpetuals
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground font-medium hover:text-primary">
                Yield
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground font-medium hover:text-primary">
                Vision
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground font-medium hover:text-primary">
                Portfolio
              </Button>
              <Button variant="ghost" size="sm" className="text-foreground font-medium hover:text-primary">
                Rewards
              </Button>
            </nav>

            
          </div>
          
          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center relative">
              <Image className="absolute left-3 h-4 w-4 text-muted-foreground"  src={search} alt='search'/>
              <Input 
                placeholder="Search by token or CA..." 
                className="w-60 pl-9  border-border text-[6px] h-8 rounded-3xl"
              />
              <kbd className="absolute right-3 text-xs text-foreground bg-backround px-2 py-0.5  border-border border-2 rounded-[10px]">/</kbd>
            </div>
            
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="border-border gap-1.5">
                <span className="text-muted-foreground">≡</span>
                SOL
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
            
            {/* <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-2xl">
              Deposit
            </Button> */}

            <PrimaryButton classes="font-semibold rounded-2xl" title="Deposit" />
            
            <Button variant="ghost" size="icon" className="h-9 w-9 bg-muted rounded-2xl">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 bg-muted rounded-2xl">
              <Bell className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2 ml-2 bg-muted rounded-2xl h-9">
              <Badge variant="outline" className="border-border text-xs gap-1">
                <span className="text-muted-foreground">≡</span> 0
              </Badge>
              <Badge variant="outline" className="border-border text-xs gap-1">
                <Wallet className="h-3 w-3" /> 0
              </Badge>
            </div>

            <div className='h-9 w-9 bg-muted rounded-2xl'>
                  pro
            </div>
          </div> 


        </div>
     </header>


  </div>
   )
}
