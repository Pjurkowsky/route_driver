import { useState } from 'react';
import WelcomeView from '@/views/WelcomeView';
import LoginView from '@/views/CredentialsView';

export default function Index() {
  const [startScreen, setStartScreen] = useState<string>("welcome");

  const toLogin = () => {
    setStartScreen("login");
  }

  return (
      <>
        {startScreen == "welcome" && <WelcomeView onPress={toLogin} />}
        {startScreen == "login" && <LoginView />}
      </>
  );
}