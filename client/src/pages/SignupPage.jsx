import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClayAuthLayout from '../components/auth/ClayAuthLayout.jsx';
import ClayCard from '../components/auth/ClayCard.jsx';
import SignupForm from '../components/auth/SignupForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignupPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleRegister = async (data) => {
    setLoading(true);
    setServerError('');
    try {
      await register(data);
      toast.success('Welcome to Colombiator! Account created successfully.');
      navigate('/dashboard', { replace: true });
    } catch (e) {
      const msg = e.friendlyMessage || 'Unable to create account. Please try again.';
      setServerError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClayAuthLayout
      badgeText="Start Exploring"
      title="Start your next adventure"
      subtitle="Create your account and organize your journeys."
    >
      <ClayCard className="w-full">
        <SignupForm
          onSubmit={handleRegister}
          loading={loading}
          serverError={serverError}
        />
      </ClayCard>
    </ClayAuthLayout>
  );
}
