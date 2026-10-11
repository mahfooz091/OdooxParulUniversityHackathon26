import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClayAuthLayout from '../components/auth/ClayAuthLayout.jsx';
import ClayCard from '../components/auth/ClayCard.jsx';
import LoginForm from '../components/auth/LoginForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      await login(data);
      toast.success('Welcome back to Colombiator!');
      navigate('/dashboard', { replace: true });
    } catch (e) {
      const msg = e.friendlyMessage || 'Invalid email or password. Please try again.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClayAuthLayout
      badgeText="Explorer Sign In"
      title="Welcome back"
      subtitle="Sign in to continue planning your next journey."
    >
      <ClayCard className="w-full">
        <LoginForm
          onSubmit={handleLogin}
          loading={loading}
          serverError={serverError}
        />
      </ClayCard>
    </ClayAuthLayout>
  );
}
