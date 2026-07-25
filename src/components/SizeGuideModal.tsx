import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useAppContext } from '../context';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const { t } = useAppContext();
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-mm-black border border-mm-dark p-6 md:p-8 w-full max-w-2xl relative shadow-[0_0_50px_rgba(255,0,60,0.1)] rounded-lg"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <h2 className="font-mono text-2xl font-bold tracking-widest text-glow mb-2 uppercase">{t('size.title')}</h2>
              <p className="text-gray-400 font-mono text-sm mb-8">
                {t('size.desc')}
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-mono text-sm">
                  <thead>
                    <tr className="border-b border-mm-dark">
                      <th className="py-4 text-mm-neon-red font-normal uppercase">{t('size.col1')}</th>
                      <th className="py-4 text-gray-400 font-normal uppercase">{t('size.col2')}</th>
                      <th className="py-4 text-gray-400 font-normal uppercase">{t('size.col3')}</th>
                      <th className="py-4 text-gray-400 font-normal uppercase">{t('size.col4')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-mm-dark/50 hover:bg-mm-dark/20 transition-colors">
                      <td className="py-4 font-bold text-white">S</td>
                      <td className="py-4 text-gray-300">54</td>
                      <td className="py-4 text-gray-300">70</td>
                      <td className="py-4 text-gray-300">22</td>
                    </tr>
                    <tr className="border-b border-mm-dark/50 hover:bg-mm-dark/20 transition-colors">
                      <td className="py-4 font-bold text-white">M</td>
                      <td className="py-4 text-gray-300">57</td>
                      <td className="py-4 text-gray-300">72</td>
                      <td className="py-4 text-gray-300">23</td>
                    </tr>
                    <tr className="border-b border-mm-dark/50 hover:bg-mm-dark/20 transition-colors">
                      <td className="py-4 font-bold text-white">L</td>
                      <td className="py-4 text-gray-300">60</td>
                      <td className="py-4 text-gray-300">74</td>
                      <td className="py-4 text-gray-300">24</td>
                    </tr>
                    <tr className="hover:bg-mm-dark/20 transition-colors">
                      <td className="py-4 font-bold text-white">XL</td>
                      <td className="py-4 text-gray-300">63</td>
                      <td className="py-4 text-gray-300">76</td>
                      <td className="py-4 text-gray-300">25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 p-4 bg-mm-dark/30 border border-mm-dark text-gray-400 font-mono text-xs rounded">
                <span className="text-mm-neon-red font-bold">{t('size.warning')}</span> {t('size.warningText')}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
