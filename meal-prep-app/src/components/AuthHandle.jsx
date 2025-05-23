import { supabase } from "../client/supabaseClient";
import AuthComponent from './authComponent.jsx';

const AuthHandle = ({ setUserData }) => {
  const handleLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    setUserData(user);
  };

  const handleSignup = async (username, email, password) => {
  const { data: signupData, error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });

  if (signupError) {
    if (signupError.message.includes("User already registered")) {
      return handleLogin(email, password);
    } else {
      alert(signupError.message);
      return;
    }
  }

  // Get session (only works if email confirmation is disabled)
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (!session) {
    console.warn("No session yet — email confirmation likely required.");
    alert("Please check your email to verify your account.");
    return;
  }

  const { user } = session;

  // Insert into profiles
  const { error: insertError } = await supabase.from("profiles").insert([
    {
      user_id: user.id, // or whatever your foreign key is
      email: user.email,
      answered_questions: false,
    },
  ]);

  if (insertError) {
    console.error("Failed to insert into profiles:", insertError.message);
  }

  setUserData(user);
};



  return <AuthComponent onLogin={handleLogin} onSignup={handleSignup} />;
};

export default AuthHandle;
