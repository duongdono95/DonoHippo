import { Button } from '@mui/material';
import { ArrowDownToLine, ArrowRight, BadgeCheck, Clover } from 'lucide-react';
import './styles.scss';
import Provider from '@/GlobalStyles/Provider';
import { Navbar } from '@/components/NavBar/NavBar';
export default function Home() {
  const perks = [
    {
      icon: <ArrowDownToLine />,
      name: 'Instant Delivery',
      des: 'Get your assets delivered to your email in seconds and download them right away.',
    },
    {
      icon: <BadgeCheck />,
      name: 'Guaranteed Quality',
      des: 'Every Assets on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-days refund guarantee.',
    },
    {
      icon: <Clover />,
      name: 'For the Planet',
      des: `We've pledged 1% of sales to the preservation and restoration of the natural environment.`,
    },
  ];
  return (
    <Provider>
      <div className={'home-page'}>
        <Navbar />
        <div className="top">
          <h1 style={{ textAlign: 'center' }}>
            Your marketplace for high-quality <span style={{ color: 'var(--secondary)' }}>DIGITAL ASSETS</span>.
          </h1>
          <p style={{ textAlign: 'center' }}>
            Welcome to DigitalHippo. Every asset on our platform is verified by our team to ensure out highest quality
            standards
          </p>
          <div className="buttons">
            <Button sx={{ zIndex: '-1 !important' }} variant="contained">
              Browse Trending
            </Button>
            <Button sx={{ zIndex: '-1 !important' }} color="secondary">
              Our quality promise <ArrowRight />
            </Button>
          </div>
        </div>
        <div className="bottom">
          <div className="perks">
            {perks.map((perk, index) => (
              <div key={index} className="perk">
                <div className="icon">{perk.icon}</div>
                <b className="name">{perk.name}</b>
                <p className="des">{perk.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Provider>
  );
}
