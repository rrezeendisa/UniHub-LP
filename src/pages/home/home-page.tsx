import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HeroSection } from '../../components/HeroSection/hero-section'
import { FeaturesSection } from '../../components/FeaturesSection/features-section'
import { LoadingSpinner } from '../../components/LoadingSpinner/loading-spinner'
import { HOME_FEATURES, HOME_BENEFITS } from '../../constants/home-feature'

export function HomePage() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleStartClick = () => {
    navigate('/login')
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen message="Carregando..." />
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto flex w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <HeroSection onStartClick={handleStartClick} benefits={HOME_BENEFITS} />
        <FeaturesSection features={HOME_FEATURES} />
      </main>
    </div>
  )
}
