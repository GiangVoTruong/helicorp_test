import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BehaviorTracker from './components/analytics/BehaviorTracker'
import { ToastProvider } from './components/ui/Toast'
import QueryProvider from './configs/query/QueryProvider'
import AuthProvider from './features/auth/AuthProvider'
import LoginPage from './features/auth/pages/LoginPage'
import ProfilePage from './features/auth/pages/ProfilePage'
import RegisterPage from './features/auth/pages/RegisterPage'
import ChatWidget from './features/chatbot/ChatWidget'
import CommerceProvider from './features/commerce/CommerceProvider'
import CommerceDrawer from './features/commerce/components/CommerceDrawer'
import HomePage from './features/home/pages/HomePage'
import Layout from './features/layout/Layout'
import LanguageProvider from './i18n/LanguageProvider'
import ThemeProvider from './theme/ThemeProvider'

export default function App() {
  return (
    <BrowserRouter>
      <QueryProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <CommerceProvider>
                <ToastProvider>
                  <BehaviorTracker />
                  <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                      path="/profile"
                      element={
                        <>
                          <Layout>
                            <ProfilePage />
                          </Layout>
                          <CommerceDrawer />
                          <ChatWidget />
                        </>
                      }
                    />
                    <Route
                      path="/"
                      element={
                        <>
                          <Layout>
                            <HomePage />
                          </Layout>
                          <CommerceDrawer />
                          <ChatWidget />
                        </>
                      }
                    />
                  </Routes>
                </ToastProvider>
              </CommerceProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </QueryProvider>
    </BrowserRouter>
  )
}
