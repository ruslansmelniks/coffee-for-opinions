import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Coffee, PartyPopper } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Claim() {
  return (
    <ProtectedRoute>
      <ClaimContent />
    </ProtectedRoute>
  );
}

function ClaimContent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [points, setPoints] = useState(0);
  const [claimed, setClaimed] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [cafeName, setCafeName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('points_balance')
      .eq('id', user.id)
      .single();

    if (data) setPoints(data.points_balance);
  };

  const handleClaim = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('claim_voucher', {
        p_user_id: user.id
      });

      if (error) throw error;

      if (data && data.length > 0) {
        setVoucherCode(data[0].voucher_code);
        setCafeName(data[0].cafe_name);
        setClaimed(true);
        
        toast({
          title: 'Coffee Claimed!',
          description: 'Your voucher code is ready to use.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to claim voucher. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {!claimed ? (
          // Before Claim
          <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
            <Coffee className="w-20 h-20 text-amber-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Claim Your Free Coffee
            </h2>
            <p className="text-gray-600 mb-8">
              You have {points} points. Ready to redeem?
            </p>

            <button
              onClick={handleClaim}
              disabled={points < 100 || loading}
              className="w-full bg-amber-600 text-white py-4 rounded-lg font-semibold hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Claiming...' : points >= 100 ? 'Claim Coffee (100 points)' : `Need ${100 - points} more points`}
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full mt-4 text-gray-600 py-3 hover:text-gray-900"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          // After Claim - Show Voucher
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-8 text-center text-white">
            <PartyPopper className="w-20 h-20 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-2">Coffee Claimed!</h2>
            <p className="mb-8 opacity-90">Show this code at {cafeName}</p>

            <div className="bg-white text-gray-900 rounded-xl p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">Your Voucher Code</p>
              <p className="text-3xl font-mono font-bold tracking-wider">{voucherCode}</p>
            </div>

            <p className="text-sm opacity-75 mb-6">
              Valid at all {cafeName} locations in Riga
            </p>

            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-white text-amber-600 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
