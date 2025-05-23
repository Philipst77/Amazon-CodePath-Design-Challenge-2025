import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client/supabaseClient';


const AuthRedirector = ({ userData, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkOnboarding = async () => {
      if (userData) {
        const { data, error } = await supabase
          .from('profiles')
          .select('has_onboarded')
          .eq('id', userData.id)
          .single();

        if (!data?.has_onboarded) {
          navigate('/setup'); // redirect to setup if not onboarded
        }
      }
    };

    checkOnboarding();
  }, [userData, navigate]);

  return children;
};

export default AuthRedirector;