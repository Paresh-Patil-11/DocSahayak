import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import AuthModal from '../Auth/AuthModal'
import ProfileDropdown from './ProfileDropdown'
import { useState } from 'react'
import Header from './Header'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  return (
    <>
      <Disclosure as="nav" className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-purple-200 hover:bg-purple-800/50 hover:text-white focus:ring-2 focus:ring-purple-400 focus:outline-hidden focus:ring-inset transition-all duration-300">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              
              <div className="hidden sm:ml-8 sm:block">
                <div className="flex space-x-1 items-center">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={location.pathname === item.href ? 'page' : undefined}
                      className={classNames(
                        location.pathname === item.href
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'text-purple-200 hover:bg-purple-800/50 hover:text-white',
                        'rounded-lg px-4 py-2 text-md font-medium transition-all duration-300 transform hover:scale-105',
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Auth Section */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {isAuthenticated ? (
                <ProfileDropdown />
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden bg-slate-900/95 backdrop-blur-sm">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={Link}
                to={item.href}
                aria-current={location.pathname === item.href ? 'page' : undefined}
                className={classNames(
                  location.pathname === item.href
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-purple-200 hover:bg-purple-800/50 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium transition-all duration-300',
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      {location.pathname === '/' && <Header />}
    </>
  )
}
