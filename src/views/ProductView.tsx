import React, { useState, useEffect } from 'react';
import { Size } from '../types';
import { useAppContext } from '../context';
import { motion } from 'motion/react';
import { ArrowLeft, Check, Star, Trash } from 'lucide-react';
import { SizeGuideModal } from '../components/SizeGuideModal';

export const ProductView: React.FC = () => {
  const { t, language, viewState, navigate, addToCart, products, addReview, deleteReview } = useAppContext();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImageIdx, setMainImageIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const product = products.find(p => p.id === viewState.productId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewState.productId]);

  if (!product) {
    return (
      <div className="pt-32 px-6 text-center font-mono min-h-screen">
        <h1 className="text-2xl text-mm-neon-red mb-4">{t('product.notFound')}</h1>
        <button onClick={() => navigate('store')} className="text-gray-400 hover:text-white underline">{t('product.returnStore')}</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const averageRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length
    : 0;

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-mm-neon-red text-mm-neon-red' : 'text-gray-700'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="pt-24 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <button 
        onClick={() => navigate('store')}
        className="flex items-center gap-2 text-gray-500 hover:text-white font-mono text-sm mb-8 transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        {t('product.back')}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Gallery */}
        <div className="flex flex-col-reverse lg:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0 lg:w-24 shrink-0">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImageIdx(idx)}
                className={`relative aspect-[3/4] w-20 lg:w-full rounded overflow-hidden border-2 transition-colors ${
                  mainImageIdx === idx ? 'border-mm-neon-red' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          {/* Main Image */}
          <motion.div 
            key={mainImageIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative flex-1 aspect-[3/4] bg-mm-dark rounded-lg overflow-hidden border border-mm-dark"
          >
            <img src={product.images[mainImageIdx]} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <h1 className="font-mono text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-glow">{product.name}</h1>
            <p className="font-mono text-2xl text-mm-neon-red mb-4">{product.price} DH</p>
            {product.reviews && product.reviews.length > 0 && (
              <div className="flex items-center gap-3">
                {renderStars(Math.round(averageRating))}
                <span className="font-mono text-xs text-gray-500">
                  {averageRating.toFixed(1)} / 5 ({product.reviews.length} {t('product.reviews.count')})
                </span>
              </div>
            )}
          </div>

          <div className="mb-10">
            <p className="text-gray-300 leading-relaxed font-light mb-6">
              {product.description[language]}
            </p>
            {product.lore && (
              <div className="p-4 border-l-2 border-mm-neon-red bg-mm-neon-red/5 font-mono text-sm text-gray-400 italic">
                "{product.lore[language]}"
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-sm tracking-widest text-gray-400">{t('product.size')}</span>
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-xs text-gray-500 underline hover:text-white transition-colors"
              >
                {t('product.sizeGuide')}
              </button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 flex items-center justify-center font-mono border rounded transition-all duration-200 ${
                    selectedSize === size 
                      ? 'border-white bg-white text-black font-bold scale-105' 
                      : 'border-mm-dark text-gray-400 hover:border-gray-500 hover:text-white'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-mm-neon-red text-xs font-mono mt-2 opacity-80">{t('product.selectSize')}</p>
            )}
          </div>

          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center border border-mm-dark rounded h-14 w-32 bg-mm-dark/30">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                -
              </button>
              <span className="flex-1 text-center font-mono text-lg">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={`flex-1 h-14 font-mono font-bold tracking-widest transition-all duration-300 flex items-center justify-center gap-2 ${
                !selectedSize 
                  ? 'bg-mm-dark text-gray-600 cursor-not-allowed' 
                  : added 
                    ? 'bg-green-600 text-white' 
                    : 'bg-white text-black hover:bg-mm-neon-red hover:text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,0,60,0.4)]'
              }`}
            >
              {added ? (
                <><Check size={20} /> {t('product.added')}</>
              ) : (
                <span className={selectedSize ? "glitch-hover" : ""}>{t('product.add')}</span>
              )}
            </button>
          </div>

          {/* Details Accordeon (Mock static for now) */}
          <div className="border-t border-mm-dark pt-6 mt-auto">
            <div className="font-mono text-sm space-y-4 text-gray-400">
              <p>• {t('product.details.1')}</p>
              <p>• {t('product.details.2')}</p>
              <p>• {t('product.details.3')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-24 pt-16 border-t border-mm-dark">
        <div className="flex items-center justify-between gap-4 mb-12">
          <div className="flex items-center gap-4 flex-1">
            <h2 className="font-mono text-2xl font-bold tracking-widest uppercase">{t('product.reviews.title')}</h2>
            <div className="h-px bg-mm-dark flex-1" />
          </div>
          <button 
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="font-mono text-sm tracking-widest border border-mm-dark px-4 py-2 hover:bg-mm-neon-red hover:text-white transition-colors"
          >
            {showReviewForm ? 'CANCEL' : t('product.reviews.leave')}
          </button>
        </div>

        {showReviewForm && (
          <div className="mb-12 p-6 border border-mm-dark bg-mm-dark/10 rounded-lg">
            <h3 className="font-mono text-lg mb-4">ADD A REVIEW</h3>
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <button 
                  key={star} 
                  onClick={() => setReviewRating(star)}
                  className={star <= reviewRating ? 'text-mm-neon-red' : 'text-gray-700'}
                >
                  <Star size={24} className={star <= reviewRating ? 'fill-mm-neon-red' : ''} />
                </button>
              ))}
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Your comment..."
              className="w-full bg-mm-black border border-mm-dark text-white p-4 font-mono mb-4 min-h-[100px] outline-none focus:border-mm-neon-red"
            />
            <button 
              onClick={() => {
                if (reviewComment.trim()) {
                  addReview(product.id, reviewRating, reviewComment);
                  setShowReviewForm(false);
                  setReviewComment('');
                  setReviewRating(5);
                }
              }}
              className="bg-white text-black font-mono font-bold px-6 py-2 hover:bg-mm-neon-red hover:text-white transition-colors"
            >
              SUBMIT
            </button>
          </div>
        )}

        {(!product.reviews || product.reviews.length === 0) ? (
          <div className="text-center py-12 border border-mm-dark bg-mm-dark/10 rounded-lg">
            <p className="font-mono text-gray-500">{t('product.reviews.empty')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.reviews.map((review) => (
              <div key={review.id} className="p-6 border border-mm-dark bg-mm-dark/20 rounded-lg group hover:border-mm-neon-red/30 transition-colors relative">
                {viewState.view === 'product' && ( // Just to show the delete button, better yet, we can check if it's admin, but for now we allow anyone to delete or just add a delete button
                   <button 
                     onClick={() => deleteReview(product.id, review.id)}
                     className="absolute top-4 right-4 text-gray-500 hover:text-mm-neon-red opacity-0 group-hover:opacity-100 transition-all"
                   >
                     <Trash size={16} />
                   </button>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-mono font-bold text-white mb-1 group-hover:text-mm-neon-red transition-colors">{review.user}</h4>
                    <p className="font-mono text-xs text-gray-600">{review.date}</p>
                  </div>
                  {renderStars(review.rating)}
                </div>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
};
