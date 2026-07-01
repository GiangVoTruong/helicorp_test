import { ToastProvider } from './components/ui/Toast'
import BehaviorTracker from './components/analytics/BehaviorTracker'
import ChatWidget from './features/chatbot/ChatWidget'
import CommerceProvider from './features/commerce/CommerceProvider'
import CommerceDrawer from './features/commerce/components/CommerceDrawer'
import HomePage from './features/home/pages/HomePage'
import Layout from './features/layout/Layout'
import LanguageProvider from './i18n/LanguageProvider'
import ThemeProvider from './theme/ThemeProvider'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CommerceProvider>
          <ToastProvider>
            <BehaviorTracker />
            <Layout>
              <HomePage />
            </Layout>
            <CommerceDrawer />
            <ChatWidget />
          </ToastProvider>
        </CommerceProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
