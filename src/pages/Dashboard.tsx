import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Coffee } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Profile {
  id: string;
  email: string;
  name: string | null;
  points_balance: number;
  total_surveys_completed: number;
  created_at: string;
}

interface Survey {
  id: string;
  title: string;
  description: string;
  duration: number;
  points: number;
  url: string;
}

interface Activity {
  id: string;
  survey_name: string;
  points_awarded: number;
  completed_at: string;
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [recentActivity, setRecentActivity] = useState<Activity[]>([]);
  const [coffeeClaimed, setCoffeeClaimed] = useState(0);
  const [showRefreshHint, setShowRefreshHint] = useState(false);

  useEffect(() => {
    fetchProfile();
    fetchSurveys();
    fetchRecentActivity();
    fetchCoffeeClaimed();
  }, []);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) setProfile(data);
  };

  const fetchSurveys = async () => {
    setSurveys([
      {
        id: 'banking',
        title: 'Banking in Latvia 2025',
        description: 'Share your banking preferences and experiences',
        duration: 5,
        points: 50,
        url: 'https://tally.so/r/m6glLN'
      },
      {
        id: 'quick-loans',
        title: 'Quick Loans & Credit',
        description: 'Experience with quick loan services',
        duration: 5,
        points: 50,
        url: 'https://tally.so/r/nreZV5'
      }
    ]);
  };

  const fetchRecentActivity = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return;

    const { data } = await supabase
      .from('survey_responses')
      .select('*')
      .eq('user_email', user.email)
      .order('completed_at', { ascending: false })
      .limit(5);

    if (data) setRecentActivity(data);
  };

  const fetchCoffeeClaimed = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return;

    // Query vouchers table directly (voucher_claims table no longer exists)
    const { count } = await supabase
      .from('vouchers')
      .select('*', { count: 'exact', head: true })
      .eq('assigned_to', user.email)
      .eq('is_used', true);

    if (count !== null) setCoffeeClaimed(count);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const handleStartSurvey = async (survey: Survey) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user?.email) {
      alert('Please log in to complete surveys');
      return;
    }
    
    // Add email parameter to URL
    const separator = survey.url.includes('?') ? '&' : '?';
    const tallyUrl = `${survey.url}${separator}email=${encodeURIComponent(user.email)}`;
    
    // Open in new tab
    window.open(tallyUrl, '_blank');
    
    // Show hint to refresh after completing survey
    setShowRefreshHint(true);
    setTimeout(() => setShowRefreshHint(false), 15000);
  };

  const points = profile?.points_balance || 0;
  const userName = profile?.name || profile?.email?.split('@')[0] || 'there';
  const joinDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <img src="/lovable-uploads/coffeedata-logo.png" className="h-10" alt="CoffeeData" />
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/profile')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Hi, {userName}
            </button>
            <button 
              onClick={handleLogout}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Points Card - Prominent */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-8 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-2">Your Points</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-gray-900">{points}</span>
                <span className="text-lg text-gray-500">/ 100</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {points >= 100 ? 'Ready to claim!' : `${100 - points} points until your next coffee`}
              </p>
            </div>

            <div className="text-center">
              <Coffee className="w-16 h-16 text-amber-600 mx-auto mb-2" />
              <span className="text-sm text-gray-500">Complete surveys to earn</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="bg-white rounded-full h-3 overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-500"
                style={{ width: `${Math.min(points, 100)}%` }}
              />
            </div>
          </div>

          {/* Claim Coffee Button */}
          {points >= 100 && (
            <button 
              onClick={() => navigate('/claim')}
              className="mt-4 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition w-full"
            >
              🎉 Claim Your Free Coffee!
            </button>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Surveys Completed</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{profile?.total_surveys_completed || 0}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Coffee Claimed</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{coffeeClaimed}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600">Member Since</p>
            <p className="text-lg font-medium text-gray-900 mt-2">{joinDate}</p>
          </div>
        </div>

        {/* Available Surveys Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Surveys</h2>

          <div className="space-y-4">
            {surveys.map(survey => (
              <div key={survey.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{survey.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{survey.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs text-gray-500">⏱️ ~{survey.duration} min</span>
                    <span className="text-xs font-medium text-green-600">+{survey.points} points</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleStartSurvey(survey)}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Start
                </button>
              </div>
            ))}
          </div>

          {/* Refresh Hint */}
          {showRefreshHint && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>After completing the survey</strong>, refresh this page to see your updated points!
              </p>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.survey_name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(activity.completed_at).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-green-600">+{activity.points_awarded} pts</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
