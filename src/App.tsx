import React, { useState, useEffect, useRef } from 'react';
import { Coffee, Bus, Palette, Sun, Moon, Calendar, ChefHat, ChevronUp, ArrowLeft } from 'lucide-react';

const BUS_SCHEDULES = {
  'dinamo': {
    name: 'От м.Динамо',
    times: [
      '07:25', '07:45', '08:05', '08:15', '08:25', '08:35', '08:45', '08:55', 
      '09:05', '09:15', '09:25', '09:35', '09:45', '09:55', '10:05', '10:15', 
      '10:30', '10:45', '11:00', '11:30', '12:00', '12:30', '13:00', '15:30', 
      '16:00', '16:30', '16:35', '16:55', '17:00', '17:20', '17:35', '17:40', 
      '17:55', '18:00', '18:15', '18:20', '18:35', '18:40', '18:55', '19:00', 
      '19:15', '19:20', '19:35', '19:55', '20:15', '20:40', '21:00'
    ]
  },
  'arcus': {
    name: 'От АФК Arcus',
    times: [
      '07:30', '07:50', '08:10', '08:20', '08:30', '08:40', '08:50', '09:00', 
      '09:10', '09:20', '09:30', '09:40', '09:50', '10:00', '10:20', '10:50', 
      '11:00', '11:20', '11:50', '12:20', '12:50', '13:20', '15:20', '15:50', 
      '16:20', '16:45', '16:50', '17:05', '17:10', '17:25', '17:30', '17:45', 
      '17:50', '18:05', '18:10', '18:25', '18:30', '18:45', '18:50', '19:05', 
      '19:10', '19:25', '19:30', '19:45', '20:05', '20:30', '20:50', '21:15'
    ]
  }
};

const MEAL_SCHEDULE = {
  'понедельник': [
    { 
      name: 'Салат из молодой капусты со свеклой', 
      composition: 'капуста, свекла, петрушка, соль, сахар, уксус',
      calories: '79 ккал/100г', 
      proteins: '1.1 г', 
      fats: '6.8 г', 
      carbs: '4.1 г' 
    },
    { 
      name: 'Суп лапша с грибами', 
      composition: 'лапша, шампиньоны, зажарка, картофель, соль, перец',
      calories: '42 ккал/100г', 
      proteins: '1.1 г', 
      fats: '0.6 г', 
      carbs: '5.5 г' 
    },
    { 
      name: 'Биточки рыбные и овощи на пару', 
      composition: 'минтай, лук, панировочные сухари, соль, перец, растительное масло',
      calories: '246 ккал/100г', 
      proteins: '11.6 г', 
      fats: '16.5 г', 
      carbs: '13.9 г' 
    },
    { 
      name: 'Хлеб', 
      composition: '2 кусочка (70 грамм)',
      calories: '', 
      proteins: '', 
      fats: '', 
      carbs: '' 
    }
  ],
  'вторник': [
    { 
      name: 'Салат «крабовый»', 
      composition: 'крабовые палочки, огурцы, рис, кукуруза, яйцо, майонез, соль, перец',
      calories: '145 ккал/100г', 
      proteins: '4.1 г', 
      fats: '9.1 г', 
      carbs: '11.9 г' 
    },
    { 
      name: 'Суп фасолевый со свининой', 
      composition: 'свинина, фасоль, картошка, зажарка, соль, перец',
      calories: '49 ккал/100г', 
      proteins: '4.7 г', 
      fats: '1.6 г', 
      carbs: '3.9 г' 
    },
    { 
      name: 'Поджарка из индейки с гречкой', 
      composition: 'индейка, лук, масло растительное, соль, перец, грибы, перец болгарский, томат, гречка',
      calories: '279 ккал/100г', 
      proteins: '14.2 г', 
      fats: '13 г', 
      carbs: '27.2 г' 
    },
    { 
      name: 'Хлеб', 
      composition: '2 кусочка (70 грамм)',
      calories: '', 
      proteins: '', 
      fats: '', 
      carbs: '' 
    }
  ],
  'среда': [
    { 
      name: 'Салат овощной с болгарским перцем', 
      composition: 'помидор, огурцы, болгарский перец, соль, перец, масло растительное',
      calories: '62 ккал/100г', 
      proteins: '0.8 г', 
      fats: '5.2 г', 
      carbs: '3.9 г' 
    },
    { 
      name: 'Крем-суп сырный с брокколи', 
      composition: 'сыр плавленый, лук, сливки, картофель, брокколи, соль, перец',
      calories: '49 ккал/100г', 
      proteins: '4.7 г', 
      fats: '1.6 г', 
      carbs: '3.9 г' 
    },
    { 
      name: 'Куриное филе запеченное с песто и сыром и спагетти', 
      composition: 'куриное филе, сыр, майонез, соус, песто, масло растительное',
      calories: '388 ккал/100г', 
      proteins: '26.16 г', 
      fats: '7.32 г', 
      carbs: '7 г' 
    },
    { 
      name: 'Хлеб', 
      composition: '2 кусочка (70 грамм)',
      calories: '', 
      proteins: '', 
      fats: '', 
      carbs: '' 
    }
  ],
  'четверг': [
    { 
      name: 'Салат «Дубок»', 
      composition: 'куриное филе, картофель, лук, огурцы солёные, морковь, лук зелёный, яйцо, майонез',
      calories: '136 ккал/100г', 
      proteins: '8.8 г', 
      fats: '9.6 г', 
      carbs: '3.5 г' 
    },
    { 
      name: 'Солянка с курицей', 
      composition: 'куриное филе, картофель, лук, томатная паста, оливки, огурцы солёные, лимон',
      calories: '68 ккал/100г', 
      proteins: '4.1 г', 
      fats: '4.2 г', 
      carbs: '3 г' 
    },
    { 
      name: 'Куриное филе запеченное с песто и сыром и спагетти', 
      composition: 'куриное филе, сыр, майонез, соус, песто, масло растительное',
      calories: '307 ккал/100г', 
      proteins: '22.9 г', 
      fats: '13.2 г', 
      carbs: '30.7 г' 
    },
    { 
      name: 'Хлеб', 
      composition: '2 кусочка (70 грамм)',
      calories: '', 
      proteins: '', 
      fats: '', 
      carbs: '' 
    }
  ],
  'пятница': [
    { 
      name: 'Салат из молодой капусты с овощами', 
      composition: 'капуста, помидоры, огурцы, перец болгарский, перец, масло растительное, соль',
      calories: '109 ккал/100г', 
      proteins: '1.2 г', 
      fats: '10.1 г', 
      carbs: '4.1 г' 
    },
    { 
      name: 'Суп рыбный с треской', 
      composition: 'треска, картофель, специи, зелень, пшеница, соль, перец',
      calories: '40 ккал/100г', 
      proteins: '3.9 г', 
      fats: '0.3 г', 
      carbs: '5.2 г' 
    },
    { 
      name: 'Котлеты говяжьи и картофельное пюре', 
      composition: 'говядина, чеснок, лук, картофель, перец, панировочные сухари, соль, перец',
      calories: '324 ккал/100г', 
      proteins: '18.8 г', 
      fats: '18.4 г', 
      carbs: '22.8 г' 
    },
    { 
      name: 'Хлеб', 
      composition: '2 кусочка (70 грамм)',
      calories: '', 
      proteins: '', 
      fats: '', 
      carbs: '' 
    }
  ],
  'суббота': [
    { 
      name: 'Выходной день', 
      composition: 'Комплексные обеды не подаются в выходные дни',
      calories: '', 
      proteins: '', 
      fats: '', 
      carbs: '' 
    }
  ],
  'воскресенье': [
    { 
      name: 'Выходной день', 
      composition: 'Комплексные обеды не подаются в выходные дни',
      calories: '', 
      proteins: '', 
      fats: '', 
      carbs: '' 
    }
  ]
};

type Screen = 'meals' | 'bus' | 'design';
type BusDirection = 'dinamo' | 'arcus';

// Gravity simulation for logos
interface Logo {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('bus');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userThemeOverride, setUserThemeOverride] = useState<boolean | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextBus, setNextBus] = useState<string | null>(null);
  const [timeUntilBus, setTimeUntilBus] = useState<string>('');
  const [isNextDay, setIsNextDay] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showFullMealSchedule, setShowFullMealSchedule] = useState(false);
  const [selectedDirection, setSelectedDirection] = useState<BusDirection>('arcus');
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [logos, setLogos] = useState<Logo[]>([]);
  const [svgCopied, setSvgCopied] = useState(false);
  const todayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gravityContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  // Function to check collision between two logos
  const checkCollision = (logo1: Logo, logo2: Logo) => {
    const dx = logo1.x - logo2.x;
    const dy = logo1.y - logo2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = (logo1.size + logo2.size) / 2 + 5; // Added 5px buffer
    return distance < minDistance;
  };

  // Function to resolve collision between two logos
  const resolveCollision = (logo1: Logo, logo2: Logo) => {
    const dx = logo1.x - logo2.x;
    const dy = logo1.y - logo2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const minDistance = (logo1.size + logo2.size) / 2 + 5; // Added 5px buffer
    
    if (distance < minDistance && distance > 0) {
      // Normalize the collision vector
      const nx = dx / distance;
      const ny = dy / distance;
      
      // Separate the logos
      const overlap = minDistance - distance;
      const separationX = (overlap / 2) * nx;
      const separationY = (overlap / 2) * ny;
      
      logo1.x += separationX;
      logo1.y += separationY;
      logo2.x -= separationX;
      logo2.y -= separationY;
      
      // Calculate relative velocity
      const dvx = logo1.vx - logo2.vx;
      const dvy = logo1.vy - logo2.vy;
      
      // Calculate relative velocity in collision normal direction
      const dvn = dvx * nx + dvy * ny;
      
      // Do not resolve if velocities are separating
      if (dvn > 0) return;
      
      // Collision impulse
      const impulse = 2 * dvn / 2; // Assuming equal mass
      
      // Update velocities
      logo1.vx -= impulse * nx;
      logo1.vy -= impulse * ny;
      logo2.vx += impulse * nx;
      logo2.vy += impulse * ny;
    }
  };

  // Initialize logos for gravity simulation
  useEffect(() => {
    const initLogos = () => {
      const newLogos: Logo[] = [];
      const containerWidth = 332; // 380px - 48px padding
      const containerHeight = 436; // 500px - 64px padding
      
      for (let i = 0; i < 40; i++) { // Increased to 40 logos
        let attempts = 0;
        let validPosition = false;
        let newLogo: Logo;
        
        // Try to find a position that doesn't overlap with existing logos
        do {
          const size = Math.random() * 15 + 25; // Smaller size range: 25-40px
          newLogo = {
            id: i,
            x: Math.random() * (containerWidth - size - 20) + size / 2 + 10, // Added margin from edges
            y: Math.random() * (containerHeight - size - 20) + size / 2 + 10, // Added margin from edges
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            size: size,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 4
          };
          
          // Check if this position overlaps with any existing logo
          validPosition = true;
          for (const existingLogo of newLogos) {
            if (checkCollision(newLogo, existingLogo)) {
              validPosition = false;
              break;
            }
          }
          
          attempts++;
        } while (!validPosition && attempts < 100); // Increased attempts
        
        newLogos.push(newLogo);
      }
      setLogos(newLogos);
    };

    if (currentScreen === 'design') {
      initLogos();
    }
  }, [currentScreen]);

  // Gravity animation with collision detection
  useEffect(() => {
    if (currentScreen !== 'design' || logos.length === 0) return;

    const animate = () => {
      setLogos(prevLogos => {
        const containerWidth = 332; // 380px - 48px padding
        const containerHeight = 436; // 500px - 64px padding
        const gravity = 0.3;
        const bounce = 0.7;
        const friction = 0.99;

        const updatedLogos = prevLogos.map(logo => {
          // Apply gravity
          let newVy = logo.vy + gravity;
          let newVx = logo.vx * friction;
          let newX = logo.x + newVx;
          let newY = logo.y + newVy;

          // Collision detection with container walls - improved bounds checking
          if (newX <= logo.size / 2) {
            newX = logo.size / 2;
            newVx = Math.abs(newVx) * bounce; // Ensure positive velocity
          } else if (newX >= containerWidth - logo.size / 2) {
            newX = containerWidth - logo.size / 2;
            newVx = -Math.abs(newVx) * bounce; // Ensure negative velocity
          }

          // Collision detection with container floor and ceiling
          if (newY <= logo.size / 2) {
            newY = logo.size / 2;
            newVy = Math.abs(newVy) * bounce; // Ensure positive velocity
          } else if (newY >= containerHeight - logo.size / 2) {
            newY = containerHeight - logo.size / 2;
            newVy = -Math.abs(newVy) * bounce; // Ensure negative velocity
          }

          // Update rotation
          const newRotation = logo.rotation + logo.rotationSpeed;

          return {
            ...logo,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: newRotation
          };
        });

        // Handle logo-to-logo collisions
        for (let i = 0; i < updatedLogos.length; i++) {
          for (let j = i + 1; j < updatedLogos.length; j++) {
            resolveCollision(updatedLogos[i], updatedLogos[j]);
          }
        }

        return updatedLogos;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [currentScreen, logos.length]);

  // Handle click to scatter logos
  const handleGravityContainerClick = () => {
    setLogos(prevLogos => {
      return prevLogos.map(logo => ({
        ...logo,
        vx: (Math.random() - 0.5) * 20, // Strong random horizontal velocity
        vy: (Math.random() - 0.5) * 20 - 10, // Strong random vertical velocity (bias upward)
        rotationSpeed: (Math.random() - 0.5) * 15 // Faster rotation
      }));
    });
  };

  // Function to play toggle sound
  const playToggleSound = () => {
    try {
      // Create a subtle click sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Fallback: no sound if Web Audio API is not supported
      console.log('Audio not supported');
    }
  };

  // Function to copy SVG to clipboard
  const copySVGToClipboard = () => {
    const svgCode = `<svg width="172" height="46" viewBox="0 0 172 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M56.5415 6.53204C57.312 5.97614 57.4871 4.89929 56.9326 4.12682C56.3782 3.35435 55.3042 3.17878 54.5337 3.73468C53.7632 4.29057 53.5881 5.36742 54.1426 6.13989C54.697 6.91236 55.7711 7.08793 56.5415 6.53204Z" fill="#FB3D02"/>
<path d="M61.9715 3.98424C62.3815 3.12589 62.0198 2.09683 61.1637 1.68577C60.3076 1.2747 59.2813 1.6373 58.8713 2.49564C58.4613 3.35398 58.8229 4.38304 59.679 4.7941C60.5351 5.20517 61.5615 4.84258 61.9715 3.98424Z" fill="#FB3D02"/>
<path d="M14.9454 15.0239C15.9547 14.0739 16.4991 12.8086 16.4991 11.3439C16.4991 8.05975 13.7803 5.88379 9.66451 5.88379H3.25676C1.70302 5.88379 0.577148 7.07049 0.577148 8.61382V22.7385C0.577148 24.3211 1.70302 25.4685 3.25676 25.4685H10.9852C14.9856 25.4685 17.8198 23.0155 17.8198 19.534C17.8198 17.5162 16.8105 15.9335 14.9464 15.0239H14.9454ZM5.58582 10.1572H9.54698C10.945 10.1572 11.6441 10.7112 11.6441 11.7791C11.6441 12.8469 10.8677 13.4805 9.54698 13.4805H5.58582V10.1572ZM10.5563 21.1569H5.58582V17.2402H10.5563C12.0709 17.2402 13.0029 17.9524 13.0029 19.1391C13.0029 20.3258 12.0709 21.1569 10.5563 21.1569Z" fill="#FB3D02"/>
<path d="M30.0486 10.315C31.757 10.315 33.1169 11.1057 34.0871 12.2935C34.5531 12.8868 35.1356 13.1246 35.8738 13.1246C37.1554 13.1246 38.2039 12.0568 38.2039 10.7502C38.2039 10.315 38.0874 9.87977 37.7379 9.3257C36.2625 7.03086 33.2334 5.44824 29.9713 5.44824C24.1852 5.44824 19.6797 9.91905 19.6797 15.6562C19.6797 21.3933 24.1842 25.9437 29.9713 25.9437C33.3891 25.9437 36.1852 24.4406 37.7771 21.9473C38.0874 21.4728 38.2039 21.0769 38.2039 20.6025C38.2039 19.2969 37.1554 18.228 35.8738 18.228C35.1748 18.228 34.6315 18.4255 34.0871 19.0591C33.0385 20.2458 31.7178 21.0377 30.0486 21.0377C27.0968 21.0377 24.9997 18.8224 24.9997 15.6562C24.9997 12.4899 27.0968 10.315 30.0486 10.315Z" fill="#FB3D02"/>
<path d="M62.3553 8.32199C62.0686 7.58082 61.5304 7.07017 60.8706 6.82104C59.356 6.2494 58.0673 7.12702 57.6559 7.97673C57.3414 8.62591 57.2837 9.40532 57.5559 10.1868C59.1571 14.7879 58.7003 19.7197 54.6959 20.7451C56.8332 12.2191 53.8669 5.45654 47.8633 5.45654C41.8597 5.45654 40.3369 10.7088 40.3369 14.4044C40.3369 19.668 43.7403 25.9582 51.7832 25.9582C63.6677 25.9582 64.5709 14.0519 62.3542 8.32199H62.3553ZM50.4811 20.9436C45.724 19.7259 45.6745 15.5053 45.6745 14.4829C45.6745 12.3266 46.1869 10.2282 47.8633 10.2282C51.1265 10.2282 51.7152 16.9638 50.4811 20.9436Z" fill="#FB3D02"/>
<path d="M76.4187 10.315C78.1271 10.315 79.487 11.1057 80.4572 12.2935C80.9232 12.8868 81.5057 13.1246 82.244 13.1246C83.5255 13.1246 84.574 12.0568 84.574 10.7502C84.574 10.315 84.4575 9.87977 84.108 9.3257C82.6326 7.03086 79.6035 5.44824 76.3414 5.44824C70.5553 5.44824 66.0498 9.91905 66.0498 15.6562C66.0498 21.3933 70.5543 25.9437 76.3414 25.9437C79.7592 25.9437 82.5553 24.4406 84.1472 21.9473C84.4575 21.4728 84.574 21.0769 84.574 20.6025C84.574 19.2969 83.5255 18.228 82.244 18.228C81.5449 18.228 81.0016 18.4255 80.4572 19.0591C79.4087 20.2458 78.0879 21.0377 76.4187 21.0377C73.4669 21.0377 71.3698 18.8224 71.3698 15.6562C71.3698 12.4899 73.4669 10.315 76.4187 10.315Z" fill="#00005F"/>
<path d="M106.374 5.44824C105.481 5.44824 104.743 5.92272 104.238 6.55638L98.2566 14.549L92.2757 6.55638C91.7705 5.92375 91.0333 5.44824 90.1395 5.44824C88.6249 5.44824 87.499 6.63494 87.499 8.139V23.2136C87.499 24.757 88.6249 25.9437 90.1395 25.9437C91.654 25.9437 92.7417 24.757 92.7417 23.2136V15.498L96.6637 20.5621C97.0524 20.9973 97.6349 21.2351 98.2556 21.2351C98.8763 21.2351 99.4598 20.9973 99.8475 20.5621L103.769 15.498V23.2136C103.769 24.757 104.895 25.9437 106.372 25.9437C107.848 25.9437 109.012 24.757 109.012 23.2136V8.139C109.012 6.63598 107.886 5.44824 106.372 5.44824H106.374Z" fill="#00005F"/>
<path d="M143.504 5.44852C141.019 5.44852 138.961 6.35818 137.64 7.9408C137.563 6.47706 136.514 5.4082 135.116 5.4082C133.641 5.4082 132.514 6.55562 132.514 8.05864V30.3744C132.514 31.9178 133.64 33.0652 135.154 33.0652C136.669 33.0652 137.756 31.9178 137.756 30.3744V23.5695C139.077 25.0725 141.096 25.9439 143.504 25.9439C148.903 25.9439 152.825 21.592 152.825 15.6564C152.825 9.72085 148.903 5.44852 143.504 5.44852ZM142.533 21.0772C139.66 21.0772 137.679 18.862 137.679 15.6564C137.679 12.4509 139.62 10.2749 142.533 10.2749C145.446 10.2749 147.504 12.5305 147.504 15.6957C147.504 18.8609 145.407 21.0772 142.533 21.0772Z" fill="#00005F"/>
<path d="M169.171 5.84424H155.696C154.415 5.84424 153.443 6.8335 153.443 8.0998C153.443 9.3661 154.415 10.3554 155.696 10.3554H159.813V23.2147C159.813 24.7581 160.939 25.9448 162.415 25.9448C163.892 25.9448 165.018 24.7581 165.018 23.2147V10.3554H169.173C170.493 10.3554 171.425 9.40538 171.425 8.0998C171.425 6.79422 170.493 5.84424 169.173 5.84424H169.171Z" fill="#00005F"/>
<path d="M129.454 13.6954C129.454 8.31803 126.345 5.22206 120.902 5.24377C118.021 5.24377 115.444 6.12346 113.769 7.68436C113.119 8.20845 112.714 8.98064 112.653 9.81588C112.653 9.82311 112.653 9.83138 112.653 9.83862C112.691 11.0801 113.726 12.0549 114.964 12.0166C115.555 11.9991 116.12 11.7727 116.559 11.3768C117.591 10.4258 118.942 9.89754 120.344 9.89547C122.746 9.89547 124.307 11.4016 124.307 14.6154C124.307 14.6154 121.896 13.9445 119.244 13.9445C114.129 13.9445 111.682 16.4885 111.682 20.0052C111.682 23.5219 114.429 25.9046 118.496 25.9201C120.624 25.9852 122.695 25.2213 124.273 23.7886C124.52 25.0187 125.611 25.8942 126.862 25.8663C126.909 25.8663 126.956 25.8663 127.003 25.8643C128.413 25.8084 129.512 24.6155 129.455 23.2014V13.6944L129.454 13.6954ZM119.903 21.9393C118.138 21.9393 117.075 21.1288 117.075 19.8077C117.075 18.4867 117.885 17.4984 119.944 17.4984C122.003 17.4984 124.074 18.2892 124.074 18.2892C124.074 20.5272 122.278 21.9661 119.902 21.9393H119.903Z" fill="#00005F"/>
<path d="M3.27864 38.1187L4.7932 41.5568H5.10869L6.65522 38.1187H9.30596V45.1851H7.59138V39.9855H7.30785L5.79329 43.403H3.889L2.38475 39.9752H2.11153V45.1861H0.480469V38.1197H3.27864V38.1187Z" fill="#00005F"/>
<path d="M15.9875 38.1187L18.6279 45.1851H16.9134L16.3453 43.6666H12.9573L12.3893 45.1851H10.7695L13.3893 38.1187H15.9875ZM13.4729 42.2742H15.8298L14.841 39.6268H14.4513L13.4729 42.2742Z" fill="#00005F"/>
<path d="M25.5294 38.1187V39.5534H21.8157V45.1861H20.0908V38.1197H25.5294V38.1187Z" fill="#00005F"/>
<path d="M30.8107 38.1187L33.4512 45.1851H31.7366L31.1685 43.6666H27.7806L27.2125 45.1851H25.5928L28.2126 38.1187H30.8107ZM28.2961 42.2742H30.653L29.6642 39.6268H29.2745L28.2961 42.2742Z" fill="#00005F"/>
<path d="M37.9637 38.0132C39.8886 38.0132 41.099 38.7202 41.099 39.8697V40.0072C41.099 40.5137 40.8567 41.0089 40.2474 41.3149V41.6002C40.9309 41.8844 41.2681 42.4013 41.2681 43.1187V43.2562C41.2681 44.6486 39.9216 45.2916 37.9647 45.2916H37.7647C35.8501 45.2916 34.3984 44.6269 34.3984 42.7497V42.5812H36.145V42.76C36.145 43.6355 36.745 43.9519 37.7864 43.9519H37.9864C38.9751 43.9519 39.5226 43.6252 39.5226 43.129V43.0236C39.5226 42.4964 39.07 42.2328 38.2493 42.2328H36.9554V40.9034H38.2493C38.9854 40.9034 39.3535 40.6295 39.3535 40.1964V40.0703C39.3535 39.6382 38.9431 39.3425 37.9647 39.3425H37.7647C36.8069 39.3425 36.2285 39.6692 36.2285 40.3556V40.5241H34.4819V40.3556C34.4819 38.742 35.8388 38.0142 37.7637 38.0142H37.9637V38.0132Z" fill="#00005F"/>
<path d="M44.6548 38.1187V42.7704H44.9178L48.2531 38.1187H50.1677V45.1851H48.4737V40.5334H48.2108L44.8868 45.1851H42.9619V38.1187H44.6559H44.6548Z" fill="#00005F"/>
<path d="M53.8397 38.1187V40.8611H57.0802V38.1187H58.8051V45.1851H57.0802V42.2949H53.8397V45.1851H52.1035V38.1187H53.8397Z" fill="#00005F"/>
<path d="M64.8741 38.1187L66.7155 41.3563H67.1681L68.9147 38.1187H70.6395L66.8104 45.1852H65.0958L66.0423 43.4444L63.0234 38.1177H64.8751L64.8741 38.1187Z" fill="#00005F"/>
<path d="M74.7747 38.1187L76.2893 41.5568H76.6048L78.1513 38.1187H80.802V45.1851H79.0875V39.9855H78.8039L77.2894 43.403H75.3851L73.8808 39.9752H73.6076V45.1861H71.9766V38.1197H74.7747V38.1187Z" fill="#00005F"/>
<path d="M84.4745 38.1187V40.8611H87.715V38.1187H89.4399V45.1851H87.715V42.2949H84.4745V45.1851H82.7383V38.1187H84.4745Z" fill="#00005F"/>
<path d="M95.0994 38.0132C97.1511 38.0132 98.645 39.0676 98.645 41.0399V42.2845C98.645 44.2465 97.1511 45.2905 95.0994 45.2905H94.8261C92.7538 45.2905 91.2393 44.2465 91.2393 42.2845V41.0399C91.2393 39.0676 92.7538 38.0132 94.8261 38.0132H95.0994ZM92.9848 41.0823V42.2111C92.9848 43.2345 93.658 43.7823 94.8261 43.7823H95.0684C96.2149 43.7823 96.8985 43.2334 96.8985 42.2111V41.0823C96.8985 40.0692 96.2149 39.5214 95.0684 39.5214H94.8261C93.658 39.5214 92.9848 40.0703 92.9848 41.0823Z" fill="#00005F"/>
<path d="M102.128 38.1186V42.7703H102.39L105.726 38.1186H107.64V45.1851H105.946V40.5334H105.683L102.359 45.1851H100.435V38.1186H102.129H102.128ZM103.453 36.0615C103.453 36.536 103.653 36.7262 104.053 36.7262H104.127C104.474 36.7262 104.695 36.5257 104.695 36.0615H105.852C105.852 37.1159 105.221 37.5594 104.127 37.5594H104.021C102.938 37.5594 102.297 37.1159 102.297 36.0615H103.453Z" fill="#00005F"/>
<path d="M118.95 38.1187V39.5534H116.319V45.1861H114.583V39.5534H111.953V38.1187H118.949H118.95Z" fill="#00005F"/>
<path d="M126.334 38.1187V39.5214H122.137V40.9138H125.819V42.2535H122.137V43.772H126.387V45.1851H120.411V38.1187H126.334Z" fill="#00005F"/>
<path d="M129.743 38.1187L131.352 40.5448H131.805L133.372 38.1187H135.214L132.952 41.6312L135.35 45.1861H133.34L131.646 42.6649H131.163L129.553 45.1861H127.712L130.005 41.6002L127.733 38.1197H129.742L129.743 38.1187Z" fill="#00005F"/>
<path d="M138.548 38.1187V40.8611H141.788V38.1187H143.513V45.1851H141.788V42.2949H138.548V45.1851H136.812V38.1187H138.548Z" fill="#00005F"/>
<path d="M147.154 38.1187V42.7704H147.417L150.752 38.1187H152.667V45.1851H150.973V40.5334H150.71L147.386 45.1851H145.461V38.1187H147.155H147.154Z" fill="#00005F"/>
<path d="M156.326 38.1187V40.8611H156.652L159.293 38.1187H161.302L158.219 41.3149V41.6943L161.438 45.1851H159.313L156.652 42.2949H156.326V45.1851H154.602V38.1187H156.326Z" fill="#00005F"/>
<path d="M164.627 38.1187V42.7704H164.89L168.226 38.1187H170.14V45.1851H168.446V40.5334H168.183L164.859 45.1851H162.935V38.1187H164.629H164.627Z" fill="#00005F"/>
</svg>`;
    
    navigator.clipboard.writeText(svgCode).then(() => {
      setSvgCopied(true);
      // Reset the button text after 2 seconds
      setTimeout(() => {
        setSvgCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy SVG: ', err);
    });
  };

  // Function to download SVG file
  const downloadSVG = () => {
    const svgCode = `<svg width="172" height="46" viewBox="0 0 172 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M56.5415 6.53204C57.312 5.97614 57.4871 4.89929 56.9326 4.12682C56.3782 3.35435 55.3042 3.17878 54.5337 3.73468C53.7632 4.29057 53.5881 5.36742 54.1426 6.13989C54.697 6.91236 55.7711 7.08793 56.5415 6.53204Z" fill="#FB3D02"/>
<path d="M61.9715 3.98424C62.3815 3.12589 62.0198 2.09683 61.1637 1.68577C60.3076 1.2747 59.2813 1.6373 58.8713 2.49564C58.4613 3.35398 58.8229 4.38304 59.679 4.7941C60.5351 5.20517 61.5615 4.84258 61.9715 3.98424Z" fill="#FB3D02"/>
<path d="M14.9454 15.0239C15.9547 14.0739 16.4991 12.8086 16.4991 11.3439C16.4991 8.05975 13.7803 5.88379 9.66451 5.88379H3.25676C1.70302 5.88379 0.577148 7.07049 0.577148 8.61382V22.7385C0.577148 24.3211 1.70302 25.4685 3.25676 25.4685H10.9852C14.9856 25.4685 17.8198 23.0155 17.8198 19.534C17.8198 17.5162 16.8105 15.9335 14.9464 15.0239H14.9454ZM5.58582 10.1572H9.54698C10.945 10.1572 11.6441 10.7112 11.6441 11.7791C11.6441 12.8469 10.8677 13.4805 9.54698 13.4805H5.58582V10.1572ZM10.5563 21.1569H5.58582V17.2402H10.5563C12.0709 17.2402 13.0029 17.9524 13.0029 19.1391C13.0029 20.3258 12.0709 21.1569 10.5563 21.1569Z" fill="#FB3D02"/>
<path d="M30.0486 10.315C31.757 10.315 33.1169 11.1057 34.0871 12.2935C34.5531 12.8868 35.1356 13.1246 35.8738 13.1246C37.1554 13.1246 38.2039 12.0568 38.2039 10.7502C38.2039 10.315 38.0874 9.87977 37.7379 9.3257C36.2625 7.03086 33.2334 5.44824 29.9713 5.44824C24.1852 5.44824 19.6797 9.91905 19.6797 15.6562C19.6797 21.3933 24.1842 25.9437 29.9713 25.9437C33.3891 25.9437 36.1852 24.4406 37.7771 21.9473C38.0874 21.4728 38.2039 21.0769 38.2039 20.6025C38.2039 19.2969 37.1554 18.228 35.8738 18.228C35.1748 18.228 34.6315 18.4255 34.0871 19.0591C33.0385 20.2458 31.7178 21.0377 30.0486 21.0377C27.0968 21.0377 24.9997 18.8224 24.9997 15.6562C24.9997 12.4899 27.0968 10.315 30.0486 10.315Z" fill="#FB3D02"/>
<path d="M62.3553 8.32199C62.0686 7.58082 61.5304 7.07017 60.8706 6.82104C59.356 6.2494 58.0673 7.12702 57.6559 7.97673C57.3414 8.62591 57.2837 9.40532 57.5559 10.1868C59.1571 14.7879 58.7003 19.7197 54.6959 20.7451C56.8332 12.2191 53.8669 5.45654 47.8633 5.45654C41.8597 5.45654 40.3369 10.7088 40.3369 14.4044C40.3369 19.668 43.7403 25.9582 51.7832 25.9582C63.6677 25.9582 64.5709 14.0519 62.3542 8.32199H62.3553ZM50.4811 20.9436C45.724 19.7259 45.6745 15.5053 45.6745 14.4829C45.6745 12.3266 46.1869 10.2282 47.8633 10.2282C51.1265 10.2282 51.7152 16.9638 50.4811 20.9436Z" fill="#FB3D02"/>
<path d="M76.4187 10.315C78.1271 10.315 79.487 11.1057 80.4572 12.2935C80.9232 12.8868 81.5057 13.1246 82.244 13.1246C83.5255 13.1246 84.574 12.0568 84.574 10.7502C84.574 10.315 84.4575 9.87977 84.108 9.3257C82.6326 7.03086 79.6035 5.44824 76.3414 5.44824C70.5553 5.44824 66.0498 9.91905 66.0498 15.6562C66.0498 21.3933 70.5543 25.9437 76.3414 25.9437C79.7592 25.9437 82.5553 24.4406 84.1472 21.9473C84.4575 21.4728 84.574 21.0769 84.574 20.6025C84.574 19.2969 83.5255 18.228 82.244 18.228C81.5449 18.228 81.0016 18.4255 80.4572 19.0591C79.4087 20.2458 78.0879 21.0377 76.4187 21.0377C73.4669 21.0377 71.3698 18.8224 71.3698 15.6562C71.3698 12.4899 73.4669 10.315 76.4187 10.315Z" fill="#00005F"/>
<path d="M106.374 5.44824C105.481 5.44824 104.743 5.92272 104.238 6.55638L98.2566 14.549L92.2757 6.55638C91.7705 5.92375 91.0333 5.44824 90.1395 5.44824C88.6249 5.44824 87.499 6.63494 87.499 8.139V23.2136C87.499 24.757 88.6249 25.9437 90.1395 25.9437C91.654 25.9437 92.7417 24.757 92.7417 23.2136V15.498L96.6637 20.5621C97.0524 20.9973 97.6349 21.2351 98.2556 21.2351C98.8763 21.2351 99.4598 20.9973 99.8475 20.5621L103.769 15.498V23.2136C103.769 24.757 104.895 25.9437 106.372 25.9437C107.848 25.9437 109.012 24.757 109.012 23.2136V8.139C109.012 6.63598 107.886 5.44824 106.372 5.44824H106.374Z" fill="#00005F"/>
<path d="M143.504 5.44852C141.019 5.44852 138.961 6.35818 137.64 7.9408C137.563 6.47706 136.514 5.4082 135.116 5.4082C133.641 5.4082 132.514 6.55562 132.514 8.05864V30.3744C132.514 31.9178 133.64 33.0652 135.154 33.0652C136.669 33.0652 137.756 31.9178 137.756 30.3744V23.5695C139.077 25.0725 141.096 25.9439 143.504 25.9439C148.903 25.9439 152.825 21.592 152.825 15.6564C152.825 9.72085 148.903 5.44852 143.504 5.44852ZM142.533 21.0772C139.66 21.0772 137.679 18.862 137.679 15.6564C137.679 12.4509 139.62 10.2749 142.533 10.2749C145.446 10.2749 147.504 12.5305 147.504 15.6957C147.504 18.8609 145.407 21.0772 142.533 21.0772Z" fill="#00005F"/>
<path d="M169.171 5.84424H155.696C154.415 5.84424 153.443 6.8335 153.443 8.0998C153.443 9.3661 154.415 10.3554 155.696 10.3554H159.813V23.2147C159.813 24.7581 160.939 25.9448 162.415 25.9448C163.892 25.9448 165.018 24.7581 165.018 23.2147V10.3554H169.173C170.493 10.3554 171.425 9.40538 171.425 8.0998C171.425 6.79422 170.493 5.84424 169.173 5.84424H169.171Z" fill="#00005F"/>
<path d="M129.454 13.6954C129.454 8.31803 126.345 5.22206 120.902 5.24377C118.021 5.24377 115.444 6.12346 113.769 7.68436C113.119 8.20845 112.714 8.98064 112.653 9.81588C112.653 9.82311 112.653 9.83138 112.653 9.83862C112.691 11.0801 113.726 12.0549 114.964 12.0166C115.555 11.9991 116.12 11.7727 116.559 11.3768C117.591 10.4258 118.942 9.89754 120.344 9.89547C122.746 9.89547 124.307 11.4016 124.307 14.6154C124.307 14.6154 121.896 13.9445 119.244 13.9445C114.129 13.9445 111.682 16.4885 111.682 20.0052C111.682 23.5219 114.429 25.9046 118.496 25.9201C120.624 25.9852 122.695 25.2213 124.273 23.7886C124.52 25.0187 125.611 25.8942 126.862 25.8663C126.909 25.8663 126.956 25.8663 127.003 25.8643C128.413 25.8084 129.512 24.6155 129.455 23.2014V13.6944L129.454 13.6954ZM119.903 21.9393C118.138 21.9393 117.075 21.1288 117.075 19.8077C117.075 18.4867 117.885 17.4984 119.944 17.4984C122.003 17.4984 124.074 18.2892 124.074 18.2892C124.074 20.5272 122.278 21.9661 119.902 21.9393H119.903Z" fill="#00005F"/>
<path d="M3.27864 38.1187L4.7932 41.5568H5.10869L6.65522 38.1187H9.30596V45.1851H7.59138V39.9855H7.30785L5.79329 43.403H3.889L2.38475 39.9752H2.11153V45.1861H0.480469V38.1197H3.27864V38.1187Z" fill="#00005F"/>
<path d="M15.9875 38.1187L18.6279 45.1851H16.9134L16.3453 43.6666H12.9573L12.3893 45.1851H10.7695L13.3893 38.1187H15.9875ZM13.4729 42.2742H15.8298L14.841 39.6268H14.4513L13.4729 42.2742Z" fill="#00005F"/>
<path d="M25.5294 38.1187V39.5534H21.8157V45.1861H20.0908V38.1197H25.5294V38.1187Z" fill="#00005F"/>
<path d="M30.8107 38.1187L33.4512 45.1851H31.7366L31.1685 43.6666H27.7806L27.2125 45.1851H25.5928L28.2126 38.1187H30.8107ZM28.2961 42.2742H30.653L29.6642 39.6268H29.2745L28.2961 42.2742Z" fill="#00005F"/>
<path d="M37.9637 38.0132C39.8886 38.0132 41.099 38.7202 41.099 39.8697V40.0072C41.099 40.5137 40.8567 41.0089 40.2474 41.3149V41.6002C40.9309 41.8844 41.2681 42.4013 41.2681 43.1187V43.2562C41.2681 44.6486 39.9216 45.2916 37.9647 45.2916H37.7647C35.8501 45.2916 34.3984 44.6269 34.3984 42.7497V42.5812H36.145V42.76C36.145 43.6355 36.745 43.9519 37.7864 43.9519H37.9864C38.9751 43.9519 39.5226 43.6252 39.5226 43.129V43.0236C39.5226 42.4964 39.07 42.2328 38.2493 42.2328H36.9554V40.9034H38.2493C38.9854 40.9034 39.3535 40.6295 39.3535 40.1964V40.0703C39.3535 39.6382 38.9431 39.3425 37.9647 39.3425H37.7647C36.8069 39.3425 36.2285 39.6692 36.2285 40.3556V40.5241H34.4819V40.3556C34.4819 38.742 35.8388 38.0142 37.7637 38.0142H37.9637V38.0132Z" fill="#00005F"/>
<path d="M44.6548 38.1187V42.7704H44.9178L48.2531 38.1187H50.1677V45.1851H48.4737V40.5334H48.2108L44.8868 45.1851H42.9619V38.1187H44.6559H44.6548Z" fill="#00005F"/>
<path d="M53.8397 38.1187V40.8611H57.0802V38.1187H58.8051V45.1851H57.0802V42.2949H53.8397V45.1851H52.1035V38.1187H53.8397Z" fill="#00005F"/>
<path d="M64.8741 38.1187L66.7155 41.3563H67.1681L68.9147 38.1187H70.6395L66.8104 45.1852H65.0958L66.0423 43.4444L63.0234 38.1177H64.8751L64.8741 38.1187Z" fill="#00005F"/>
<path d="M74.7747 38.1187L76.2893 41.5568H76.6048L78.1513 38.1187H80.802V45.1851H79.0875V39.9855H78.8039L77.2894 43.403H75.3851L73.8808 39.9752H73.6076V45.1861H71.9766V38.1197H74.7747V38.1187Z" fill="#00005F"/>
<path d="M84.4745 38.1187V40.8611H87.715V38.1187H89.4399V45.1851H87.715V42.2949H84.4745V45.1851H82.7383V38.1187H84.4745Z" fill="#00005F"/>
<path d="M95.0994 38.0132C97.1511 38.0132 98.645 39.0676 98.645 41.0399V42.2845C98.645 44.2465 97.1511 45.2905 95.0994 45.2905H94.8261C92.7538 45.2905 91.2393 44.2465 91.2393 42.2845V41.0399C91.2393 39.0676 92.7538 38.0132 94.8261 38.0132H95.0994ZM92.9848 41.0823V42.2111C92.9848 43.2345 93.658 43.7823 94.8261 43.7823H95.0684C96.2149 43.7823 96.8985 43.2334 96.8985 42.2111V41.0823C96.8985 40.0692 96.2149 39.5214 95.0684 39.5214H94.8261C93.658 39.5214 92.9848 40.0703 92.9848 41.0823Z" fill="#00005F"/>
<path d="M102.128 38.1186V42.7703H102.39L105.726 38.1186H107.64V45.1851H105.946V40.5334H105.683L102.359 45.1851H100.435V38.1186H102.129H102.128ZM103.453 36.0615C103.453 36.536 103.653 36.7262 104.053 36.7262H104.127C104.474 36.7262 104.695 36.5257 104.695 36.0615H105.852C105.852 37.1159 105.221 37.5594 104.127 37.5594H104.021C102.938 37.5594 102.297 37.1159 102.297 36.0615H103.453Z" fill="#00005F"/>
<path d="M118.95 38.1187V39.5534H116.319V45.1861H114.583V39.5534H111.953V38.1187H118.949H118.95Z" fill="#00005F"/>
<path d="M126.334 38.1187V39.5214H122.137V40.9138H125.819V42.2535H122.137V43.772H126.387V45.1851H120.411V38.1187H126.334Z" fill="#00005F"/>
<path d="M129.743 38.1187L131.352 40.5448H131.805L133.372 38.1187H135.214L132.952 41.6312L135.35 45.1861H133.34L131.646 42.6649H131.163L129.553 45.1861H127.712L130.005 41.6002L127.733 38.1197H129.742L129.743 38.1187Z" fill="#00005F"/>
<path d="M138.548 38.1187V40.8611H141.788V38.1187H143.513V45.1851H141.788V42.2949H138.548V45.1851H136.812V38.1187H138.548Z" fill="#00005F"/>
<path d="M147.154 38.1187V42.7704H147.417L150.752 38.1187H152.667V45.1851H150.973V40.5334H150.71L147.386 45.1851H145.461V38.1187H147.155H147.154Z" fill="#00005F"/>
<path d="M156.326 38.1187V40.8611H156.652L159.293 38.1187H161.302L158.219 41.3149V41.6943L161.438 45.1851H159.313L156.652 42.2949H156.326V45.1851H154.602V38.1187H156.326Z" fill="#00005F"/>
<path d="M164.627 38.1187V42.7704H164.89L168.226 38.1187H170.14V45.1851H168.446V40.5334H168.183L164.859 45.1851H162.935V38.1187H164.629H164.627Z" fill="#00005F"/>
</svg>`;
    
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'logo.svg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Scroll detection for scroll-to-top button
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.scrollTop > 200) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    // Add scroll listeners to all scrollable containers
    const scrollableElements = document.querySelectorAll('.h-screen.overflow-y-auto');
    scrollableElements.forEach(element => {
      element.addEventListener('scroll', handleScroll);
    });

    return () => {
      scrollableElements.forEach(element => {
        element.removeEventListener('scroll', handleScroll);
      });
    };
  }, [currentScreen, showSchedule, showFullMealSchedule]);

  // Scroll to top function
  const scrollToTop = () => {
    const scrollableElement = document.querySelector('.h-screen.overflow-y-auto');
    if (scrollableElement) {
      scrollableElement.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  // Enhanced theme management with user override
  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      const isNightTime = hour >= 18 || hour < 8;
      
      // Apply theme: user override takes precedence, otherwise auto theme
      if (userThemeOverride !== null) {
        setIsDarkMode(userThemeOverride);
      } else {
        setIsDarkMode(isNightTime);
      }
    };
    
    updateTheme();
    const interval = setInterval(updateTheme, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [userThemeOverride]);

  const handleThemeToggle = () => {
    playToggleSound();
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    setUserThemeOverride(newTheme);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentSecond = now.getSeconds();
      const currentTotalSeconds = currentHour * 3600 + currentMinute * 60 + currentSecond;
      
      // Find next bus from current selected direction
      const currentSchedule = BUS_SCHEDULES[selectedDirection].times;
      let foundNextBus = null;
      let nextDay = true;
      
      for (const busTime of currentSchedule) {
        const [hour, minute] = busTime.split(':').map(Number);
        const busTotalSeconds = hour * 3600 + minute * 60;
        
        if (busTotalSeconds > currentTotalSeconds) {
          foundNextBus = busTime;
          nextDay = false;
          break;
        }
      }
      
      // If no bus found today, use first bus tomorrow
      if (!foundNextBus) {
        foundNextBus = currentSchedule[0];
        nextDay = true;
      }
      
      setNextBus(foundNextBus);
      setIsNextDay(nextDay);
      
      // Calculate time until next bus
      if (foundNextBus) {
        const [nextHour, nextMinute] = foundNextBus.split(':').map(Number);
        let targetTime = new Date();
        
        if (nextDay) {
          targetTime.setDate(targetTime.getDate() + 1);
        }
        
        targetTime.setHours(nextHour, nextMinute, 0, 0);
        
        const timeDiff = targetTime.getTime() - now.getTime();
        const hours = Math.floor(timeDiff / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        if (hours > 0) {
          setTimeUntilBus(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        } else {
          setTimeUntilBus(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedDirection]);

  const formatDate = (date: Date) => {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    
    return `${date.getDate()} ${months[date.getMonth()]}, ${days[date.getDay()]}`;
  };

  const getCurrentDay = () => {
    const days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    return days[currentTime.getDay()];
  };

  const scrollToToday = () => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  };

  const themeClasses = isDarkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-gray-100 text-gray-900';

  const cardClasses = isDarkMode 
    ? 'bg-[#242424] bg-opacity-40 backdrop-blur-[24px] text-white border border-white border-opacity-[0.07]' 
    : 'bg-white text-gray-900';

  const renderFullMealSchedule = () => (
    <div className={`h-screen overflow-y-auto ${themeClasses} p-6 pb-32`}>
      <div className="w-full max-w-[380px] min-w-[300px] mx-auto">
        <div className="fixed top-6 left-6 z-10">
          <button
            onClick={() => setShowFullMealSchedule(false)}
            className="flex items-center text-blue-600 text-base font-medium bg-white bg-opacity-90 backdrop-blur-[24px] px-4 py-2 rounded-lg shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </button>
        </div>
        
        <div className="pt-20">
          {/* Header Card */}
          <div className={`${cardClasses} rounded-2xl p-6 shadow-sm mb-6`}>
            <div className="flex items-center mb-4">
              <Calendar className={`w-[34px] h-[34px] mr-4 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Полное расписание на неделю
              </h2>
            </div>
            
            <button 
              onClick={scrollToToday}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-base font-semibold"
            >
              Посмотреть, что сегодня
            </button>
          </div>

          {/* Day Cards */}
          <div className="space-y-4 mb-32">
            {Object.entries(MEAL_SCHEDULE).map(([day, meals]) => {
              const isToday = day === getCurrentDay();
              const isWeekend = day === 'суббота' || day === 'воскресенье';
              return (
                <div 
                  key={day} 
                  ref={isToday ? todayRef : null}
                  className={`${cardClasses} rounded-2xl p-6 shadow-sm`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className={`text-xl font-bold capitalize ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{day}</h3>
                    {isToday && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        сегодня
                      </span>
                    )}
                  </div>
                  <div className="space-y-3">
                    {isWeekend ? (
                      <div className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-50'}`}>
                        <div className="flex items-center">
                          <ChefHat className={`w-8 h-8 mr-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`} />
                          <div>
                            <h4 className={`font-medium text-base mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              Выходной день
                            </h4>
                            <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              Комплексные обеды не подаются в выходные дни
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      meals.map((meal, index) => (
                        <div key={index} className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-50'}`}>
                          <h4 className={`font-medium text-base mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{meal.name}</h4>
                          {meal.composition && (
                            <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <span className="font-medium">Состав:</span> {meal.composition}
                            </p>
                          )}
                          {meal.calories && (
                            <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <span className="font-medium">{meal.calories}</span>
                            </p>
                          )}
                          {meal.proteins && (
                            <div className={`space-y-1 text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              <div>Белки: {meal.proteins}</div>
                              <div>Жиры: {meal.fats}</div>
                              <div>Углеводы: {meal.carbs}</div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}

            {/* Info Card */}
            <div className={`${cardClasses} rounded-2xl p-6 shadow-sm`}>
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-50'}`}>
                <p className={`text-base ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                  Если у вас появились вопросы, предложения или жалобы вы можете написать в 
                  <span className="font-medium"> телеграм чат</span> или 
                  <span className="font-medium"> телеграм</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMealsScreen = () => {
    if (showFullMealSchedule) {
      return renderFullMealSchedule();
    }

    const currentDay = getCurrentDay();
    const isWeekend = currentDay === 'суббота' || currentDay === 'воскресенье';
    const todayMeals = MEAL_SCHEDULE[currentDay as keyof typeof MEAL_SCHEDULE];

    return (
      <div className={`h-screen overflow-y-auto ${themeClasses} p-6 pb-32`}>
        <div className="w-full max-w-[380px] min-w-[300px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Coffee className={`w-[34px] h-[34px] mr-4 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>КОМПЛЕКСНЫЕ</h1>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>ОБЕДЫ</h1>
              </div>
            </div>
            <button
              onClick={handleThemeToggle}
              className="w-16 h-9 bg-gray-300 rounded-full relative transition-colors duration-200 flex items-center"
            >
              <div className={`w-9 h-9 bg-white rounded-full shadow-md transform transition-transform duration-200 ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`}>
                {isDarkMode ? <Moon className="w-4 h-4 text-gray-600 ml-2.5 mt-2.5" /> : <Sun className="w-4 h-4 text-yellow-500 ml-2.5 mt-2.5" />}
              </div>
            </button>
          </div>

          {/* Info Card */}
          <div className={`${cardClasses} rounded-2xl p-6 mb-6 shadow-sm`}>
            <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Одна порция на человека
            </h2>
            <p className={`text-base mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              После 19:00 остатки можно забрать. До этого времени все успеют поесть и никто не уйдёт без своей порции еды
            </p>
            <button 
              onClick={() => setShowFullMealSchedule(true)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-base font-semibold"
            >
              Полное расписание
            </button>
          </div>

          {/* Today's Meal Card */}
          <div className={`${cardClasses} rounded-2xl p-6 shadow-sm mb-32`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Обед на сегодня
              </h2>
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {formatDate(currentTime).split(', ')[1]}
              </span>
            </div>

            {isWeekend ? (
              <div className="py-6">
                <ChefHat className={`w-16 h-16 mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`} />
                <h3 className={`text-lg font-semibold mb-0.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Сегодня обедов нет
                </h3>
                <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Комплексные обеды подаются<br />только в будние дни
                </p>
              </div>
            ) : todayMeals ? (
              <div className="space-y-3">
                {todayMeals.map((meal, index) => (
                  <div key={index} className={`rounded-xl p-4 ${isDarkMode ? 'bg-gray-700 bg-opacity-50' : 'bg-gray-50'}`}>
                    <h4 className={`font-medium text-base mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{meal.name}</h4>
                    {meal.composition && (
                      <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-medium">Состав:</span> {meal.composition}
                      </p>
                    )}
                    {meal.calories && (
                      <p className={`text-base mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <span className="font-medium">{meal.calories}</span>
                      </p>
                    )}
                    {meal.proteins && (
                      <div className={`space-y-1 text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <div>Белки: {meal.proteins}</div>
                        <div>Жиры: {meal.fats}</div>
                        <div>Углеводы: {meal.carbs}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8">
                <ChefHat className={`w-16 h-16 mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-300'}`} />
                <h3 className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Меню на сегодня не найдено
                </h3>
                <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Проверьте полное расписание для получения информации
                </p>
              </div>
            )}

            <div className={`mt-6 p-4 rounded-xl ${isDarkMode ? 'bg-blue-900 bg-opacity-50' : 'bg-blue-50'}`}>
              <p className={`text-base ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                Если у вас появились вопросы, предложения или жалобы вы можете написать в 
                <span className="font-medium"> телеграм чат</span> или 
                <span className="font-medium"> телеграм</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBusScreen = () => {
    if (showSchedule) {
      return (
        <div className={`h-screen overflow-y-auto ${themeClasses} p-6 pb-32`}>
          <div className="w-full max-w-[380px] min-w-[300px] mx-auto">
            <div className="fixed top-6 left-6 z-10">
              <button
                onClick={() => setShowSchedule(false)}
                className="flex items-center mb-6 text-blue-600 text-base font-medium bg-white bg-opacity-90 backdrop-blur-[24px] px-4 py-2 rounded-lg shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад
              </button>
            </div>
            
            <div className="pt-20">
              {/* Direction Toggle - at the top without background */}
              <div className={`flex p-1 mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ borderRadius: '10px' }}>
                <button
                  onClick={() => setSelectedDirection('arcus')}
                  className={`flex-1 py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none ${
                    selectedDirection === 'arcus'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isDarkMode 
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  От АФК Arcus
                </button>
                <button
                  onClick={() => setSelectedDirection('dinamo')}
                  className={`flex-1 py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none ${
                    selectedDirection === 'dinamo'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : isDarkMode 
                        ? 'text-gray-300 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  От м.Динамо
                </button>
              </div>
              
              <div className={`${cardClasses} rounded-2xl p-8 shadow-sm`}>
                <h2 className={`text-2xl font-bold mb-6 text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Расписание автобусов
                </h2>
                
                {/* Schedule Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {BUS_SCHEDULES[selectedDirection].times.map((time, index) => (
                    <div
                      key={index}
                      className={`
                        p-3 rounded-lg text-center transition-all duration-200
                        ${time === nextBus && !isNextDay && selectedDirection === selectedDirection
                          ? 'bg-blue-600 text-white shadow-lg' 
                          : isDarkMode 
                            ? 'bg-gray-700 bg-opacity-50 text-white hover:bg-gray-600' 
                            : 'bg-gray-50 text-gray-900 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="text-lg font-semibold">
                        {time}
                      </div>
                      {time === nextBus && !isNextDay && (
                        <div className="text-xs opacity-90 mt-1">следующий</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className={`h-screen overflow-y-auto ${themeClasses} p-6 pb-32`}>
        <div className="w-full max-w-[380px] min-w-[300px] mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Bus className={`w-[34px] h-[34px] mr-4 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>РАСПИСАНИЕ</h1>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>АВТОБУСОВ</h1>
              </div>
            </div>
            <button
              onClick={handleThemeToggle}
              className="w-16 h-9 bg-gray-300 rounded-full relative transition-colors duration-200 flex items-center"
            >
              <div className={`w-9 h-9 bg-white rounded-full shadow-md transform transition-transform duration-200 ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`}>
                {isDarkMode ? <Moon className="w-4 h-4 text-gray-600 ml-2.5 mt-2.5" /> : <Sun className="w-4 h-4 text-yellow-500 ml-2.5 mt-2.5" />}
              </div>
            </button>
          </div>

          {/* Direction Toggle - at the top without background */}
          <div className={`flex p-1 mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ borderRadius: '10px' }}>
            <button
              onClick={() => setSelectedDirection('arcus')}
              className={`flex-1 py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none ${
                selectedDirection === 'arcus'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              От АФК Arcus
            </button>
            <button
              onClick={() => setSelectedDirection('dinamo')}
              className={`flex-1 py-3 px-4 rounded-lg text-base font-medium transition-all duration-200 focus:outline-none ${
                selectedDirection === 'dinamo'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : isDarkMode 
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              От м.Динамо
            </button>
          </div>

          <div className="space-y-6 mb-8">
            {/* Next Bus Card */}
            <div className={`${cardClasses} rounded-2xl p-8 shadow-sm`}>
              <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Следующий автобус
              </h2>
              <p className={`text-base mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {BUS_SCHEDULES[selectedDirection].name}
              </p>
              <div className={`text-5xl font-bold mb-2 font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Через {timeUntilBus}
              </div>
              <div className={`text-lg opacity-70 mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Прибытие в {nextBus}
              </div>
              
              <button
                onClick={() => setShowSchedule(true)}
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Посмотреть расписание
              </button>
            </div>

            {/* Current Time Card */}
            <div className={`${cardClasses} rounded-2xl p-8 shadow-sm`}>
              <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Сейчас в Москве
              </h2>
              <div className={`text-5xl font-bold mb-2 font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {currentTime.toTimeString().slice(0, 8)}
              </div>
              <div className={`text-lg opacity-70 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {formatDate(currentTime)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDesignScreen = () => (
    <div className={`h-screen overflow-y-auto ${themeClasses} p-6 pb-32`}>
      <div className="w-full max-w-[380px] min-w-[300px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Palette className={`w-[34px] h-[34px] mr-4 ${isDarkMode ? 'text-white' : 'text-blue-600'}`} />
            <div>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>МАТЕРИАЛЫ</h1>
              <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>БРЕНДА</h1>
            </div>
          </div>
          <button
            onClick={handleThemeToggle}
            className="w-16 h-9 bg-gray-300 rounded-full relative transition-colors duration-200 flex items-center"
          >
            <div className={`w-9 h-9 bg-white rounded-full shadow-md transform transition-transform duration-200 ${isDarkMode ? 'translate-x-7' : 'translate-x-0'}`}>
              {isDarkMode ? <Moon className="w-4 h-4 text-gray-600 ml-2.5 mt-2.5" /> : <Sun className="w-4 h-4 text-yellow-500 ml-2.5 mt-2.5" />}
            </div>
          </button>
        </div>

        {/* Content Card */}
        <div className={`${cardClasses} rounded-2xl p-8 shadow-sm mb-6`}>
          <div className="flex items-center mb-6">
            <img 
              src="/1_1.gif" 
              alt="Brand Animation" 
              className="w-16 h-16 mr-4 rounded-lg"
            />
            <div>
              <p className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Здесь можно найти материалы, которые используют команды дизайна и маркетинга.
              </p>
            </div>
          </div>
        </div>

        {/* Table of Sizes Card */}
        <div className={`${cardClasses} rounded-2xl p-8 shadow-sm mb-6`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Таблица размеров
          </h2>
          
          <div className="mb-6">
            <img 
              src="/tableofsizes.png" 
              alt="Table of Sizes" 
              className="w-full rounded-lg shadow-sm"
            />
          </div>
          
          <button 
            onClick={() => window.open('https://docs.google.com/spreadsheets/d/1QqD-8F5Ebp4TWfTP_xC05Wire0Cb8NEozbHOTOVK4m0/edit?gid=0#gid=0', '_blank')}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Перейти к в таблицу
          </button>
        </div>

        {/* SVG Logo Card */}
        <div className={`${cardClasses} rounded-2xl p-8 shadow-sm mb-6`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            SVG Логотип
          </h2>
          
          <div className="mb-6 p-6 bg-gray-50 rounded-lg flex items-center justify-center">
            <svg width="172" height="46" viewBox="0 0 172 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M56.5415 6.53204C57.312 5.97614 57.4871 4.89929 56.9326 4.12682C56.3782 3.35435 55.3042 3.17878 54.5337 3.73468C53.7632 4.29057 53.5881 5.36742 54.1426 6.13989C54.697 6.91236 55.7711 7.08793 56.5415 6.53204Z" fill="#FB3D02"/>
              <path d="M61.9715 3.98424C62.3815 3.12589 62.0198 2.09683 61.1637 1.68577C60.3076 1.2747 59.2813 1.6373 58.8713 2.49564C58.4613 3.35398 58.8229 4.38304 59.679 4.7941C60.5351 5.20517 61.5615 4.84258 61.9715 3.98424Z" fill="#FB3D02"/>
              <path d="M14.9454 15.0239C15.9547 14.0739 16.4991 12.8086 16.4991 11.3439C16.4991 8.05975 13.7803 5.88379 9.66451 5.88379H3.25676C1.70302 5.88379 0.577148 7.07049 0.577148 8.61382V22.7385C0.577148 24.3211 1.70302 25.4685 3.25676 25.4685H10.9852C14.9856 25.4685 17.8198 23.0155 17.8198 19.534C17.8198 17.5162 16.8105 15.9335 14.9464 15.0239H14.9454ZM5.58582 10.1572H9.54698C10.945 10.1572 11.6441 10.7112 11.6441 11.7791C11.6441 12.8469 10.8677 13.4805 9.54698 13.4805H5.58582V10.1572ZM10.5563 21.1569H5.58582V17.2402H10.5563C12.0709 17.2402 13.0029 17.9524 13.0029 19.1391C13.0029 20.3258 12.0709 21.1569 10.5563 21.1569Z" fill="#FB3D02"/>
              <path d="M30.0486 10.315C31.757 10.315 33.1169 11.1057 34.0871 12.2935C34.5531 12.8868 35.1356 13.1246 35.8738 13.1246C37.1554 13.1246 38.2039 12.0568 38.2039 10.7502C38.2039 10.315 38.0874 9.87977 37.7379 9.3257C36.2625 7.03086 33.2334 5.44824 29.9713 5.44824C24.1852 5.44824 19.6797 9.91905 19.6797 15.6562C19.6797 21.3933 24.1842 25.9437 29.9713 25.9437C33.3891 25.9437 36.1852 24.4406 37.7771 21.9473C38.0874 21.4728 38.2039 21.0769 38.2039 20.6025C38.2039 19.2969 37.1554 18.228 35.8738 18.228C35.1748 18.228 34.6315 18.4255 34.0871 19.0591C33.0385 20.2458 31.7178 21.0377 30.0486 21.0377C27.0968 21.0377 24.9997 18.8224 24.9997 15.6562C24.9997 12.4899 27.0968 10.315 30.0486 10.315Z" fill="#FB3D02"/>
              <path d="M62.3553 8.32199C62.0686 7.58082 61.5304 7.07017 60.8706 6.82104C59.356 6.2494 58.0673 7.12702 57.6559 7.97673C57.3414 8.62591 57.2837 9.40532 57.5559 10.1868C59.1571 14.7879 58.7003 19.7197 54.6959 20.7451C56.8332 12.2191 53.8669 5.45654 47.8633 5.45654C41.8597 5.45654 40.3369 10.7088 40.3369 14.4044C40.3369 19.668 43.7403 25.9582 51.7832 25.9582C63.6677 25.9582 64.5709 14.0519 62.3542 8.32199H62.3553ZM50.4811 20.9436C45.724 19.7259 45.6745 15.5053 45.6745 14.4829C45.6745 12.3266 46.1869 10.2282 47.8633 10.2282C51.1265 10.2282 51.7152 16.9638 50.4811 20.9436Z" fill="#FB3D02"/>
              <path d="M76.4187 10.315C78.1271 10.315 79.487 11.1057 80.4572 12.2935C80.9232 12.8868 81.5057 13.1246 82.244 13.1246C83.5255 13.1246 84.574 12.0568 84.574 10.7502C84.574 10.315 84.4575 9.87977 84.108 9.3257C82.6326 7.03086 79.6035 5.44824 76.3414 5.44824C70.5553 5.44824 66.0498 9.91905 66.0498 15.6562C66.0498 21.3933 70.5543 25.9437 76.3414 25.9437C79.7592 25.9437 82.5553 24.4406 84.1472 21.9473C84.4575 21.4728 84.574 21.0769 84.574 20.6025C84.574 19.2969 83.5255 18.228 82.244 18.228C81.5449 18.228 81.0016 18.4255 80.4572 19.0591C79.4087 20.2458 78.0879 21.0377 76.4187 21.0377C73.4669 21.0377 71.3698 18.8224 71.3698 15.6562C71.3698 12.4899 73.4669 10.315 76.4187 10.315Z" fill="#00005F"/>
              <path d="M106.374 5.44824C105.481 5.44824 104.743 5.92272 104.238 6.55638L98.2566 14.549L92.2757 6.55638C91.7705 5.92375 91.0333 5.44824 90.1395 5.44824C88.6249 5.44824 87.499 6.63494 87.499 8.139V23.2136C87.499 24.757 88.6249 25.9437 90.1395 25.9437C91.654 25.9437 92.7417 24.757 92.7417 23.2136V15.498L96.6637 20.5621C97.0524 20.9973 97.6349 21.2351 98.2556 21.2351C98.8763 21.2351 99.4598 20.9973 99.8475 20.5621L103.769 15.498V23.2136C103.769 24.757 104.895 25.9437 106.372 25.9437C107.848 25.9437 109.012 24.757 109.012 23.2136V8.139C109.012 6.63598 107.886 5.44824 106.372 5.44824H106.374Z" fill="#00005F"/>
              <path d="M143.504 5.44852C141.019 5.44852 138.961 6.35818 137.64 7.9408C137.563 6.47706 136.514 5.4082 135.116 5.4082C133.641 5.4082 132.514 6.55562 132.514 8.05864V30.3744C132.514 31.9178 133.64 33.0652 135.154 33.0652C136.669 33.0652 137.756 31.9178 137.756 30.3744V23.5695C139.077 25.0725 141.096 25.9439 143.504 25.9439C148.903 25.9439 152.825 21.592 152.825 15.6564C152.825 9.72085 148.903 5.44852 143.504 5.44852ZM142.533 21.0772C139.66 21.0772 137.679 18.862 137.679 15.6564C137.679 12.4509 139.62 10.2749 142.533 10.2749C145.446 10.2749 147.504 12.5305 147.504 15.6957C147.504 18.8609 145.407 21.0772 142.533 21.0772Z" fill="#00005F"/>
              <path d="M169.171 5.84424H155.696C154.415 5.84424 153.443 6.8335 153.443 8.0998C153.443 9.3661 154.415 10.3554 155.696 10.3554H159.813V23.2147C159.813 24.7581 160.939 25.9448 162.415 25.9448C163.892 25.9448 165.018 24.7581 165.018 23.2147V10.3554H169.173C170.493 10.3554 171.425 9.40538 171.425 8.0998C171.425 6.79422 170.493 5.84424 169.173 5.84424H169.171Z" fill="#00005F"/>
              <path d="M129.454 13.6954C129.454 8.31803 126.345 5.22206 120.902 5.24377C118.021 5.24377 115.444 6.12346 113.769 7.68436C113.119 8.20845 112.714 8.98064 112.653 9.81588C112.653 9.82311 112.653 9.83138 112.653 9.83862C112.691 11.0801 113.726 12.0549 114.964 12.0166C115.555 11.9991 116.12 11.7727 116.559 11.3768C117.591 10.4258 118.942 9.89754 120.344 9.89547C122.746 9.89547 124.307 11.4016 124.307 14.6154C124.307 14.6154 121.896 13.9445 119.244 13.9445C114.129 13.9445 111.682 16.4885 111.682 20.0052C111.682 23.5219 114.429 25.9046 118.496 25.9201C120.624 25.9852 122.695 25.2213 124.273 23.7886C124.52 25.0187 125.611 25.8942 126.862 25.8663C126.909 25.8663 126.956 25.8663 127.003 25.8643C128.413 25.8084 129.512 24.6155 129.455 23.2014V13.6944L129.454 13.6954ZM119.903 21.9393C118.138 21.9393 117.075 21.1288 117.075 19.8077C117.075 18.4867 117.885 17.4984 119.944 17.4984C122.003 17.4984 124.074 18.2892 124.074 18.2892C124.074 20.5272 122.278 21.9661 119.902 21.9393H119.903Z" fill="#00005F"/>
              <path d="M3.27864 38.1187L4.7932 41.5568H5.10869L6.65522 38.1187H9.30596V45.1851H7.59138V39.9855H7.30785L5.79329 43.403H3.889L2.38475 39.9752H2.11153V45.1861H0.480469V38.1197H3.27864V38.1187Z" fill="#00005F"/>
              <path d="M15.9875 38.1187L18.6279 45.1851H16.9134L16.3453 43.6666H12.9573L12.3893 45.1851H10.7695L13.3893 38.1187H15.9875ZM13.4729 42.2742H15.8298L14.841 39.6268H14.4513L13.4729 42.2742Z" fill="#00005F"/>
              <path d="M25.5294 38.1187V39.5534H21.8157V45.1861H20.0908V38.1197H25.5294V38.1187Z" fill="#00005F"/>
              <path d="M30.8107 38.1187L33.4512 45.1851H31.7366L31.1685 43.6666H27.7806L27.2125 45.1851H25.5928L28.2126 38.1187H30.8107ZM28.2961 42.2742H30.653L29.6642 39.6268H29.2745L28.2961 42.2742Z" fill="#00005F"/>
              <path d="M37.9637 38.0132C39.8886 38.0132 41.099 38.7202 41.099 39.8697V40.0072C41.099 40.5137 40.8567 41.0089 40.2474 41.3149V41.6002C40.9309 41.8844 41.2681 42.4013 41.2681 43.1187V43.2562C41.2681 44.6486 39.9216 45.2916 37.9647 45.2916H37.7647C35.8501 45.2916 34.3984 44.6269 34.3984 42.7497V42.5812H36.145V42.76C36.145 43.6355 36.745 43.9519 37.7864 43.9519H37.9864C38.9751 43.9519 39.5226 43.6252 39.5226 43.129V43.0236C39.5226 42.4964 39.07 42.2328 38.2493 42.2328H36.9554V40.9034H38.2493C38.9854 40.9034 39.3535 40.6295 39.3535 40.1964V40.0703C39.3535 39.6382 38.9431 39.3425 37.9647 39.3425H37.7647C36.8069 39.3425 36.2285 39.6692 36.2285 40.3556V40.5241H34.4819V40.3556C34.4819 38.742 35.8388 38.0142 37.7637 38.0142H37.9637V38.0132Z" fill="#00005F"/>
              <path d="M44.6548 38.1187V42.7704H44.9178L48.2531 38.1187H50.1677V45.1851H48.4737V40.5334H48.2108L44.8868 45.1851H42.9619V38.1187H44.6559H44.6548Z" fill="#00005F"/>
              <path d="M53.8397 38.1187V40.8611H57.0802V38.1187H58.8051V45.1851H57.0802V42.2949H53.8397V45.1851H52.1035V38.1187H53.8397Z" fill="#00005F"/>
              <path d="M64.8741 38.1187L66.7155 41.3563H67.1681L68.9147 38.1187H70.6395L66.8104 45.1852H65.0958L66.0423 43.4444L63.0234 38.1177H64.8751L64.8741 38.1187Z" fill="#00005F"/>
              <path d="M74.7747 38.1187L76.2893 41.5568H76.6048L78.1513 38.1187H80.802V45.1851H79.0875V39.9855H78.8039L77.2894 43.403H75.3851L73.8808 39.9752H73.6076V45.1861H71.9766V38.1197H74.7747V38.1187Z" fill="#00005F"/>
              <path d="M84.4745 38.1187V40.8611H87.715V38.1187H89.4399V45.1851H87.715V42.2949H84.4745V45.1851H82.7383V38.1187H84.4745Z" fill="#00005F"/>
              <path d="M95.0994 38.0132C97.1511 38.0132 98.645 39.0676 98.645 41.0399V42.2845C98.645 44.2465 97.1511 45.2905 95.0994 45.2905H94.8261C92.7538 45.2905 91.2393 44.2465 91.2393 42.2845V41.0399C91.2393 39.0676 92.7538 38.0132 94.8261 38.0132H95.0994ZM92.9848 41.0823V42.2111C92.9848 43.2345 93.658 43.7823 94.8261 43.7823H95.0684C96.2149 43.7823 96.8985 43.2334 96.8985 42.2111V41.0823C96.8985 40.0692 96.2149 39.5214 95.0684 39.5214H94.8261C93.658 39.5214 92.9848 40.0703 92.9848 41.0823Z" fill="#00005F"/>
              <path d="M102.128 38.1186V42.7703H102.39L105.726 38.1186H107.64V45.1851H105.946V40.5334H105.683L102.359 45.1851H100.435V38.1186H102.129H102.128ZM103.453 36.0615C103.453 36.536 103.653 36.7262 104.053 36.7262H104.127C104.474 36.7262 104.695 36.5257 104.695 36.0615H105.852C105.852 37.1159 105.221 37.5594 104.127 37.5594H104.021C102.938 37.5594 102.297 37.1159 102.297 36.0615H103.453Z" fill="#00005F"/>
              <path d="M118.95 38.1187V39.5534H116.319V45.1861H114.583V39.5534H111.953V38.1187H118.949H118.95Z" fill="#00005F"/>
              <path d="M126.334 38.1187V39.5214H122.137V40.9138H125.819V42.2535H122.137V43.772H126.387V45.1851H120.411V38.1187H126.334Z" fill="#00005F"/>
              <path d="M129.743 38.1187L131.352 40.5448H131.805L133.372 38.1187H135.214L132.952 41.6312L135.35 45.1861H133.34L131.646 42.6649H131.163L129.553 45.1861H127.712L130.005 41.6002L127.733 38.1197H129.742L129.743 38.1187Z" fill="#00005F"/>
              <path d="M138.548 38.1187V40.8611H141.788V38.1187H143.513V45.1851H141.788V42.2949H138.548V45.1851H136.812V38.1187H138.548Z" fill="#00005F"/>
              <path d="M147.154 38.1187V42.7704H147.417L150.752 38.1187H152.667V45.1851H150.973V40.5334H150.71L147.386 45.1851H145.461V38.1187H147.155H147.154Z" fill="#00005F"/>
              <path d="M156.326 38.1187V40.8611H156.652L159.293 38.1187H161.302L158.219 41.3149V41.6943L161.438 45.1851H159.313L156.652 42.2949H156.326V45.1851H154.602V38.1187H156.326Z" fill="#00005F"/>
              <path d="M164.627 38.1187V42.7704H164.89L168.226 38.1187H170.14V45.1851H168.446V40.5334H168.183L164.859 45.1851H162.935V38.1187H164.629H164.627Z" fill="#00005F"/>
            </svg>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={copySVGToClipboard}
              className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg text-base font-semibold hover:bg-gray-700 transition-colors duration-200"
            >
              
              {svgCopied ? 'SVG скопирован' : 'Скопировать SVG'}
            </button>
            <button 
              onClick={downloadSVG}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg text-base font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Скачать SVG
            </button>
          </div>
        </div>

        {/* Gravity Block */}
        <div 
          className={`${cardClasses} rounded-2xl p-6 shadow-sm relative overflow-hidden cursor-pointer`} 
          style={{ height: '500px' }}
          onClick={handleGravityContainerClick}
        >
          <div 
            ref={gravityContainerRef}
            className="absolute inset-6 rounded-xl overflow-hidden"
            style={{ 
              background: isDarkMode 
                ? 'linear-gradient(135deg, rgba(55, 65, 81, 0.3) 0%, rgba(31, 41, 55, 0.5) 100%)' 
                : 'linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(243, 244, 246, 1) 100%)'
            }}
          >
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="absolute transition-none pointer-events-none"
                style={{
                  left: `${logo.x - logo.size / 2}px`,
                  top: `${logo.y - logo.size / 2}px`,
                  width: `${logo.size}px`,
                  height: `${logo.size}px`,
                  transform: `rotate(${logo.rotation}deg)`,
                  opacity: 0.8
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 386 408"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M230.878 91.1024C244.868 88.8024 254.345 75.5966 252.045 61.6064C249.745 47.6162 236.539 38.1394 222.549 40.4394C208.559 42.7394 199.082 55.9451 201.382 69.9353C203.682 83.9255 216.888 93.4024 230.878 91.1024Z" fill="#E63312"/>
                  <path d="M291.268 55.0776C305.258 52.7776 314.735 39.5718 312.435 25.5816C310.135 11.5914 296.929 2.11461 282.939 4.41458C268.949 6.71454 259.472 19.9203 261.772 33.9105C264.072 47.9007 277.278 57.3775 291.268 55.0776Z" fill="#E63312"/>
                  <g filter="url(#filter0_d_163_192)">
                    <path d="M329.767 97.9944C327.085 93.3233 323.429 89.2785 319.046 86.1312C314.663 82.9839 309.654 80.8067 304.353 79.7457C295.217 77.7289 285.651 79.1147 277.461 83.6413C269.272 88.1679 263.027 95.5216 259.907 104.313C258.363 109.716 257.915 115.37 258.588 120.944C259.261 126.518 261.043 131.901 263.829 136.78C297.816 199.999 303.435 272.93 247.069 297.461C258.015 168.147 198.243 76.5247 110.143 91.0082C22.043 105.492 12.3335 185.64 21.186 239.488C33.7976 316.201 98.8368 399.677 216.801 380.284C391.316 351.829 376.05 176.452 329.767 97.9944ZM185.761 310.593C163.853 309.36 143.126 300.346 127.344 285.189C111.562 270.031 101.771 249.734 99.7481 227.981C94.5983 196.656 97.0273 164.789 121.608 160.748C169.506 152.873 194.266 249.664 185.761 310.593Z" fill="#E63312"/>
                  </g>
                  <defs>
                    <filter id="filter0_d_163_192" x="10.8792" y="71.1641" width="374.243" height="336.702" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                      <feOffset dx="8.53125" dy="8.53125"/>
                      <feGaussianBlur stdDeviation="8.10469"/>
                      <feComposite in2="hardAlpha" operator="out"/>
                      <feColorMatrix type="matrix" values="0 0 0 0 0.461538 0 0 0 0 0.153994 0 0 0 0 0.0421598 0 0 0 0.35 0"/>
                      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_163_192"/>
                      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_163_192" result="shape"/>
                    </filter>
                  </defs>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'meals':
        return renderMealsScreen();
      case 'bus':
        return renderBusScreen();
      case 'design':
        return renderDesignScreen();
      default:
        return renderBusScreen();
    }
  };

  return (
    <div 
      className="relative h-screen"
      ref={containerRef}
    >
      {renderCurrentScreen()}
      
      {/* Scroll to Top Button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed left-4 bottom-4 w-8 h-8 rounded-lg shadow-lg transition-all duration-300 z-40 flex items-center justify-center ${
            isDarkMode 
              ? 'bg-gray-800 bg-opacity-90 text-white hover:bg-gray-700' 
              : 'bg-white bg-opacity-90 text-gray-600 hover:bg-gray-50'
          }`}
          style={{ backdropFilter: 'blur(24px)' }}
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      )}
      
      {/* Bottom Navigation - Fixed with 32px bottom margin */}
      {!showSchedule && !showFullMealSchedule && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50">
          <div className="bg-blue-600 bg-opacity-80 backdrop-blur-[24px] rounded-2xl p-2 shadow-lg">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentScreen('meals')}
                className={`p-3 rounded-lg transition-colors duration-200 flex flex-col items-center ${
                  currentScreen === 'meals' 
                    ? 'bg-white text-blue-600' 
                    : isDarkMode 
                      ? 'text-white hover:bg-blue-500'
                      : 'text-white hover:bg-[#0B1731]'
                }`}
              >
                <Coffee className="w-6 h-6" />
                <span className="text-xs mt-1">обеды</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('bus')}
                className={`p-3 rounded-lg transition-colors duration-200 flex flex-col items-center ${
                  currentScreen === 'bus' 
                    ? 'bg-white text-blue-600' 
                    : isDarkMode 
                      ? 'text-white hover:bg-blue-500'
                      : 'text-white hover:bg-[#0B1731]'
                }`}
              >
                <Bus className="w-6 h-6" />
                <span className="text-xs mt-1">автобусы</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('design')}
                className={`p-3 rounded-lg transition-colors duration-200 flex flex-col items-center ${
                  currentScreen === 'design' 
                    ? 'bg-white text-blue-600' 
                    : isDarkMode 
                      ? 'text-white hover:bg-blue-500'
                      : 'text-white hover:bg-[#0B1731]'
                }`}
              >
                <Palette className="w-6 h-6" />
                <span className="text-xs mt-1">дизайн</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;