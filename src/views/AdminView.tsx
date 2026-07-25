import React, { useState } from 'react';
import { useAppContext } from '../context';
import { Product, Size } from '../types';
import { Trash, Lock } from 'lucide-react';

export const AdminView: React.FC = () => {
  const { products, addProduct, deleteReview } = useAppContext();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [descFr, setDescFr] = useState('');
  const [descAr, setDescAr] = useState('');
  const [image, setImage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '12345678900') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !descFr || !descAr || !image) return;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name,
      price: parseFloat(price),
      description: {
        fr: descFr,
        ar: descAr
      },
      sizes: ['S', 'M', 'L', 'XL'] as Size[],
      mainImage: image,
      images: [image],
      reviews: []
    };

    addProduct(newProduct);
    
    // Reset form
    setName('');
    setPrice('');
    setDescFr('');
    setDescAr('');
    setImage('');
    alert('Product added successfully!');
  };

  // Get all reviews
  const allReviews = products.flatMap(p => 
    (p.reviews || []).map(r => ({ ...r, productId: p.id, productName: p.name }))
  );

  if (!isAuthenticated) {
    return (
      <div className="pt-28 pb-24 px-6 max-w-xl mx-auto min-h-screen flex flex-col items-center justify-center">
        <div className="bg-mm-black border border-mm-dark p-8 w-full">
          <div className="flex flex-col items-center mb-8 text-mm-neon-red">
            <Lock size={48} className="mb-4" />
            <h1 className="font-mono text-2xl font-bold tracking-widest uppercase">ACCÈS RESTREINT</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className="w-full bg-mm-black border border-mm-dark text-white p-4 font-mono outline-none focus:border-mm-neon-red text-center tracking-widest"
                autoFocus
              />
              {error && <p className="text-mm-neon-red font-mono text-xs mt-2 text-center">{error}</p>}
            </div>
            
            <button 
              type="submit"
              className="bg-mm-neon-red text-white font-mono font-bold px-6 py-4 transition-colors w-full tracking-widest"
            >
              ENTRER
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 px-6 max-w-7xl mx-auto min-h-screen">
      <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-12 text-glow">
        ADMIN DASHBOARD
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Add Product Form */}
        <div>
          <h2 className="font-mono text-2xl font-bold mb-6">ADD PRODUCT</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div>
              <label className="font-mono text-xs text-gray-500 block mb-1">Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full bg-mm-black border border-mm-dark text-white p-3 font-mono outline-none focus:border-mm-neon-red"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-500 block mb-1">Price (DH)</label>
              <input 
                type="number" 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                className="w-full bg-mm-black border border-mm-dark text-white p-3 font-mono outline-none focus:border-mm-neon-red"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-500 block mb-1">Description (FR)</label>
              <textarea 
                value={descFr} 
                onChange={e => setDescFr(e.target.value)} 
                className="w-full bg-mm-black border border-mm-dark text-white p-3 font-mono outline-none focus:border-mm-neon-red h-24"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-500 block mb-1">Description (AR)</label>
              <textarea 
                value={descAr} 
                onChange={e => setDescAr(e.target.value)} 
                className="w-full bg-mm-black border border-mm-dark text-white p-3 font-mono outline-none focus:border-mm-neon-red h-24"
              />
            </div>
            <div>
              <label className="font-mono text-xs text-gray-500 block mb-1">Image URL</label>
              <input 
                type="text" 
                value={image} 
                onChange={e => setImage(e.target.value)} 
                className="w-full bg-mm-black border border-mm-dark text-white p-3 font-mono outline-none focus:border-mm-neon-red"
              />
            </div>
            <button 
              type="submit"
              className="bg-white text-black font-mono font-bold px-6 py-3 hover:bg-mm-neon-red hover:text-white transition-colors w-full"
            >
              ADD PRODUCT
            </button>
          </form>
        </div>

        {/* Manage Comments */}
        <div>
          <h2 className="font-mono text-2xl font-bold mb-6">MANAGE REVIEWS</h2>
          {allReviews.length === 0 ? (
            <p className="font-mono text-gray-500">No reviews found.</p>
          ) : (
            <div className="space-y-4">
              {allReviews.map(review => (
                <div key={review.id} className="p-4 border border-mm-dark bg-mm-dark/20 flex justify-between items-start">
                  <div>
                    <p className="font-mono text-xs text-mm-neon-red mb-1">On: {review.productName}</p>
                    <p className="font-mono text-sm text-white mb-2">{review.user} - {review.rating}/5</p>
                    <p className="text-gray-400 text-sm font-light">"{review.comment}"</p>
                  </div>
                  <button 
                    onClick={() => deleteReview(review.productId, review.id)}
                    className="text-gray-500 hover:text-mm-neon-red p-2"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
