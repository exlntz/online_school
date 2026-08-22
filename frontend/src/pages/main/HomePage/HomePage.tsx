import type { JSX } from 'react'
import { Hero } from '../../../widgets/hero-section'
import { Pricing } from '../../../widgets/pricing-section'
import { Ecosystem } from '../../../widgets/ecosystem-section/ui/Ecosystem/Ecosystem'
import { MentalSupport } from '../../../widgets/mental-support-section'
import { Mentors } from '../../../widgets/mentors-section'
import { Testimonials } from '../../../widgets/testimonials-section'
import { Trial } from '../../../widgets/trial-section'



export const HomePage = (): JSX.Element => {
    return (
        <>
            <main>
                <Hero />
                <Ecosystem />
                <Trial />
                <Mentors />
                <Pricing />
                <Testimonials />
                <MentalSupport />
            </main>
        </>
    )
}