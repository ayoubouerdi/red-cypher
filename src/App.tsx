import React, { useState } from 'react';
import { AppProvider, useAppContext } from './context';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { StoreView } from './views/StoreView';
import { ProductView } from './views/ProductView';
import { AboutView } from './views/AboutView';
import { IntroScreen } from './components/IntroScreen';
import { CustomCursor } from './components/CustomCursor';
import { GlitchView } from './components/GlitchView';
import { AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { viewState } = useAppContext();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="flex flex-col min-h-screen">
      <CustomCursor />
      <AnimatePresence>
        {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      <Navbar />
      <CartDrawer />
      
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {viewState.view === 'home' && (
            <GlitchView viewKey="home">
              <HomeView />
            </GlitchView>
          )}
          {viewState.view === 'store' && (
            <GlitchView viewKey="store">
              <StoreView />
            </GlitchView>
          )}
          {viewState.view === 'product' && (
            <GlitchView viewKey={`product-${viewState.productId}`}>
              <ProductView />
            </GlitchView>
          )}
          {viewState.view === 'about' && (
            <GlitchView viewKey="about">
              <AboutView />
            </GlitchView>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
